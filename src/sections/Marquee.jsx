import { motion } from 'framer-motion'

const ITEMS = [
  'Landing pages', 'E-commerce', 'SaaS sites', 'Portfolios',
  'Brand identity', 'Webflow', 'SEO', 'Redesigns', 'Web apps', 'Framer',
]

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee">
      <motion.div
        className="marquee__track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span className="marquee__item" key={i}>
            {t}
            <span className="marquee__star">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
