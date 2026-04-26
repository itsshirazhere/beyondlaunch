import { motion } from 'framer-motion'
import styles from './MarqueeBar.module.css'

const items = [
  '3× avg revenue lift',
  '48h first delivery',
  '23 D2C brands scaled',
  '+320% avg conversion',
  'D2C brands only',
  'No retainer needed',
  'Results in 30 days',
  'Instagram → revenue',
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
