import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import AnimatedBackground from './components/AnimatedBackground'
import ScrollProgress from './components/ScrollProgress'
import LanguageSwitcher from './components/LanguageSwitcher'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white focus:top-4 focus:left-4 focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <LanguageSwitcher />
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <main id="main-content">
          <Hero />
          <About />
          <Services />
          <Experience />
          <Skills />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
