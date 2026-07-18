import useLenis from './hooks/useLenis.js'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Marquee from './sections/Marquee.jsx'
import Work from './sections/Work.jsx'
import Services from './sections/Services.jsx'
import Process from './sections/Process.jsx'
import Numbers from './sections/Numbers.jsx'
import Pricing from './sections/Pricing.jsx'
import Reviews from './sections/Reviews.jsx'
import Faq from './sections/Faq.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'
import WhatsApp from './components/WhatsApp.jsx'
import './App.css'

export default function App() {
  useLenis()

  return (
    <>
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <Process />
        <Numbers />
        <Pricing />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}
