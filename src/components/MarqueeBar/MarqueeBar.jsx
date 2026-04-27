import { motion } from 'framer-motion'
import styles from './MarqueeBar.module.css'

const items = [
  'D2C brands only',
  'Paid acquisition',
  'Conversion pages',
  'Performance creatives',
  'End-to-end execution',
  'Marketing automation',
  'Full-stack growth',
  'Scroll to revenue',
]

export default function MarqueeBar() {
  const doubled = [...items, ...items]
  return (
    <div className={styles.bar} aria-hidden="true">
      <motion.div
        className={styles.track}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot}>◆</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
