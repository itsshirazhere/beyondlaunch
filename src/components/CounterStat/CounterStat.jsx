import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './CounterStat.module.css'

export default function CounterStat({ value, prefix = '', suffix = '', label }) {
  const ref = useRef(null)
  const displayRef = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView || !displayRef.current) return
    const duration = 2200
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4)
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${Math.round(ease * value)}${suffix}`
      }
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, prefix, suffix])

  return (
    <motion.div
      ref={ref}
      className={styles.stat}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div ref={displayRef} className={styles.value}>
        {prefix}0{suffix}
      </div>
      <div className={styles.label}>{label}</div>
    </motion.div>
  )
}
