import { Reveal } from '../components/Reveal.jsx'

const SERVICES = [
  {
    id: '01',
    title: 'Websites & Landing Pages',
    desc: 'High-converting sites that turn clicks into customers and browsers into buyers.',
    tags: ['Design', 'Copy', 'CRO'],
  },
  {
    id: '02',
    title: 'Web & Mobile Apps',
    desc: 'Product interfaces, dashboards and mobile apps that feel effortless to use.',
    tags: ['React', 'UI', 'Mobile'],
  },
  {
    id: '03',
    title: 'SaaS & Product Builds',
    desc: 'From MVP to full platform — we design, build and ship real software products.',
    tags: ['MVP', 'Systems', 'Scale'],
  },
  {
    id: '04',
    title: 'E-commerce',
    desc: 'Fast, frictionless stores engineered to maximise average order value.',
    tags: ['Shopify', 'Payments', 'Speed'],
  },
  {
    id: '05',
    title: 'Brand & Identity',
    desc: 'Logos, palettes and visual systems that stick in memory.',
    tags: ['Logo', 'Guidelines', 'Assets'],
  },
  {
    id: '06',
    title: 'Redesign & SEO',
    desc: 'Rebuild tired products into modern, rank-worthy revenue machines.',
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
