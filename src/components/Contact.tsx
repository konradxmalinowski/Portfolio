import { motion, useInView } from 'framer-motion'
import { useRef, useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { useLanguage } from '../contexts/LanguageContext'

const RATE_LIMIT_KEY = 'email_sent_timestamps'
const MAX_EMAILS_PER_HOUR = 5
const ONE_HOUR_MS = 60 * 60 * 1000

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

const setCookie = (name: string, value: string, hours: number) => {
  const date = new Date()
  date.setTime(date.getTime() + hours * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Strict`
}

const Contact = () => {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'ratelimit'>('idle')
  const { t } = useLanguage()

  const checkRateLimit = (): boolean => {
    const now = Date.now()
    const storedTimestamps = getCookie(RATE_LIMIT_KEY)
    const timestamps: number[] = storedTimestamps ? JSON.parse(decodeURIComponent(storedTimestamps)) : []
    const recentTimestamps = timestamps.filter(timestamp => now - timestamp < ONE_HOUR_MS)
    if (recentTimestamps.length > 0) {
      setCookie(RATE_LIMIT_KEY, encodeURIComponent(JSON.stringify(recentTimestamps)), 1)
    }
    return recentTimestamps.length < MAX_EMAILS_PER_HOUR
  }

  const recordEmailSent = () => {
    const now = Date.now()
    const storedTimestamps = getCookie(RATE_LIMIT_KEY)
    const timestamps: number[] = storedTimestamps ? JSON.parse(decodeURIComponent(storedTimestamps)) : []
    timestamps.push(now)
    setCookie(RATE_LIMIT_KEY, encodeURIComponent(JSON.stringify(timestamps)), 1)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (isSubmitting) return
    if (!checkRateLimit()) {
      setSubmitStatus('ratelimit')
      return
    }
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      recordEmailSent()
      setSubmitStatus('success')
      formRef.current?.reset()
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section id="contact" className="py-20 bg-surface" aria-label="Contact">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-2">{t('contact.title')}</h2>
          <p className="text-secondary">{t('contact.subtitle')}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid lg:grid-cols-2 gap-10"
        >
          {/* Contact info */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="space-y-4">
              <a
                href="mailto:malinowski.konrad45@gmail.com"
                className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-accent/30 transition-colors duration-150 group"
              >
                <div className="w-10 h-10 flex items-center justify-center text-accent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted">{t('contact.email')}</p>
                  <p className="text-primary font-medium text-sm">malinowski.konrad45@gmail.com</p>
                </div>
              </a>

              <a
                href="https://github.com/konradxmalinowski"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-accent/30 transition-colors duration-150 group"
              >
                <div className="w-10 h-10 flex items-center justify-center text-accent">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted">{t('contact.github')}</p>
                  <p className="text-primary font-medium text-sm">@konradxmalinowski</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/konradxmalinowski"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-accent/30 transition-colors duration-150 group"
              >
                <div className="w-10 h-10 flex items-center justify-center text-accent">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted">{t('contact.linkedin')}</p>
                  <p className="text-primary font-medium text-sm">konradxmalinowski</p>
                </div>
              </a>
            </div>

            <p className="text-sm text-muted">{t('contact.availability')}</p>
          </motion.div>

          {/* Contact form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            variants={fadeInUp}
            className="space-y-5"
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary mb-1.5">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-background text-primary border border-border focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all text-sm"
                placeholder={t('contact.form.placeholder.name')}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-background text-primary border border-border focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all text-sm"
                placeholder={t('contact.form.placeholder.email')}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary mb-1.5">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-2.5 rounded-lg bg-background text-primary border border-border focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all resize-none text-sm"
                placeholder={t('contact.form.placeholder.message')}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              onClick={(e) => {
                if (isSubmitting) {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t('contact.form.sending')}
                </span>
              ) : (
                t('contact.form.submit')
              )}
            </button>

            <div className="min-h-[48px]" role="status" aria-live="polite" aria-atomic="true">
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-3"
                >
                  {t('contact.form.success')}
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
                >
                  {t('contact.form.error')}
                </motion.p>
              )}
              {submitStatus === 'ratelimit' && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3"
                >
                  {t('contact.form.ratelimit')}
                </motion.p>
              )}
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
