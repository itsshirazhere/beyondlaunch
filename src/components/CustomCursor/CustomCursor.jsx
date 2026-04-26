import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  const mouseX = useSpring(0, { stiffness: 300, damping: 28 })
  const mouseY = useSpring(0, { stiffness: 300, damping: 28 })

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const over = (e) => { if (e.target.closest('a, button')) setHovered(true) }
    const out = (e) => { if (e.target.closest('a, button')) setHovered(false) }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [mouseX, mouseY, visible])

  return (
    <motion.div
      className={`${styles.cursor} ${hovered ? styles.hovered : ''} ${visible ? styles.visible : ''}`}
      style={{ x: mouseX, y: mouseY }}
    />
  )
}
