import { Reveal } from '../components/Reveal.jsx'
import Magnetic from '../components/Magnetic.jsx'

function scrollTo(href) {
  const el = document.querySelector(href)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Audit() {
  return (
    <section className="audit" id="audit">
      <div className="wrap">
        <div className="audit__card">
          <div className="audit__glow" aria-hidden />
          <Reveal>
            <span className="audit__eyebrow">
              <span className="dot" /> Free · No obligation
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="audit__title">
              Get a free website teardown — <span className="serif gold">worth ₹5,000.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="audit__sub">
              Send us your current site (or your idea). Within 48 hours we'll send back a
              short video breaking down exactly what's costing you conversions — design,
              speed, copy and SEO — plus 3 quick wins you can ship this week. No pitch, no
              pressure. Keep the insights even if we never work together.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="audit__actions">
              <Magnetic strength={0.3}>
                <a
                  href="#contact"
                  className="btn btn--gold btn--lg"
                  onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
                >
                  Claim my free teardown →
                </a>
              </Magnetic>
              <span className="audit__note">Only 4 audits taken per week.</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
