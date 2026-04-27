import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './SocialProof.module.css'

const features = [
  {
    icon: '⚡',
    title: 'End-to-end execution.',
    text: 'We own every layer of your growth stack — paid acquisition, creatives, conversion pages, and post-purchase automation. One team. No handoffs, no gaps, no excuses.',
    tag: 'Full-stack',
    sub: 'beyondlaunch model',
  },
  {
    icon: '🎯',
    title: 'D2C exclusive. Always.',
    text: "We work exclusively with direct-to-consumer brands. Every system, every playbook, and every optimisation we apply is built for D2C — not adapted from a generic agency template.",
    tag: 'Niche focus',
    sub: 'D2C only',
  },
]

function FeatureCard({ f, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className={styles.cardBorder} />
      <div className={styles.featureIcon}>{f.icon}</div>
      <h3 className={styles.featureTitle}>{f.title}</h3>
      <p className={styles.text}>{f.text}</p>
      <div className={styles.footer}>
        <div className={styles.author}>
          <div>
            <div className={styles.authorName}>beyondlaunch</div>
            <div className={styles.authorBrand}>{f.sub}</div>
          </div>
        </div>
        <div className={styles.metric}>{f.tag}</div>
      </div>
    </motion.div>
  )
}

export default function SocialProof() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why us
        </motion.span>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Built different. By design.
        </motion.h2>

        <div className={styles.statsBar}>
          <div className={styles.textStat}>
            <div className={styles.textStatVal}>D2C</div>
            <div className={styles.textStatLabel}>Exclusive focus</div>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.textStat}>
            <div className={styles.textStatVal}>Expert</div>
            <div className={styles.textStatLabel}>Led execution</div>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.textStat}>
            <div className={styles.textStatVal}>Full-stack</div>
            <div className={styles.textStatLabel}>Ads to automation</div>
          </div>
        </div>

        <div className={styles.testimonials}>
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
