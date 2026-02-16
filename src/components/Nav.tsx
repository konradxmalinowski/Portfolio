import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Nav = () => {
  const { t, language, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem('theme', next)
  }, [theme])

  const links = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#work', label: t('nav.work') },
    { href: '#contact', label: t('nav.contact') },
  ]

  const ThemeIcon = () =>
    theme === 'dark' ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )

  return (
    <>
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

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-muted hover:text-primary transition-colors duration-150 rounded-lg hover:bg-background"
              aria-label={theme === 'dark' ? t('nav.theme.light') : t('nav.theme.dark')}
            >
              <ThemeIcon />
            </button>

            {/* Language switcher */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                  language === 'en'
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
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
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
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
            className="md:hidden p-2 text-secondary hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t('nav.menu.close') : t('nav.menu.open')}
            aria-expanded={mobileOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay + drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-surface border-l border-border shadow-xl transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close button */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-border">
            <span className="font-semibold text-primary text-lg tracking-tight">KM</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-muted hover:text-primary transition-colors"
              aria-label={t('nav.menu.close')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="px-6 py-6 space-y-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors text-base font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:text-primary rounded-lg hover:bg-background transition-colors"
                aria-label={theme === 'dark' ? t('nav.theme.light') : t('nav.theme.dark')}
              >
                <ThemeIcon />
                <span>{theme === 'dark' ? t('nav.theme.light') : t('nav.theme.dark')}</span>
              </button>

              {/* Language toggle */}
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => { setLanguage('en'); setMobileOpen(false) }}
                  className={`px-3 py-2 text-xs font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => { setLanguage('pl'); setMobileOpen(false) }}
                  className={`px-3 py-2 text-xs font-medium transition-colors ${
                    language === 'pl'
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  PL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav
