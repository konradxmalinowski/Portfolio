import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import AnimatedBackground from './components/AnimatedBackground'
import ScrollProgress from './components/ScrollProgress'
import LanguageSwitcher from './components/LanguageSwitcher'

function App() {
  return (
    <>
      <ScrollProgress />
      <LanguageSwitcher />
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <Hero />
        <About />
        <Services />
        <Experience />
        <Skills />
        <Contact />
      </div>
    </>
  )
}

export default App
