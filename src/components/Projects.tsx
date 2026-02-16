import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

type Project = {
  title: string
  period: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  status?: 'live' | 'development' | 'archived'
}

const Projects = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()

  const projects: Project[] = [
    {
      title: 'Portfolio',
      period: t('projects.portfolio.period'),
      description: t('projects.portfolio.desc'),
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      githubUrl: 'https://github.com/konradxmalinowski/portfolio',
      liveUrl: 'https://konradxmalinowski.github.io/Portfolio',
      status: 'live',
    },
    {
      title: 'StudyLodz',
      period: t('projects.studylodz.period'),
      description: t('projects.studylodz.desc'),
      technologies: ['React Native', 'TypeScript', 'Expo', 'REST APIs'],
      githubUrl: 'https://github.com/konradxmalinowski/StudyLodz',
      status: 'development',
    },
    {
      title: 'Hangman',
      period: t('projects.hangman.period'),
      description: t('projects.hangman.desc'),
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'Java', 'Docker'],
      githubUrl: 'https://github.com/konradxmalinowski/Hangman',
    },
    {
      title: t('projects.zse.title'),
      period: t('projects.zse.period'),
      description: t('projects.zse.desc'),
      technologies: ['WordPress', 'PHP', 'MySQL', 'SEO'],
      liveUrl: 'https://www.zse-zdwola.pl/',
      status: 'live',
    },
  ]

  const statusLabel = (status?: string) => {
    switch (status) {
      case 'live':
        return <span className="text-xs font-medium text-green-600">Live</span>
      case 'development':
        return <span className="text-xs font-medium text-amber-600">In Development</span>
      case 'archived':
        return <span className="text-xs font-medium text-muted">Archived</span>
      default:
        return null
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section id="work" className="py-20" aria-label="Projects">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-primary mb-12"
        >
          {t('projects.title')}
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <motion.article
              key={index}
              variants={fadeInUp}
              className="border border-border rounded-xl p-6 bg-surface hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg text-primary">{project.title}</h3>
                {statusLabel(project.status)}
              </div>

              <p className="text-sm text-muted mb-1">{project.period}</p>

              <p className="text-sm text-secondary leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs text-muted bg-background border border-border rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 text-sm">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover hover:underline transition-colors duration-150"
                  >
                    Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover hover:underline transition-colors duration-150"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
