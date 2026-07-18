import { Reveal } from '../components/Reveal.jsx'

const STEPS = [
  {
    id: '01',
    title: 'Discover',
    desc: 'We dig into your goals, audience and competitors to find your edge.',
    time: 'Day 1–2',
  },
  {
    id: '02',
    title: 'Design',
    desc: 'Distinctive, on-brand concepts — reviewed together until it feels right.',
    time: 'Day 3–7',
  },
  {
    id: '03',
    title: 'Build',
    desc: 'Pixel-perfect, blazing-fast development with clean, scalable code.',
    time: 'Week 2',
  },
  {
    id: '04',
    title: 'Launch',
    desc: 'Testing, SEO, analytics and a smooth go-live. We handle it all.',
    time: 'Week 3',
  },
]

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow"><span className="num">03</span> How We Work</span>
          <h2 className="section__title">
            A calm, clear path from <span className="serif gold">idea to launch.</span>
          </h2>
        </Reveal>

        <div className="process__grid">
          {STEPS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08} y={22}>
              <div className="step">
                <div className="step__top">
                  <span className="step__id">{s.id}</span>
                  <span className="step__time">{s.time}</span>
                </div>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__desc">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
