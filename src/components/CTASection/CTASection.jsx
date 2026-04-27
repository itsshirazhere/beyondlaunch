import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './CTASection.module.css'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.section} ref={ref}>
      {/* Multi-layer glow */}
      <div className={styles.glowCenter} />
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />

      {/* Grid overlay */}
      <div className={styles.grid} />

      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Eyebrow */}
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Free audit
        </motion.span>

        <h2 className={styles.heading}>
          Ready to build a system that
          <br />
          <span className={styles.accentText}>actually converts?</span>
        </h2>

        <p className={styles.sub}>
          Get a clear breakdown of where you’re losing revenue — and what to fix first.
        </p>

        <motion.button
          className={styles.cta}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            // REPLACE: calendly link
            window.open('https://calendly.com/shirazyousuf2017/30min', '_blank')
          }}
        >
          Book a free audit
          <span className={styles.ctaArrow}>→</span>
        </motion.button>

        <p className={styles.fine}>
          No sales pitch. Just clarity.
        </p>

        {/* Decorative floating pills */}
        <motion.div
          className={`${styles.pill} ${styles.pillLeft}`}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          ◆ 48h delivery
        </motion.div>
        <motion.div
          className={`${styles.pill} ${styles.pillRight}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          ◆ D2C only
        </motion.div>
      </motion.div>
    </section>
  )
}
