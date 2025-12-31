import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import Skeleton from './Skeleton'

interface Skill {
  name: string
  icon: string
  color: string
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const skillCategories = [
    {
      category: t('skills.frontend'),
      skills: [
        { name: 'HTML5', icon: 'html5', color: 'E34F26' },
        { name: 'CSS3', icon: 'css', color: '1572B6' },
        { name: 'SASS', icon: 'sass', color: 'CC6699' },
        { name: 'JavaScript', icon: 'javascript', color: 'F7DF1E' },
        { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
        { name: 'React', icon: 'react', color: '61DAFB' },
        { name: 'React Native', icon: 'react', color: '61DAFB' },
        { name: 'Redux', icon: 'redux', color: '764ABC' },
        { name: 'Angular', icon: 'angular', color: 'DD0031' },
        { name: 'Tailwind CSS', icon: 'tailwindcss', color: '06B6D4' },
        { name: 'Bootstrap', icon: 'bootstrap', color: '7952B3' }
      ] as Skill[]
    },
    {
      category: t('skills.backend'),
      skills: [
        { name: 'Node.js', icon: 'nodedotjs', color: '339933' },
        { name: 'Express.js', icon: 'express', color: 'FFFFFF' },
        { name: 'Java', icon: 'openjdk', color: 'fff' },
        { name: 'Spring', icon: 'spring', color: '6DB33F' },
        { name: 'Hibernate', icon: 'hibernate', color: '59666C' },
        { name: 'Python', icon: 'python', color: '3776AB' },
        { name: 'PHP', icon: 'php', color: '777BB4' },
        { name: '.NET', icon: 'dotnet', color: 'c78aff' },
        { name: 'REST APIs', icon: 'fastapi', color: '009688' },
        { name: 'Microservices', icon: 'kubernetes', color: '326CE5' }
      ] as Skill[]
    },
    {
      category: t('skills.databases'),
      skills: [
        { name: 'MySQL', icon: 'mysql', color: '4479A1' },
        { name: 'PostgreSQL', icon: 'postgresql', color: '4169E1' },
        { name: 'MariaDB', icon: 'mariadb', color: '003545' },
        { name: 'MS SQL Server', icon: 'mysql', color: '0078D4' },
        { name: 'SQLite', icon: 'sqlite', color: '003B57' },
        { name: 'Redis', icon: 'redis', color: 'DC382D' }
      ] as Skill[]
    },
    {
      category: t('skills.tools'),
      skills: [
        { name: 'Git', icon: 'git', color: 'F05032' },
        { name: 'GitHub', icon: 'github', color: 'FFFFFF' },
        { name: 'GitLab', icon: 'gitlab', color: 'FC6D26' },
        { name: 'Docker', icon: 'docker', color: '2496ED' },
        { name: 'RabbitMQ', icon: 'rabbitmq', color: 'FF6600' },
        { name: 'Postman', icon: 'postman', color: 'FF6C37' },
        { name: 'Swagger', icon: 'swagger', color: '85EA2D' },
        { name: 'Maven', icon: 'apachemaven', color: 'C71A36' },
        { name: 'ESLint', icon: 'eslint', color: '4B32C3' },
        { name: 'Linux', icon: 'linux', color: 'FCC624' },
        { name: 'Proxmox', icon: 'proxmox', color: 'E57000' },
        { name: 'Figma', icon: 'figma', color: 'F24E1E' },
        { name: 'Bash', icon: 'gnubash', color: '4EAA25' },
        { name: 'WordPress', icon: 'wordpress', color: '21759B' },
        { name: 'Twilio', icon: 'https://www.vectorlogo.zone/logos/twilio/twilio-icon.svg', color: '' }
      ] as Skill[]
    }
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20 },
    visible: {
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center bg-transparent py-20 relative" aria-label="Technical skills section">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ y: 50 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-white/70 text-center mb-12 text-lg">
            {t('skills.subtitle')}
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            role="list"
            aria-label="Skill categories"
          >
            {isLoading ? (
              <>
                <Skeleton height={300} />
                <Skeleton height={300} />
                <Skeleton height={300} />
                <Skeleton height={300} />
              </>
            ) : (
              skillCategories.map((category) => (
                <motion.div
                  key={category.category}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-7 border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                  role="listitem"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-3" role="list" aria-label={`${category.category} skills`}>
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="flex items-center gap-2.5 px-4 py-2.5 bg-white/10 rounded-lg border border-white/10 hover:border-blue-500/50 transition-all duration-200"
                        role="listitem"
                      >
                        <img
                          alt={skill.name}
                          className="w-6 h-6"
                          src={skill.icon.startsWith('http') ? skill.icon : `https://cdn.simpleicons.org/${skill.icon}/${skill.color}`}
                          loading="lazy"
                        />
                        <span className="text-white text-base font-medium">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
