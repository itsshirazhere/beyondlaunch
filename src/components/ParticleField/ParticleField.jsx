import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './ParticleField.module.css'

export default function ParticleField() {
  const mountRef = useRef(null)
  const animRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 5

    const COUNT = 80
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const speeds = new Float32Array(COUNT)
    const sizes = new Float32Array(COUNT)

    const orange = new THREE.Color(0xFF5320)
    const cream = new THREE.Color(0xF5F3EF)

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5
      const c = Math.random() > 0.45 ? orange : cream
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
      speeds[i] = 0.003 + Math.random() * 0.007
      sizes[i] = 0.02 + Math.random() * 0.04
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.38 })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
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

    const pos = geo.attributes.position.array
    const animate = () => {
      animRef.current = requestAnimationFrame(animate)
      if (!isVisible) return

      // Upward drift with wrap
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += speeds[i]
        if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5
      }
      geo.attributes.position.needsUpdate = true

      // Mouse parallax via scene tilt (smooth lerp)
      const m = mouseRef.current
      scene.rotation.y += (m.x * 0.06 - scene.rotation.y) * 0.03
      scene.rotation.x += (-m.y * 0.03 - scene.rotation.x) * 0.03

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={styles.canvas} />
}
