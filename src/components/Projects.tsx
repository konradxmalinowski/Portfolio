import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import Skeleton from './Skeleton'

type Technology = {
  name: string
  icon?: string
  color?: string
}

type Project = {
  title: string
  period: string
  association?: string
  description: string
  technologies: Technology[]
  image?: string
  gradient: string
  link?: string
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  status?: 'live' | 'development' | 'archived'
}

const Projects = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const techMap: Record<string, { icon: string; color: string }> = {
    'React': { icon: 'react', color: '61DAFB' },
    'TypeScript': { icon: 'typescript', color: '3178C6' },
    'Tailwind CSS': { icon: 'tailwindcss', color: '06B6D4' },
    'Framer Motion': { icon: 'framer', color: '0055FF' },
    'Vite': { icon: 'vite', color: '646CFF' },
    'EmailJS': { icon: 'gmail', color: 'EA4335' },
    'Git': { icon: 'git', color: 'F05032' },
    'React Native': { icon: 'react', color: '61DAFB' },
    'JavaScript': { icon: 'javascript', color: 'F7DF1E' },
    'Expo': { icon: 'expo', color: '000020' },
    'ESLint': { icon: 'eslint', color: '4B32C3' },
    'REST APIs': { icon: 'fastapi', color: '009688' },
    'Spring Boot': { icon: 'springboot', color: '6DB33F' },
    'Angular': { icon: 'angular', color: 'DD0031' },
    'MySQL': { icon: 'mysql', color: '4479A1' },
    'Java': { icon: 'openjdk', color: 'FFFFFF' },
    'Docker': { icon: 'docker', color: '2496ED' },
    'WordPress': { icon: 'wordpress', color: '21759B' },
    'PHP': { icon: 'php', color: '777BB4' },
    'HTML': { icon: 'html5', color: 'E34F26' },
    'CSS': { icon: 'css3', color: '1572B6' },
    'SEO': { icon: 'googlesearchconsole', color: '458CF5' },
  }

  const mapTechnologies = (techNames: string[]): Technology[] => {
    return techNames.map(name => ({
      name,
      ...techMap[name]
    }))
  }

  const projects: Project[] = [
    {
      title: 'Portfolio',
      period: t('projects.portfolio.period'),
      description: t('projects.portfolio.desc'),
      technologies: mapTechnologies(['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'EmailJS', 'Git']),
      gradient: 'from-blue-600 via-cyan-500 to-teal-500',
      githubUrl: 'https://github.com/konradxmalinowski/portfolio',
      liveUrl: 'https://konradxmalinowski.github.io/Portfolio',
      status: 'live',
    },
    {
      title: 'StudyLodz',
      period: t('projects.studylodz.period'),
      description: t('projects.studylodz.desc'),
      technologies: mapTechnologies(['React Native', 'TypeScript', 'JavaScript', 'Expo', 'ESLint', 'Git', 'REST APIs']),
      gradient: 'from-blue-600 via-cyan-500 to-teal-500',
      githubUrl: 'https://github.com/konradxmalinowski/StudyLodz',
      status: 'development',
    },
    {
      title: 'Hangman',
      period: t('projects.hangman.period'),
      description: t('projects.hangman.desc'),
      technologies: mapTechnologies(['Spring Boot', 'Angular', 'MySQL', 'TypeScript', 'Java', 'JavaScript', 'REST APIs', 'Docker', 'Git']),
      gradient: 'from-blue-600 via-cyan-500 to-teal-500',
      githubUrl: 'https://github.com/konradxmalinowski/Hangman',
    },
    {
      title: t('projects.zse.title'),
      period: t('projects.zse.period'),
      description: t('projects.zse.desc'),
      technologies: mapTechnologies(['WordPress', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'SEO']),
      gradient: 'from-blue-600 via-cyan-500 to-teal-500',
      liveUrl: 'https://www.zse-zdwola.pl/',
      status: 'live',
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: {},
    visible: {},
  }

  const StatusBadge = ({ status }: { status?: 'live' | 'development' | 'archived' }) => {
    if (!status) return null

    const statusConfig = {
      live: { label: 'Live', color: 'bg-green-500/20 text-green-300 border-green-500/50', icon: '🟢' },
      development: { label: 'In Development', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50', icon: '🚧' },
      archived: { label: 'Archived', color: 'bg-gray-500/20 text-gray-300 border-gray-500/50', icon: '📦' },
    }

    const config = statusConfig[status]
    return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
        <span>{config.icon}</span>
        {config.label}
      </div>
    )
  }

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    return (
      <motion.div
        variants={itemVariants}
        className="relative group"
        role="listitem"
      >
        {/* Card Container */}
        <div className="relative h-full bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500">
          {/* Gradient Background */}
          <div className="relative overflow-hidden">
            <div className={`h-32 bg-gradient-to-br ${project.gradient} relative`}>
              {/* Floating badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-white/90 text-xs font-bold border border-white/20">
                  #{index + 1}
                </div>
                <StatusBadge status={project.status} />
              </div>

              {/* Quick action buttons - show on hover */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/95 hover:bg-white rounded-xl transition-all duration-300 text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                    aria-label={`View ${project.title} on GitHub`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                    aria-label={`View live demo of ${project.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Header */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{project.period}</span>
              </div>
            </div>

            {/* Description */}
            <p
              className="text-white/80 leading-relaxed text-base line-clamp-3"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />

            {/* Technologies */}
            <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
              {project.technologies.slice(0, 6).map((tech, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 hover:border-blue-500/50 transition-all duration-200 group/tech"
                  role="listitem"
                >
                  {tech.icon && (
                    <img
                      alt=""
                      className="w-4 h-4 group-hover/tech:scale-110 transition-transform duration-200"
                      src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color}`}
                      loading="lazy"
                    />
                  )}
                  <span className="text-white/90 text-xs font-medium">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
              {project.technologies.length > 6 && (
                <div className="flex items-center px-3 py-1.5 text-white/60 text-xs font-medium">
                  +{project.technologies.length - 6} more
                </div>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    )
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
            <p className="text-white/70 text-center mb-12 text-lg max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              role="list"
              aria-label="Projects list"
            >
              {isLoading ? (
                <>
                  <Skeleton height={350} />
                  <Skeleton height={350} />
                  <Skeleton height={350} />
                  <Skeleton height={350} />
                </>
              ) : (
                projects.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Projects
