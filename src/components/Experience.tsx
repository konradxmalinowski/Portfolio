import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

type ExperienceItem = {
  company: string
  role: string
  type: string
  start: string | null
  end: string | null
  location: string
  bullets: string[]
  skills: string[]
  current?: boolean
}

const Experience = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())

  const experiences: ExperienceItem[] = [
    {
      company: 'Aibron',
      role: t('experience.aibron.junior.role'),
      type: t('experience.contract'),
      start: '2026-01-01',
      end: null,
      location: t('experience.aibron.junior.location'),
      bullets: [
        t('experience.aibron.junior.desc.1'),
        t('experience.aibron.junior.desc.2'),
        t('experience.aibron.junior.desc.3'),
        t('experience.aibron.junior.desc.4'),
      ],
      skills: ['JavaScript', 'Angular', 'Java', 'Spring Boot', 'RabbitMQ', 'REST APIs', 'Microservices', 'MySQL', 'Docker', 'Git'],
      current: true,
    },
    {
      company: 'Aibron',
      role: t('experience.aibron.intern.role'),
      type: t('experience.internship'),
      start: '2025-08-01',
      end: '2026-01-01',
      location: t('experience.aibron.intern.location'),
      bullets: [
        t('experience.aibron.intern.desc.1'),
        t('experience.aibron.intern.desc.2'),
        t('experience.aibron.intern.desc.3'),
        t('experience.aibron.intern.desc.4'),
        t('experience.aibron.intern.desc.5'),
      ],
      skills: ['JavaScript', 'Java', 'Angular', 'Spring Boot', 'Microservices', 'Git', 'REST APIs'],
    },
    {
      company: t('experience.zse.company'),
      role: t('experience.zse.role'),
      type: t('experience.freelance'),
      start: '2023-05-01',
      end: null,
      location: t('experience.zse.location'),
      bullets: [
        t('experience.zse.desc.1'),
        t('experience.zse.desc.2'),
        t('experience.zse.desc.3'),
        t('experience.zse.desc.4'),
      ],
      skills: ['WordPress', 'MySQL', 'PHP', 'SEO', 'Web Design'],
      current: true,
    },
  ]

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
    const interval = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section id="experience" className="py-20" aria-label="Work experience">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-primary mb-12"
        >
          {t('experience.title')}
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

          <div className="space-y-10">
            {experiences.map((exp, index) => {
              const start = parseDate(exp.start)
              const end = parseDate(exp.end)
              const periodText = formatPeriod(start, end)
              const durationText = computeDuration(start, end)

              return (
                <motion.div key={index} variants={fadeInUp} className="relative flex gap-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 mt-2 relative z-10">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 ${exp.current ? 'bg-accent border-accent' : 'bg-border border-border'}`} />
                  </div>

                  {/* Content card */}
                  <div className="flex-1 pb-2">
                    <div className="p-6 border border-border rounded-xl bg-surface">
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-primary">{exp.role}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-accent font-medium text-sm">{exp.company}</span>
                          <span className="text-border">·</span>
                          <span className="text-muted text-sm">{exp.type}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-muted text-sm mb-4">
                        <span>{periodText}</span>
                        <span className="text-border">·</span>
                        <span>{durationText}</span>
                        <span className="text-border">·</span>
                        <span>{exp.location}</span>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="text-secondary text-sm leading-relaxed flex gap-2">
                            <span className="text-border mt-1.5 flex-shrink-0">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="2" /></svg>
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 text-xs text-muted bg-background border border-border rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
