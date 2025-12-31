import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import Skeleton from './Skeleton'

type ExperienceItem = {
  company: string
  role: string
  type: string
  start: string | null
  end: string | null
  location: string
  description: string
  skills: string[]
  current?: boolean
}

const Experience = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  const experiences: ExperienceItem[] = [
    {
      company: 'Aibron',
      role: t('experience.aibron.role'),
      type: t('experience.internship'),
      start: '2025-08-01',
      end: null,
      location: t('experience.aibron.location'),
      description: t('experience.aibron.desc'),
      skills: ['JavaScript', 'Microservices', 'Angular', 'Java', 'Spring Boot', 'Enterprise Applications'],
      current: true,
    },
    {
      company: t('experience.zse.company'),
      role: t('experience.zse.role'),
      type: t('experience.freelance'),
      start: '2023-05-01',
      end: null,
      location: t('experience.zse.location'),
      description: t('experience.zse.desc'),
      skills: ['Search Engine Optimization (SEO)', 'MySQL', 'WordPress', 'Web Design', 'Performance Optimization', 'Content Management'],
      current: true,
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -50 },
    visible: {
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  const parseDate = (isoOrNull: string | null) => {
    if (!isoOrNull) return null
    const d = new Date(isoOrNull)
    return isNaN(d.getTime()) ? null : d
  }

  const formatPeriod = (start: Date | null, end: Date | null) => {
    if (!start) return ''
    const fmt = new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' })
    const startStr = fmt.format(start)
    const endStr = end ? fmt.format(end) : t('experience.present')
    return `${startStr} – ${endStr}`
  }

  const computeDuration = (start: Date | null, end: Date | null) => {
    if (!start) return ''
    const to = end || currentTime
    let months = (to.getFullYear() - start.getFullYear()) * 12 + (to.getMonth() - start.getMonth()) + 1
    if (months < 1) return t('experience.lessThanMonth')
    const years = Math.floor(months / 12)
    const remMonths = months % 12
    const parts: string[] = []
    if (years > 0) parts.push(`${years} ${years === 1 ? t('experience.year') : t('experience.years')}`)
    if (remMonths > 0) parts.push(`${remMonths} ${remMonths === 1 ? t('experience.month') : t('experience.months')}`)
    return parts.join(' ')
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center bg-transparent py-20 relative overflow-x-hidden" aria-label="Work experience section">
      <div className="container mx-auto px-6">
        <div ref={ref}>
          <motion.div
            initial={{ y: 50 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">{t('experience.title')}</h2>

            <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="relative">
              <div
                className="absolute left-[14px] md:left-[22px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-600 to-transparent"
              />

              <div className="space-y-8 md:space-y-12" role="list" aria-label="Work experience timeline">
                {isLoading ? (
                  <>
                    <Skeleton height={250} />
                    <Skeleton height={250} />
                  </>
                ) : (
                  experiences.map((exp, index) => {
                    const start = parseDate(exp.start)
                    const end = parseDate(exp.end)
                    const periodText = formatPeriod(start, end)
                    const durationText = computeDuration(start, end)

                    return (
                      <div key={index} className="relative flex gap-4 md:gap-8" role="listitem">
                        <div className="flex items-start justify-center pt-2 shrink-0 w-7 md:w-11">
                          <span className="block w-3 h-3 md:w-4 md:h-4 bg-white rounded-full border-2 md:border-4 border-blue-500 shadow-lg shadow-blue-500/50 relative z-10" />
                        </div>

                        <motion.div
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, x: 10 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                        >
                          {exp.current && (
                            <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 0.5 + index * 0.2 }} className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full" role="status" aria-label="Current position">
                              {t('experience.current')}
                            </motion.div>
                          )}

                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                              <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                                <span>{exp.company}</span>
                                <span className="text-white/40">·</span>
                                <span className="text-white/60 text-sm">{exp.type}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 text-white/60 text-sm mb-4" aria-label="Employment details">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {periodText}
                            </span>
                            <span className="text-white/40">·</span>
                            <span>{durationText}</span>
                            <span className="text-white/40">·</span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {exp.location}
                            </span>
                          </div>

                          <p className="text-white/80 leading-relaxed mb-4">{exp.description}</p>

                          <div className="flex flex-wrap gap-2" role="list" aria-label="Skills used in this role">
                            {exp.skills.map((skill, idx) => (
                              <motion.span key={idx} whileHover={{ scale: 1.1 }} className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-lg text-xs font-medium border border-blue-500/30" role="listitem">
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    )
                  })
                )}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Experience
