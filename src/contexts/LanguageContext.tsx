import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'pl'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    'hero.greeting': "Hello, I'm",
    'hero.role': 'Full Stack Developer',
    'hero.cta': 'Get In Touch',

    'about.title': 'About Me',
    'about.p1': "I'm a high school student who's already developing as a",
    'about.p1.bold': 'full-stack developer',
    'about.p1.rest': 'out of pure passion. Since 2022, I\'ve been learning through hands-on experience — building my own projects, experimenting with new ideas, and constantly improving my skills.',
    'about.p2': 'Being',
    'about.p2.bold': 'self-taught',
    'about.p2.rest': 'has taught me courage to face challenges and flexibility in working with new technologies. I focus on modern, functional solutions that truly meet user needs.',
    'about.p3': 'I use',
    'about.p3.bold': 'AI',
    'about.p3.rest': 'as a tool to speed up workflows, enhance creativity, and open the door to more innovative solutions.',

    'services.title': 'Services',
    'services.subtitle': 'Professional web development solutions tailored to your needs',

    'service.landing.title': 'Landing Pages',
    'service.landing.desc': 'Modern, conversion-optimized landing pages designed to capture attention and drive results. Built with React and optimized for performance.',
    'service.landing.f1': 'Responsive Design',
    'service.landing.f2': 'SEO Optimized',
    'service.landing.f3': 'Fast Loading',
    'service.landing.f4': 'Analytics Integration',

    'service.portfolio.title': 'Portfolio Websites',
    'service.portfolio.desc': 'Professional portfolio websites that showcase your work beautifully. Perfect for creatives, developers, and professionals.',
    'service.portfolio.f1': 'Custom Design',
    'service.portfolio.f2': 'Project Showcase',
    'service.portfolio.f3': 'Contact Forms',
    'service.portfolio.f4': 'Smooth Animations',

    'service.wordpress.title': 'WordPress Websites',
    'service.wordpress.desc': 'Custom WordPress solutions with easy content management. From simple blogs to complex business websites.',
    'service.wordpress.f1': 'Easy Management',
    'service.wordpress.f2': 'Custom Themes',
    'service.wordpress.f3': 'Plugin Integration',
    'service.wordpress.f4': 'Regular Updates',

    'service.fullstack.title': 'Full-Stack Applications',
    'service.fullstack.desc': 'Complete web applications with modern tech stack. From concept to deployment, handling both frontend and backend.',
    'service.fullstack.f1': 'Modern Tech Stack',
    'service.fullstack.f2': 'API Development',
    'service.fullstack.f3': 'Database Design',
    'service.fullstack.f4': 'Cloud Deployment',

    'service.optimization.title': 'Website Optimization',
    'service.optimization.desc': 'Performance optimization and SEO improvements for existing websites. Make your site faster and more discoverable.',
    'service.optimization.f1': 'Speed Optimization',
    'service.optimization.f2': 'SEO Enhancement',
    'service.optimization.f3': 'Mobile Optimization',
    'service.optimization.f4': 'Technical Audit',

    'service.database.title': 'Database Design & Management',
    'service.database.desc': 'Professional database architecture, optimization, and management. From schema design to query optimization and migrations.',
    'service.database.f1': 'Schema Design',
    'service.database.f2': 'Query Optimization',
    'service.database.f3': 'Data Migrations',
    'service.database.f4': 'Performance Tuning',

    'experience.title': 'Experience',
    'experience.current': 'Current',

    'skills.title': 'Tech Stack',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.databases': 'Databases',
    'skills.tools': 'Tools & Other',

    'contact.title': 'Get In Touch',
    'contact.subtitle': "Have a project in mind? Let's work together to bring your ideas to life",
    'contact.info.title': 'Contact Information',
    'contact.email': 'Email',
    'contact.github': 'GitHub',
    'contact.linkedin': 'LinkedIn',
    'contact.availability.title': 'Available for Projects',
    'contact.availability.desc': "I'm currently accepting new projects and collaborations. Response time: Usually within 24 hours.",
    'contact.location': 'Location',
    'contact.form.title': 'Send a Message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.placeholder.name': 'Your name',
    'contact.form.placeholder.email': 'your.email@example.com',
    'contact.form.placeholder.message': 'Tell me about your project...',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': "Message sent successfully! I'll get back to you soon.",
    'contact.form.error': 'Failed to send message. Please try again or email me directly.',
  },
  pl: {
    'hero.greeting': 'Hej, jestem',
    'hero.role': 'Full Stack Developer',
    'hero.cta': 'Skontaktuj się',

    'about.title': 'O mnie',
    'about.p1': 'Jestem uczniem liceum, który już teraz rozwija się jako',
    'about.p1.bold': 'full-stack developer',
    'about.p1.rest': 'z czystej pasji. Od 2022 roku uczę się poprzez praktyczne doświadczenie — tworzę własne projekty, eksperymentuję z nowymi pomysłami i nieustannie rozwijam swoje umiejętności.',
    'about.p2': 'Bycie',
    'about.p2.bold': 'samoukiem',
    'about.p2.rest': 'nauczyło mnie odwagi w stawianiu czoła wyzwaniom oraz elastyczności w pracy z nowymi technologiami. Skupiam się na nowoczesnych, funkcjonalnych rozwiązaniach, które rzeczywiście spełniają potrzeby użytkowników.',
    'about.p3': 'Wykorzystuję',
    'about.p3.bold': 'AI',
    'about.p3.rest': 'jako narzędzie do przyspieszania procesów, wzmacniania kreatywności i otwierania drzwi do bardziej innowacyjnych rozwiązań.',

    'services.title': 'Usługi',
    'services.subtitle': 'Profesjonalne rozwiązania web development dostosowane do Twoich potrzeb',

    'service.landing.title': 'Landing Page',
    'service.landing.desc': 'Nowoczesne strony landing page zoptymalizowane pod kątem konwersji, zaprojektowane aby przyciągać uwagę i przynosić rezultaty. Zbudowane w React i zoptymalizowane pod kątem wydajności.',
    'service.landing.f1': 'Responsywny Design',
    'service.landing.f2': 'Optymalizacja SEO',
    'service.landing.f3': 'Szybkie Ładowanie',
    'service.landing.f4': 'Integracja Analityki',

    'service.portfolio.title': 'Strony Portfolio',
    'service.portfolio.desc': 'Profesjonalne strony portfolio, które pięknie prezentują Twoją pracę. Idealne dla kreatywnych, developerów i profesjonalistów.',
    'service.portfolio.f1': 'Własny Design',
    'service.portfolio.f2': 'Prezentacja Projektów',
    'service.portfolio.f3': 'Formularze Kontaktowe',
    'service.portfolio.f4': 'Płynne Animacje',

    'service.wordpress.title': 'Strony WordPress',
    'service.wordpress.desc': 'Niestandardowe rozwiązania WordPress z łatwym zarządzaniem treścią. Od prostych blogów po złożone strony biznesowe.',
    'service.wordpress.f1': 'Łatwe Zarządzanie',
    'service.wordpress.f2': 'Własne Motywy',
    'service.wordpress.f3': 'Integracja Wtyczek',
    'service.wordpress.f4': 'Regularne Aktualizacje',

    'service.fullstack.title': 'Aplikacje Full-Stack',
    'service.fullstack.desc': 'Kompletne aplikacje webowe z nowoczesnym stosem technologicznym. Od koncepcji do wdrożenia, obsługa frontend i backend.',
    'service.fullstack.f1': 'Nowoczesny Stack',
    'service.fullstack.f2': 'Rozwój API',
    'service.fullstack.f3': 'Projektowanie Baz Danych',
    'service.fullstack.f4': 'Wdrożenie w Chmurze',

    'service.optimization.title': 'Optymalizacja Stron',
    'service.optimization.desc': 'Optymalizacja wydajności i ulepszenia SEO dla istniejących stron. Spraw, aby Twoja strona była szybsza i łatwiejsza do znalezienia.',
    'service.optimization.f1': 'Optymalizacja Szybkości',
    'service.optimization.f2': 'Ulepszenie SEO',
    'service.optimization.f3': 'Optymalizacja Mobile',
    'service.optimization.f4': 'Audyt Techniczny',

    'service.database.title': 'Projektowanie i Zarządzanie Bazami Danych',
    'service.database.desc': 'Profesjonalna architektura, optymalizacja i zarządzanie bazami danych. Od projektowania schematu po optymalizację zapytań i migracje.',
    'service.database.f1': 'Projektowanie Schematu',
    'service.database.f2': 'Optymalizacja Zapytań',
    'service.database.f3': 'Migracje Danych',
    'service.database.f4': 'Tuning Wydajności',

    'experience.title': 'Doświadczenie',
    'experience.current': 'Obecnie',

    'skills.title': 'Stack Technologiczny',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.databases': 'Bazy Danych',
    'skills.tools': 'Narzędzia i Inne',

    'contact.title': 'Skontaktuj się',
    'contact.subtitle': 'Masz projekt na myśli? Pracujmy razem, aby wcielić Twoje pomysły w życie',
    'contact.info.title': 'Informacje Kontaktowe',
    'contact.email': 'Email',
    'contact.github': 'GitHub',
    'contact.linkedin': 'LinkedIn',
    'contact.availability.title': 'Dostępny do Projektów',
    'contact.availability.desc': 'Obecnie przyjmuję nowe projekty i współprace. Czas odpowiedzi: Zwykle w ciągu 24 godzin.',
    'contact.location': 'Lokalizacja',
    'contact.form.title': 'Wyślij Wiadomość',
    'contact.form.name': 'Imię',
    'contact.form.email': 'Email',
    'contact.form.message': 'Wiadomość',
    'contact.form.placeholder.name': 'Twoje imię',
    'contact.form.placeholder.email': 'twoj.email@przyklad.pl',
    'contact.form.placeholder.message': 'Opowiedz mi o swoim projekcie...',
    'contact.form.submit': 'Wyślij Wiadomość',
    'contact.form.sending': 'Wysyłanie...',
    'contact.form.success': 'Wiadomość wysłana pomyślnie! Odezwę się wkrótce.',
    'contact.form.error': 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na email.',
  }
}

const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('pl')) return 'pl'
  return 'en'
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language | null
    return savedLang || getBrowserLanguage()
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
