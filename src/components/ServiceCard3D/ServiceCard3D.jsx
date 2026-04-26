import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './ServiceCard3D.module.css'

const buildGeo = (shape) => {
  switch (shape) {
    case 'sphere':  return new THREE.TorusKnotGeometry(0.42, 0.14, 80, 10)
    case 'pyramid': return new THREE.OctahedronGeometry(0.78)
    case 'ring':    return new THREE.TorusGeometry(0.52, 0.1, 6, 8)
    default:        return new THREE.IcosahedronGeometry(0.72, 1)
  }
}

export default function ServiceCard3D({ shape = 'cube', isHovered = false }) {
  const mountRef = useRef(null)
  const animRef = useRef(null)
  const hoveredRef = useRef(isHovered)
  const speedRef = useRef(0.008)

  useEffect(() => { hoveredRef.current = isHovered }, [isHovered])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(80, 80)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.z = 2.6

    const keyLight = new THREE.PointLight(0xFF8255, 3)
    keyLight.position.set(2, 3, 2)
    scene.add(keyLight)
    const fillLight = new THREE.PointLight(0xffffff, 0.8)
    fillLight.position.set(-2, -1, 1)
    scene.add(fillLight)
    scene.add(new THREE.AmbientLight(0x111111, 1.2))

    const geo = buildGeo(shape)

    // Solid mesh
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xFF5320,
      emissive: 0xFF2200,
      emissiveIntensity: 0.28,
      roughness: 0.2,
      metalness: 0.1,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Wireframe overlay — slightly larger for "aura" effect
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xFF8255,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })
    const wire = new THREE.Mesh(geo, wireMat)
    wire.scale.setScalar(1.04)
    scene.add(wire)

    const animate = () => {
      animRef.current = requestAnimationFrame(animate)
      const target = hoveredRef.current ? 0.03 : 0.008
      speedRef.current += (target - speedRef.current) * 0.07
      const s = speedRef.current
      mesh.rotation.x += s
      mesh.rotation.y += s * 1.35
      wire.rotation.x = mesh.rotation.x
      wire.rotation.y = mesh.rotation.y
      // Pulse wireframe opacity on hover
      wireMat.opacity = hoveredRef.current ? 0.35 : 0.18
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      geo.dispose()
      mat.dispose()
      wireMat.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [shape])

  return <div ref={mountRef} className={styles.canvas} />
}
