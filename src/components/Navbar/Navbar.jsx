import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import styles from './Navbar.module.css'

const links = [
  { label: 'Services', href: '#services' },
{ label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const savedScrollY = useRef(0)

  useEffect(() => {
    return scrollY.on('change', (val) => setScrolled(val > 60))
  }, [scrollY])

  // iOS-safe scroll lock: position:fixed preserves scroll position
  useEffect(() => {
    if (menuOpen) {
      savedScrollY.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${savedScrollY.current}px`
      document.body.style.width = '100%'
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, savedScrollY.current)
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [menuOpen])

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <a href="#hero" className={styles.wordmark}>
        <img src="/logo.png" alt="Beyond Launch" className={styles.logo} />
      </a>

      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.label}><a href={l.href}>{l.label}</a></li>
        ))}
      </ul>

      <a href="#contact" className={styles.cta}>Book a free audit</a>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`${styles.bar} ${menuOpen ? styles.open1 : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.open2 : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.open3 : ''}`} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className={styles.drawerHeader}>
                <img src="/logo.png" alt="Beyond Launch" className={styles.drawerLogo} />
                <button
                  className={styles.drawerClose}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <ul className={styles.drawerLinks}>
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
                  </li>
                ))}
              </ul>

              <div className={styles.drawerFooter}>
                <a href="#contact" className={styles.ctaMobile} onClick={() => setMenuOpen(false)}>
                  Book a free audit
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
