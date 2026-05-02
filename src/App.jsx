import CustomCursor from './components/CustomCursor/CustomCursor'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import MarqueeBar from './components/MarqueeBar/MarqueeBar'
import ProblemSection from './components/ProblemSection/ProblemSection'
import ServicesSection from './components/ServicesSection/ServicesSection'
import ProcessSection from './components/ProcessSection/ProcessSection'
import CTASection from './components/CTASection/CTASection'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <MarqueeBar />
        <section id="services"><ProblemSection /><ServicesSection /></section>
<section id="process"><ProcessSection /></section>
        <section id="contact"><CTASection /></section>
      </main>
      <Footer />
    </>
  )
}

export default App
