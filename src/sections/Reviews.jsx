import { Reveal } from '../components/Reveal.jsx'

const REVIEWS = [
  {
    quote: 'Vystra turned our vague idea into a site that genuinely looks like a million bucks. Leads doubled within a month.',
    name: 'Priya Sharma',
    role: 'Founder, DreamzDezignerz',
    initials: 'PS',
  },
  {
    quote: 'Fast, communicative and the design taste is unreal. It doesn\'t look like every other template out there.',
    name: 'Arjun Mehta',
    role: 'CEO, Nova Labs',
    initials: 'AM',
  },
  {
    quote: 'They obsess over the tiny details most agencies skip. The animations and speed blew our team away.',
    name: 'Sara Khan',
    role: 'Marketing Lead, Brightly',
    initials: 'SK',
  },
]

export default function Reviews() {
  return (
    <section className="section reviews" id="reviews">
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow"><span className="num">05</span> Kind Words</span>
          <h2 className="section__title">
            Clients who'd <span className="serif gold">recommend us.</span>
          </h2>
        </Reveal>

        <div className="reviews__grid">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1} y={24}>
              <figure className="review">
                <span className="review__mark">"</span>
                <blockquote>{r.quote}</blockquote>
                <figcaption>
                  <span className="review__avatar">{r.initials}</span>
                  <span>
                    <span className="review__name">{r.name}</span>
                    <span className="review__role">{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
