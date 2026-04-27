import { motion } from 'framer-motion'
import styles from './ProblemSection.module.css'

const problems = [
  {
    icon: '⚠',
    num: '01',
    title: "Traffic without conversion.",
    body: 'You’re getting attention, but there’s no structured path to purchase. Content alone doesn’t convert — systems do.',
  },
  {
    icon: '💬',
    num: '02',
    title: "Manual sales dependency.",
    body: "Closing through DMs and follow-ups isn’t scalable. Revenue shouldn’t depend on constant manual effort.",
  },
  {
    icon: '🌐',
    num: '03',
    title: 'Disconnected stack.',
    body: 'Ads, website, and messaging operate in silos. Without alignment, performance drops at every step.',
  },
]

export default function ProblemSection() {
  return (
    <section className={styles.section}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Sound familiar?
        </motion.span>

        <div className={styles.headRow}>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Growth isn’t broken. The system is.
            <br />
            <span className={styles.dim}>COMMON FAILURE POINTS</span>
          </motion.h2>
        </div>

        <motion.div
          className={styles.cards}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.18 } } }}
        >
          {problems.map((p) => (
            <motion.div
              key={p.num}
              className={styles.card}
              variants={{
                hidden: { opacity: 0, x: -32 },
                show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] } },
              }}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              {/* Accent line animates height on inView */}
              <div className={styles.accentBar} />

              <div className={styles.cardInner}>
                <div className={styles.cardHead}>
                  <div className={styles.iconCircle}>{p.icon}</div>
                  <span className={styles.cardNum}>{p.num}</span>
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardBody}>{p.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
