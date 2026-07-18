import { useState } from 'react'
import { Reveal } from '../components/Reveal.jsx'
import Magnetic from '../components/Magnetic.jsx'

// Get your free access key at https://web3forms.com (send to admin@vystra.in)
const WEB3FORMS_KEY = '344a3cae-c5ad-4f3f-b8d6-79d16f158335'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    data.append('access_key', WEB3FORMS_KEY)
    data.append('subject', 'New Vystra enquiry')
    data.append('from_name', 'Vystra Website')

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setStatus('done')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="wrap contact__layout">
        <Reveal className="contact__left">
          <span className="eyebrow"><span className="num">08</span> Start a Project</span>
          <h2 className="section__title">
            Let's build something <span className="serif gold">unforgettable.</span>
          </h2>
          <p className="contact__lead">
            Tell us a little about your project. We'll reply within 24 hours with next steps —
            no pressure, no jargon.
          </p>

          <div className="contact__info">
            <a href="mailto:admin@vystra.in" className="contact__info-item">
              <span className="contact__info-label">Email</span>
              <span className="contact__info-val">admin@vystra.in</span>
            </a>
            <a href="https://wa.me/919087340087" target="_blank" rel="noreferrer" className="contact__info-item">
              <span className="contact__info-label">WhatsApp</span>
              <span className="contact__info-val">Chat with us →</span>
            </a>
          </div>
        </Reveal>

        <Reveal className="contact__form-wrap" delay={0.12}>
          <form className="form" onSubmit={onSubmit}>
            <div className="form__row">
              <label className="field">
                <span>Name</span>
                <input type="text" name="name" required placeholder="Your name" />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" name="email" required placeholder="you@company.com" />
              </label>
            </div>
            <label className="field">
              <span>Project type</span>
              <select name="project_type" defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Landing page</option>
                <option>Business website</option>
                <option>E-commerce</option>
                <option>Web app / SaaS</option>
                <option>Redesign</option>
                <option>Other</option>
              </select>
            </label>
            <label className="field">
              <span>Tell us about it</span>
              <textarea name="message" rows="4" required placeholder="What are you building, and what's the goal?"></textarea>
            </label>

            <Magnetic strength={0.15}>
              <button type="submit" className="btn btn--gold btn--full btn--lg" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send enquiry →'}
              </button>
            </Magnetic>

            {status === 'done' && <p className="form__msg form__msg--ok">Thanks! We'll be in touch within 24 hours.</p>}
            {status === 'error' && <p className="form__msg form__msg--err">Something went wrong. Please email admin@vystra.in.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
