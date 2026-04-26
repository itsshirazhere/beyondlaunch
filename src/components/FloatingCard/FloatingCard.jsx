import { motion } from 'framer-motion'
import styles from './FloatingCard.module.css'

export default function FloatingCard({ value, label, icon, delay = 0, x = 'auto', y = 'auto' }) {
  return (
    <motion.div
      className={styles.outer}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.75, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className={styles.card}
        animate={{ y: [0, -9, 0] }}
        transition={{
          delay,
          duration: 3.8,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.04 }}
      >
        <div className={styles.iconWrap}>{icon}</div>
        <div>
          <div className={styles.value}>{value}</div>
          <div className={styles.label}>{label}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
