import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WhatsApp() {
  const [open, setOpen] = useState(false)

  return (
    <div className="wa">
      <AnimatePresence>
        {open && (
          <motion.div
            className="wa__card"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="wa__head">
              <span className="wa__avatar">V</span>
              <div>
                <strong>Vystra</strong>
                <span className="wa__online">● Typically replies in minutes</span>
              </div>
            </div>
            <p className="wa__msg">Hi 👋 Got a project in mind? Message us and we'll get right back to you.</p>
            <a href="https://wa.me/919087340087?text=Hi%20Vystra%2C%20I'd%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className="wa__go">
              Chat on WhatsApp →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="wa__fab"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Chat on WhatsApp"
      >
        {open ? (
          <span className="wa__close">✕</span>
        ) : (
          <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor">
            <path d="M16 2.7C8.6 2.7 2.7 8.6 2.7 16c0 2.4.6 4.6 1.8 6.6L2.5 29.5l7.1-1.9c1.9 1 4.1 1.6 6.4 1.6 7.4 0 13.3-5.9 13.3-13.3S23.4 2.7 16 2.7zm0 24.1c-2 0-4-.5-5.7-1.6l-.4-.2-4.2 1.1 1.1-4.1-.3-.4c-1.1-1.8-1.7-3.8-1.7-5.9C4.7 9.8 9.8 4.7 16 4.7S27.3 9.8 27.3 16 22.2 26.8 16 26.8zm6.2-8c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.2-.6-.4z" />
          </svg>
        )}
      </motion.button>
    </div>
  )
}
