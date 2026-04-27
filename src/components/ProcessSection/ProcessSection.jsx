import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './ProcessSection.module.css'

const steps = [
  {
    num: '01',
    title: 'Audit',
    desc: "We dig into your funnel, creatives, traffic, and conversion data — mapping exactly where attention is leaking before it becomes revenue.",
    detail: 'Free · No obligation',
    delay: 0,
  },
  {
    num: '02',
    title: 'Build',
    desc: "We design and deploy your full growth stack — ads, landing pages, creatives, and automation — engineered as one connected system, not separate parts.",
    detail: 'End-to-end delivery',
    delay: 0.45,
  },
  {
    num: '03',
    title: 'Scale',
    desc: "We run continuous optimisation cycles — cutting what doesn't work, doubling down on what does, with revenue as the only metric that matters.",
    detail: 'Ongoing partnership',
    delay: 0.9,
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our process
        </motion.span>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Three steps.{' '}
          <span className={styles.accentText}>One system.</span>
        </motion.h2>

        {/* Steps */}
        <div className={styles.stepsWrapper} ref={ref}>

          {/* Animated SVG connector */}
          <div className={styles.lineTrack}>
            <svg className={styles.svgLine} viewBox="0 0 900 2" preserveAspectRatio="none">
              <motion.line
                x1="0" y1="1" x2="900" y2="1"
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
              />
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF5320" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#FF5320" stopOpacity="0.15" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className={styles.steps}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className={styles.step}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: step.delay, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Node dot on the line */}
                <motion.div
                  className={styles.node}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: step.delay + 0.15, duration: 0.35 }}
                />

                <div className={styles.stepCard}>
                  <motion.span
                    className={styles.stepNum}
                    animate={inView
                      ? { opacity: 1, textShadow: '0 0 40px rgba(255,83,32,0.5)' }
                      : { opacity: 0.15, textShadow: 'none' }
                    }
                    transition={{ delay: step.delay + 0.25, duration: 0.4 }}
                  >
                    {step.num}
                  </motion.span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  <span className={styles.stepDetail}>{step.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
