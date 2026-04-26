import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.wordmark}>
          <img src="/logo.png" alt="Beyond Launch" className={styles.logo} />
        </a>
        <span className={styles.tagline}>From scroll to sold.</span>
        <span className={styles.copy}>© 2026 Beyond Launch</span>
      </div>
    </footer>
  )
}
