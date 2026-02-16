import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Nav = () => {
  const { t, language, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#work', label: t('nav.work') },
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-sm border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-semibold text-primary text-lg tracking-tight">
          KM
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-secondary hover:text-primary transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}

          {/* Language switcher */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden ml-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                language === 'en'
                  ? 'bg-primary text-white'
                  : 'text-muted hover:text-primary'
              }`}
              aria-label="Switch to English"
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('pl')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                language === 'pl'
                  ? 'bg-primary text-white'
                  : 'text-muted hover:text-primary'
              }`}
              aria-label="Switch to Polish"
              aria-pressed={language === 'pl'}
            >
              PL
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-secondary hover:text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-b border-border">
          <div className="px-6 py-4 space-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => { setLanguage('en'); setMobileOpen(false) }}
                className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
                  language === 'en'
                    ? 'bg-primary text-white border-primary'
                    : 'text-muted border-border hover:text-primary'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => { setLanguage('pl'); setMobileOpen(false) }}
                className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
                  language === 'pl'
                    ? 'bg-primary text-white border-primary'
                    : 'text-muted border-border hover:text-primary'
                }`}
              >
                PL
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Nav
