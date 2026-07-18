import { Reveal } from '../components/Reveal.jsx'

const SERVICES = [
  {
    id: '01',
    title: 'Landing Pages',
    desc: 'High-converting single pages built to turn clicks into customers.',
    tags: ['Design', 'Copy', 'CRO'],
  },
  {
    id: '02',
    title: 'Business Websites',
    desc: 'Multi-page sites that make small brands look like category leaders.',
    tags: ['UX', 'CMS', 'SEO'],
  },
  {
    id: '03',
    title: 'E-commerce',
    desc: 'Fast, frictionless stores engineered to maximise average order value.',
    tags: ['Shopify', 'Payments', 'Speed'],
  },
  {
    id: '04',
    title: 'Web Apps & SaaS',
    desc: 'Product interfaces and dashboards that feel effortless to use.',
    tags: ['React', 'UI', 'Systems'],
  },
  {
    id: '05',
    title: 'Brand & Identity',
    desc: 'Logos, palettes and visual systems that stick in memory.',
    tags: ['Logo', 'Guidelines', 'Assets'],
  },
  {
    id: '06',
    title: 'Redesigns & SEO',
    desc: 'Rebuild tired sites into modern, rank-worthy revenue machines.',
    tags: ['Audit', 'Migrate', 'Rank'],
  },
]

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow"><span className="num">03</span> Capabilities</span>
          <h2 className="section__title">
            Everything you need to <span className="serif gold">win online.</span>
          </h2>
        </Reveal>

        <div className="rows">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06} y={18}>
              <div className="svc">
                <span className="svc__id">{s.id}</span>
                <h3 className="svc__title">{s.title}</h3>
                <p className="svc__desc">{s.desc}</p>
                <div className="svc__tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
