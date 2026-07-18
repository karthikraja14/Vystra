const YEAR = new Date().getFullYear()

function scrollTo(href) {
  const el = document.querySelector(href)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <a href="#top" className="logo logo--lg" onClick={(e) => { e.preventDefault(); scrollTo('#top') }}>
            <span className="logo__mark">V</span>
            <span className="logo__txt">Vystra</span>
          </a>
          <p className="footer__tag">
            Design that sells. <span className="serif gold">Code that scales.</span>
          </p>
        </div>

        <div className="footer__grid">
          <div className="footer__col">
            <span className="footer__h">Studio</span>
            <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('#work') }}>Work</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('#services') }}>Services</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollTo('#pricing') }}>Pricing</a>
          </div>
          <div className="footer__col">
            <span className="footer__h">Connect</span>
            <a href="mailto:admin@vystra.in">Email</a>
            <a href="https://wa.me/919087340087" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="https://karthikraja.in" target="_blank" rel="noreferrer">Founder</a>
          </div>
          <div className="footer__col">
            <span className="footer__h">Get started</span>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}>Start a project</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {YEAR} Vystra. All rights reserved.</span>
          <span>Made with intent in India.</span>
        </div>
      </div>
    </footer>
  )
}
