import { motion } from 'framer-motion'
import styles from './ProblemSection.module.css'

const problems = [
  {
    icon: '⚠',
    num: '01',
    title: "Your reels get views. But no one's buying.",
    body: 'Great content with no path to purchase leaks sales every single day.',
  },
  {
    icon: '💬',
    num: '02',
    title: "You're closing orders over DMs. Manually. Every day.",
    body: "Unsustainable, unscalable, and you're leaving half your buyers behind.",
  },
  {
    icon: '🌐',
    num: '03',
    title: 'You tried a website. It just sits there.',
    body: 'A homepage with no funnel is just an expensive business card.',
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
            You're doing everything right.
            <br />
            <span className={styles.dim}>So why aren't orders coming in?</span>
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
