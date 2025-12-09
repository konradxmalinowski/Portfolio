import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

type Project = {
  title: string
  period: string
  association?: string
  description: string
  technologies: string[]
  image?: string
  link?: string
  fullWidth?: boolean
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
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'EmailJS', 'Responsive Design', 'Git'],
    },
    {
      title: 'StudyLodz',
      period: t('projects.studylodz.period'),
      description: t('projects.studylodz.desc'),
      technologies: ['React Native', 'TypeScript', 'JavaScript', 'Expo', 'Mobile Development', 'ESLint', 'Git', 'REST APIs'],
    },
    {
      title: 'Hangman',
      period: t('projects.hangman.period'),
      description: t('projects.hangman.desc'),
      technologies: ['Spring Boot', 'Angular', 'MySQL', 'TypeScript', 'Java', 'JavaScript', 'REST APIs', 'Docker', 'Git'],
    },
    {
      title: t('projects.zse.title'),
      period: t('projects.zse.period'),
      description: t('projects.zse.desc'),
      technologies: ['WordPress', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'SEO', 'Performance Optimization'],
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center bg-transparent py-20 relative" aria-label="Projects section">
      <div className="container mx-auto px-6">
        <div ref={ref}>
          <motion.div
            initial={{ y: 50 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-white/70 text-center mb-12 text-lg">
              {t('projects.subtitle')}
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              role="list"
              aria-label="Projects list"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-7 border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                  role="listitem"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{project.period}</span>
                      </div>
                    </div>

                    <p
                      className="text-white/80 leading-relaxed mb-4 flex-grow text-base"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />

                    <div className="flex flex-wrap gap-2.5" role="list" aria-label="Technologies used">
                      {project.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1.5 bg-blue-600/30 text-blue-200 rounded-lg text-sm font-medium border border-blue-500/30"
                          role="listitem"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Projects
