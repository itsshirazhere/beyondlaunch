import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './HeroScene.module.css'

export default function HeroScene() {
  const mountRef = useRef(null)
  const animRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const group = new THREE.Group()
    scene.add(group)

    const camera = new THREE.PerspectiveCamera(58, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 4.6

    // ── Lighting ──────────────────────────────────────────────────────────
    const keyLight = new THREE.PointLight(0xFF5320, 5, 12)
    keyLight.position.set(3, 2, 2)
    group.add(keyLight)

    const fillLight = new THREE.PointLight(0xFF8255, 2, 10)
    fillLight.position.set(-3, -2, 1)
    group.add(fillLight)

    const rimLight = new THREE.PointLight(0xffeedd, 1.5, 8)
    rimLight.position.set(0, 4, -2)
    group.add(rimLight)

    scene.add(new THREE.AmbientLight(0x111122, 0.9))

    // ── Morphing blob ─────────────────────────────────────────────────────
    const blobGeo = new THREE.SphereGeometry(1, 64, 64)
    const posAttr = blobGeo.attributes.position
    const normAttr = blobGeo.attributes.normal
    const origPos = new Float32Array(posAttr.array)

    const blobMat = new THREE.MeshPhysicalMaterial({
      color: 0xFF5320,
      emissive: 0xFF2200,
      emissiveIntensity: 0.22,
      roughness: 0.25,
      metalness: 0.12,
      transparent: true,
      opacity: 0.92,
    })
    const blob = new THREE.Mesh(blobGeo, blobMat)
    group.add(blob)

    // ── Inner glow core ───────────────────────────────────────────────────
    const coreGeo = new THREE.SphereGeometry(0.48, 24, 24)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xFF6633, transparent: true, opacity: 0.1 })
    group.add(new THREE.Mesh(coreGeo, coreMat))

    // ── Orbit ring 1 ──────────────────────────────────────────────────────
    const r1Geo = new THREE.TorusGeometry(1.65, 0.009, 6, 100)
    const r1Mat = new THREE.MeshBasicMaterial({ color: 0xFF5320, transparent: true, opacity: 0.38 })
    const ring1 = new THREE.Mesh(r1Geo, r1Mat)
    ring1.rotation.x = Math.PI / 4
    ring1.rotation.z = Math.PI / 8
    group.add(ring1)

    // ── Orbit ring 2 ──────────────────────────────────────────────────────
    const r2Geo = new THREE.TorusGeometry(2.05, 0.005, 6, 100)
    const r2Mat = new THREE.MeshBasicMaterial({ color: 0xFF8255, transparent: true, opacity: 0.18 })
    const ring2 = new THREE.Mesh(r2Geo, r2Mat)
    ring2.rotation.x = -Math.PI / 3
    ring2.rotation.y = Math.PI / 5
    group.add(ring2)

    // ── Background icosphere wireframe ────────────────────────────────────
    const wireGeo = new THREE.IcosahedronGeometry(2.6, 2)
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xF5F3EF, wireframe: true, transparent: true, opacity: 0.025 })
    const wireSphere = new THREE.Mesh(wireGeo, wireMat)
    group.add(wireSphere)

    // ── Particle halo ─────────────────────────────────────────────────────
    const hCount = 150
    const hPos = new Float32Array(hCount * 3)
    const hCol = new Float32Array(hCount * 3)
    const orange = new THREE.Color(0xFF5320)
    const cream = new THREE.Color(0xF5F3EF)

    for (let i = 0; i < hCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.3 + Math.random() * 1.1
      hPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      hPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      hPos[i * 3 + 2] = r * Math.cos(phi)
      const c = Math.random() > 0.55 ? orange : cream
      hCol[i * 3] = c.r; hCol[i * 3 + 1] = c.g; hCol[i * 3 + 2] = c.b
    }
    const haloGeo = new THREE.BufferGeometry()
    haloGeo.setAttribute('position', new THREE.BufferAttribute(hPos, 3))
    haloGeo.setAttribute('color', new THREE.BufferAttribute(hCol, 3))
    const haloMat = new THREE.PointsMaterial({ size: 0.02, vertexColors: true, transparent: true, opacity: 0.7 })
    const halo = new THREE.Points(haloGeo, haloMat)
    group.add(halo)

    // ── Resize / visibility ────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    const onMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('mousemove', onMouseMove)

    let isVisible = true
    const observer = new IntersectionObserver(([e]) => { isVisible = e.isIntersecting })
    observer.observe(container)

    // ── Animation loop ─────────────────────────────────────────────────────
    let t = 0
    const animate = () => {
      animRef.current = requestAnimationFrame(animate)
      if (!isVisible) return
      t += 0.007

      // Normal-displacement morphing (3 stacked frequencies → organic surface)
      for (let i = 0; i < posAttr.count; i++) {
        const ox = origPos[i * 3], oy = origPos[i * 3 + 1], oz = origPos[i * 3 + 2]
        const nx = normAttr.getX(i), ny = normAttr.getY(i), nz = normAttr.getZ(i)
        const f1 = Math.sin(ox * 2.8 + t * 1.15) * Math.cos(oy * 2.8 + t * 0.9)
        const f2 = Math.sin(oy * 3.6 + t * 0.75) * Math.cos(oz * 3.6 + t * 1.4)
        const f3 = Math.sin(oz * 2.1 + t * 1.55) * Math.cos(ox * 2.1 + t * 0.65)
        const d = (f1 + f2 * 0.55 + f3 * 0.35) * 0.145
        posAttr.setXYZ(i, ox + nx * d, oy + ny * d, oz + nz * d)
      }
      posAttr.needsUpdate = true
      blobGeo.computeVertexNormals()

      blob.rotation.y += 0.003
      blob.rotation.x += 0.0008

      ring1.rotation.z += 0.007
      ring2.rotation.y += 0.005
      ring2.rotation.x -= 0.003

      wireSphere.rotation.y -= 0.0012
      wireSphere.rotation.x += 0.0007

      halo.rotation.y += 0.0015
      halo.rotation.x -= 0.0009

      keyLight.intensity = 4.5 + Math.sin(t * 1.6) * 1.0

      // Mouse tilt (smooth lerp)
      const m = mouseRef.current
      group.rotation.y += (m.x * 0.25 - group.rotation.y) * 0.035
      group.rotation.x += (-m.y * 0.15 - group.rotation.x) * 0.035

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      ;[blobGeo, blobMat, coreGeo, coreMat, r1Geo, r1Mat, r2Geo, r2Mat, wireGeo, wireMat, haloGeo, haloMat].forEach(x => x?.dispose?.())
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className={styles.sceneWrap}>
      <div className={styles.glow} />
      <div ref={mountRef} className={styles.canvas} />
    </div>
  )
}
