import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CounterStat from '../CounterStat/CounterStat'
import styles from './SocialProof.module.css'

const testimonials = [
  {
    // REPLACE: testimonial
    text: "Working with this agency completely transformed our D2C business. In three months, our conversion rate tripled and we went from manually chasing DMs to having a system that sells for us 24/7. The ROI speaks for itself.",
    initials: 'AK',   // REPLACE: founder initials
    name: 'Arjun K.', // REPLACE: founder name
    brand: 'Nourish Co.', // REPLACE: brand name
    metric: '+312% revenue',
  },
  {
    // REPLACE: testimonial
    text: "I was sceptical at first — we'd tried agencies before and been burned. But they delivered the first landing page in 48 hours and it converted better than anything we'd run. We've scaled 4x in revenue since.",
    initials: 'PS',      // REPLACE: founder initials
    name: 'Priya S.',    // REPLACE: founder name
    brand: 'Glow Studio',// REPLACE: brand name
    metric: '4× revenue',
  },
]

function TestimonialCard({ t, delay }) {
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
      {/* Gradient border */}
      <div className={styles.cardBorder} />

      <div className={styles.quoteGlyph}>"</div>
      <p className={styles.text}>{t.text}</p>

      <div className={styles.stars}>{'★'.repeat(5)}</div>

      <div className={styles.footer}>
        <div className={styles.author}>
          <div className={styles.avatar}>{t.initials}</div>
          <div>
            <div className={styles.authorName}>{t.name}</div>
            <div className={styles.authorBrand}>{t.brand}</div>
          </div>
        </div>
        <div className={styles.metric}>{t.metric}</div>
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
          Proof
        </motion.span>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          The numbers don't lie.
        </motion.h2>

        <div className={styles.statsBar}>
          <CounterStat value={320} prefix="+" suffix="%" label="avg conversion lift" />
          <div className={styles.statDivider} />
          <CounterStat value={23} suffix="+" label="D2C brands helped" />
          <div className={styles.statDivider} />
          <CounterStat value={4} suffix="×" label="average ROI" />
        </div>

        <div className={styles.testimonials}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
