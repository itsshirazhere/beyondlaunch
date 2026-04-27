import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroScene from '../HeroScene/HeroScene'
import ParticleField from '../ParticleField/ParticleField'
import FloatingCard from '../FloatingCard/FloatingCard'
import styles from './Hero.module.css'

// Stagger each word in from below with a perspective flip
function WordReveal({ children, className, delay = 0 }) {
  const words = String(children).split(' ')
  return (
    <span
      className={className}
      style={{ display: 'block', perspective: '600px' }}
    >
      <motion.span
        style={{ display: 'block' }}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', marginRight: '0.28em' }}
            variants={{
              hidden: { opacity: 0, y: 28, rotateX: -70 },
              show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </span>
  )
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
}

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div ref={heroRef} className={styles.hero}>
      {/* Background layers */}
      <div className={styles.bgLayers}>
        <ParticleField />
        <div className={styles.glow} />
        <div className={styles.gridFloor} />
        <div className={styles.scanline} />
      </div>

      <div className={styles.inner}>
        {/* Left — text */}
        <motion.div
          className={styles.left}
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          >
            <motion.span className={styles.label} variants={item}>
              D2C Growth Agency
            </motion.span>

            <h1 className={styles.h1}>
              <WordReveal delay={0.2}>From scroll</WordReveal>
              <WordReveal className={styles.accentLine} delay={0.38}>to sold.</WordReveal>
            </h1>

            <motion.p className={styles.sub} variants={item}>
              We design and operate end-to-end growth systems — from ads and creatives to landing pages and automation — built to convert, not just attract
            </motion.p>

            <motion.div variants={item} className={styles.ctaRow}>
              <motion.button
                className={styles.cta}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  // REPLACE: calendly link
                  window.open('https://calendly.com/shirazyousuf2017/30min', '_blank')
                }}
              >
                Book a free audit
                <span className={styles.ctaArrow}>→</span>
              </motion.button>
              <span className={styles.ctaNote}>No commitment</span>
            </motion.div>

            <motion.div className={styles.stats} variants={item}>
              {[
                ['Full-stack', 'growth system'],
                ['Scalable', 'by design'],
                ['D2C', 'brands only'],
              ].map(([val, lbl]) => (
                <div key={val} className={styles.stat}>
                  <span className={styles.statVal}>{val}</span>
                  <span className={styles.statLbl}>{lbl}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right — Three.js */}
        <div className={styles.right}>
          <HeroScene />

          <FloatingCard value="Full-stack Growth" label="ads to automation" icon="⚡" delay={0.9} x="-30px" y="36%" />
          <FloatingCard value="Done-for-you" label="we own the stack" icon="◆" delay={1.1} x="52%" y="7%" />
          <FloatingCard value="D2C Exclusive" label="built for e-commerce" icon="🎯" delay={1.3} x="6%" y="74%" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className={styles.bottomFade} />
    </div>
  )
}
