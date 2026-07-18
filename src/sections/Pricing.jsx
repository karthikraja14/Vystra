import { Reveal } from '../components/Reveal.jsx'
import Magnetic from '../components/Magnetic.jsx'

const TIERS = [
  {
    name: 'Launch',
    price: '₹14,999',
    tag: 'Perfect for a first site',
    features: ['1-page landing site', 'Mobile responsive', 'Contact form', 'Basic SEO setup', 'Delivered in 5 days'],
    featured: false,
  },
  {
    name: 'Growth',
    price: '₹34,999',
    tag: 'Most popular',
    features: ['Up to 6 pages', 'Custom design system', 'CMS / editable content', 'Advanced SEO', 'Analytics + speed tuning', '2 weeks turnaround'],
    featured: true,
  },
  {
    name: 'Scale',
    price: '₹74,999+',
    tag: 'For serious brands',
    features: ['Unlimited pages / app', 'Bespoke animations', 'E-commerce or web app', 'Brand identity included', 'Priority support', 'Ongoing partnership'],
    featured: false,
  },
]

const ADDONS = ['Logo & branding', 'Copywriting', 'Extra pages', 'Blog / CMS', 'Maintenance plan', 'Rush delivery']

function scrollTo(href) {
  const el = document.querySelector(href)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow"><span className="num">05</span> Pricing</span>
          <h2 className="section__title">
            Simple, honest <span className="serif gold">pricing.</span>
          </h2>
        </Reveal>

        <div className="pricing__grid">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} y={26}>
              <div className={`plan ${t.featured ? 'plan--featured' : ''}`}>
                {t.featured && <span className="plan__badge">{t.tag}</span>}
                <div className="plan__head">
                  <h3 className="plan__name">{t.name}</h3>
                  {!t.featured && <span className="plan__tag">{t.tag}</span>}
                </div>
                <div className="plan__price">{t.price}</div>
                <ul className="plan__features">
                  {t.features.map((f) => (
                    <li key={f}>
                      <span className="check">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Magnetic strength={0.2}>
                  <a
                    href="#contact"
                    className={`btn ${t.featured ? 'btn--gold' : 'btn--ghost'} btn--full`}
                    onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
                  >
                    Choose {t.name}
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="addons" delay={0.15}>
          <span className="addons__label">Add-ons</span>
          <div className="addons__list">
            {ADDONS.map((a) => (
              <span className="addon" key={a}>{a}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
