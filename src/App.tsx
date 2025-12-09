import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Experience from './components/Experience'
import Awards from './components/Awards'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import AnimatedBackground from './components/AnimatedBackground'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
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
      <ScrollToTop />
      <LanguageSwitcher />
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <main id="main-content">
          <Hero />
          <About />
          <Services />
          <Experience />
          <Awards />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
