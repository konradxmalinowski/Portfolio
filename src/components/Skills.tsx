import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { t } = useLanguage()

  const skillCategories = [
    {
      category: t('skills.frontend'),
      skills: ['HTML5', 'CSS3', 'SASS', 'JavaScript', 'TypeScript', 'React', 'React Native', 'Redux', 'Angular', 'Tailwind CSS', 'Bootstrap']
    },
    {
      category: t('skills.backend'),
      skills: ['Node.js', 'Express.js', 'Java', 'Spring', 'Python', 'PHP', '.NET']
    },
    {
      category: t('skills.databases'),
      skills: ['MySQL', 'PostgreSQL', 'MariaDB', 'MS SQL Server', 'SQLite']
    },
    {
      category: t('skills.tools'),
      skills: ['Git', 'GitHub', 'GitLab', 'Docker', 'RabbitMQ', 'Postman', 'Swagger', 'Figma', 'Bash', 'WordPress', 'Twilio']
    }
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
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            {t('skills.title')}
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            role="list"
            aria-label="Skill categories"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                whileHover={{ scale: 1.02, rotateY: 2, rotateX: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                style={{ transformStyle: "preserve-3d" }}
                role="listitem"
              >
                <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/20 pb-3">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2" role="list" aria-label={`${category.category} skills`}>
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="px-4 py-2 bg-blue-600/50 text-white rounded-lg text-sm font-medium hover:bg-blue-600/70 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 cursor-pointer"
                      role="listitem"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
