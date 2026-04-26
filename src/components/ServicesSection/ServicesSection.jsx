import { useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import ServiceCard3D from '../ServiceCard3D/ServiceCard3D'
import styles from './ServicesSection.module.css'

const services = [
  {
    num: '01',
    title: 'Social Funnels',       // REPLACE: service title
    desc: 'We turn your Instagram content into a structured sales funnel that converts followers into buyers on autopilot.',
    shape: 'cube',
    tag: 'Most popular',
  },
  {
    num: '02',
    title: 'Landing Pages',        // REPLACE: service title
    desc: 'High-converting D2C landing pages built to capture traffic and push it straight to checkout — no distractions.',
    shape: 'sphere',
    tag: null,
  },
  {
    num: '03',
    title: 'AI-Powered Video',     // REPLACE: service title
    desc: 'Scroll-stopping short-form video produced with AI tools — faster, cheaper, and optimised for platform algorithms.',
    shape: 'pyramid',
    tag: null,
  },
  {
    num: '04',
    title: 'WhatsApp Automations', // REPLACE: service title
    desc: 'Automated WhatsApp flows that follow up with leads, recover abandoned carts, and close sales while you sleep.',
    shape: 'ring',
    tag: 'New',
  },
]

function TiltCard({ service, index }) {
  const [hovered, setHovered] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotX = useSpring(useTransform(my, [-60, 60], [8, -8]), { stiffness: 200, damping: 20 })
  const rotY = useSpring(useTransform(mx, [-60, 60], [-8, 8]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - rect.left - rect.width / 2)
    my.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      style={{ perspective: '1200px' }}
      variants={{
        hidden: { opacity: 0, y: 44 },
        show: {
          opacity: 1, y: 0,
          transition: { duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] },
        },
      }}
    >
      <motion.div
        className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
        style={{ rotateX: rotX, rotateY: rotY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
      >
        {service.tag && <div className={styles.tag}>{service.tag}</div>}

        <div className={styles.cardTop}>
          <ServiceCard3D shape={service.shape} isHovered={hovered} />
          <span className={styles.num}>{service.num}</span>
        </div>

        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.desc}>{service.desc}</p>

        <div className={styles.cardFooter}>
          <span className={styles.more}>Learn more</span>
          <motion.span
            className={styles.arrow}
            animate={hovered ? { x: 4 } : { x: 0 }}
            transition={{ duration: 0.2 }}
          >→</motion.span>
        </div>

        {/* Bottom gradient line */}
        <div className={`${styles.bottomLine} ${hovered ? styles.bottomLineActive : ''}`} />
      </motion.div>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What we do
        </motion.span>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Everything between
          <br />
          <span className={styles.accentText}>attention</span> and revenue.
        </motion.h2>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
        >
          We don't do vanity metrics. Every service directly affects how many orders you get.
        </motion.p>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0 } } }}
        >
          {services.map((s, i) => <TiltCard key={s.num} service={s} index={i} />)}
        </motion.div>
      </div>
    </section>
  )
}
