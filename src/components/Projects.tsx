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
  githubUrl?: string
  liveUrl?: string
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
      githubUrl: 'https://github.com/konradxmalinowski/portfolio',
      liveUrl: 'https://konradxmalinowski.github.io/Portfolio',
    },
    {
      title: 'StudyLodz',
      period: t('projects.studylodz.period'),
      description: t('projects.studylodz.desc'),
      technologies: ['React Native', 'TypeScript', 'JavaScript', 'Expo', 'Mobile Development', 'ESLint', 'Git', 'REST APIs'],
      githubUrl: 'https://github.com/konradxmalinowski/StudyLodz',
    },
    {
      title: 'Hangman',
      period: t('projects.hangman.period'),
      description: t('projects.hangman.desc'),
      technologies: ['Spring Boot', 'Angular', 'MySQL', 'TypeScript', 'Java', 'JavaScript', 'REST APIs', 'Docker', 'Git'],
      githubUrl: 'https://github.com/konradxmalinowski/Hangman',
    },
    {
      title: t('projects.zse.title'),
      period: t('projects.zse.period'),
      description: t('projects.zse.desc'),
      technologies: ['WordPress', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'SEO', 'Performance Optimization'],
      liveUrl: 'https://www.zse-zdwola.pl/',
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

                    <div className="flex-grow mb-4">
                      <p
                        className="text-white/80 leading-relaxed mb-4 text-base"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                      />

                      {(project.githubUrl || project.liveUrl) && (
                        <div className="flex gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-blue-500/50 rounded-lg transition-all duration-300 text-white/90 hover:text-white text-sm font-medium"
                              aria-label={`View ${project.title} on GitHub`}
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                              </svg>
                              GitHub
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 hover:border-blue-500/70 rounded-lg transition-all duration-300 text-blue-200 hover:text-white text-sm font-medium"
                              aria-label={`View live demo of ${project.title}`}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Live Demo
                            </a>
                          )}
                        </div>
                      )}
                    </div>

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
