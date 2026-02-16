import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const Hero = () => {
  const { t } = useLanguage()

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay },
    }),
  }

  return (
    <section className="py-24 md:py-32" aria-label="Introduction">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h1
          custom={0}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-6xl font-bold text-primary tracking-tight"
        >
          {t('hero.name')}
        </motion.h1>

        <motion.p
          custom={0.1}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-4 text-xl text-secondary"
        >
          {t('hero.title')}
        </motion.p>

        <motion.p
          custom={0.2}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-6 text-lg text-muted max-w-xl mx-auto leading-relaxed"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          custom={0.3}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#work"
            className="px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors duration-150"
          >
            {t('hero.cta.work')}
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-150"
          >
            {t('hero.cta.contact')} &rarr;
          </a>
        </motion.div>

        <motion.div
          custom={0.4}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-8 flex justify-center gap-5"
        >
          <a
            href="https://github.com/konradxmalinowski"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary transition-colors duration-150"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/konradxmalinowski"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary transition-colors duration-150"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:malinowski.konrad45@gmail.com"
            className="text-muted hover:text-primary transition-colors duration-150"
            aria-label="Email"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
