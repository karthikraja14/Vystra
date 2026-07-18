import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../components/Reveal.jsx'

const FAQS = [
  {
    q: 'How long does a website take?',
    a: 'Most landing pages ship in about a week; larger multi-page sites take 2–3 weeks. We give you a firm timeline before we start.',
  },
  {
    q: 'Do I own the website and code?',
    a: 'Completely. Once the project is paid, everything — design, code, assets and accounts — is 100% yours.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Just your goals, any brand assets you have, and content ideas. We handle the design, copy direction and build.',
  },
  {
    q: 'Do you offer ongoing maintenance?',
    a: 'Yes. We offer optional monthly care plans for updates, backups, tweaks and priority support.',
  },
  {
    q: 'Can you redesign my existing site?',
    a: 'Absolutely. We audit what you have, keep what works, and rebuild it faster, cleaner and more distinctive.',
  },
]

function Item({ q, a, i }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal delay={i * 0.05} y={16}>
      <div className={`faq ${open ? 'faq--open' : ''}`}>
        <button className="faq__q" onClick={() => setOpen(!open)}>
          <span>{q}</span>
          <span className="faq__icon">{open ? '−' : '+'}</span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="faq__a-wrap"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="faq__a">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

export default function Faq() {
  return (
    <section className="section faq-section" id="faq">
      <div className="wrap faq__layout">
        <Reveal className="faq__intro">
          <span className="eyebrow"><span className="num">06</span> FAQ</span>
          <h2 className="section__title">
            Questions, <span className="serif gold">answered.</span>
          </h2>
          <p className="faq__note">Still unsure? Message us on WhatsApp — we reply fast.</p>
        </Reveal>

        <div className="faq__list">
          {FAQS.map((f, i) => (
            <Item key={f.q} {...f} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
