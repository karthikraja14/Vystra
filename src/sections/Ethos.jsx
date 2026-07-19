import { Reveal, TextReveal } from '../components/Reveal.jsx'

const VALUES = [
  { k: 'Craft', v: 'Every pixel intentional. No lazy templates, ever.' },
  { k: 'Speed', v: 'Weeks, not months — without cutting corners.' },
  { k: 'Partnership', v: 'We act like your in-house team, not a vendor.' },
  { k: 'Results', v: 'Beautiful is the baseline. Revenue is the goal.' },
]

export default function Ethos() {
  return (
    <section className="section ethos" id="about">
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow"><span className="num">01</span> Who We Are</span>
        </Reveal>

        <h2 className="ethos__statement">
          <TextReveal text="We don't just build websites." />
          <br />
          <span className="ethos__statement-accent">
            <TextReveal text="We build" />
            <span className="serif gold">&nbsp;unfair advantages</span>
            <TextReveal text="for brands bold enough to stand out." delay={0.2} />
          </span>
        </h2>

        <div className="ethos__grid">
          <Reveal className="ethos__block" delay={0.05}>
            <span className="ethos__label">Our Vision</span>
            <p className="ethos__text">
              To become the studio ambitious brands trust to shape how they're seen online —
              where every site we ship becomes their sharpest competitive edge.
            </p>
          </Reveal>

          <Reveal className="ethos__block" delay={0.12}>
            <span className="ethos__label">Our Mission</span>
            <p className="ethos__text">
              To design and build websites so distinctive, fast and persuasive that they turn
              visitors into revenue — delivered with the care of a boutique studio and the
              pace of a startup.
            </p>
          </Reveal>
        </div>

        <div className="ethos__values">
          {VALUES.map((val, i) => (
            <Reveal key={val.k} className="ethos__value" delay={i * 0.06} y={18}>
              <span className="ethos__value-k">{val.k}</span>
              <span className="ethos__value-v">{val.v}</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="ethos__founder" delay={0.1}>
          <span className="ethos__founder-label">Led by</span>
          <span className="ethos__founder-name">Karthik Raja</span>
          <span className="ethos__founder-sep">·</span>
          <span className="ethos__founder-role">Founder &amp; Lead Engineer</span>
          <a
            href="https://karthikraja.in"
            target="_blank"
            rel="noreferrer"
            className="ethos__founder-link"
          >
            View portfolio ↗
          </a>
        </Reveal>
      </div>
    </section>
  )
}
