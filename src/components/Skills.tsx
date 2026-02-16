import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

type Skill = {
  name: string
  icon: string
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()

  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const iconColor = isDark ? '94A3B8' : '6B7280'

  const skillCategories = [
    {
      label: t('skills.frontend'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      skills: [
        { name: 'HTML5', icon: 'html5' },
        { name: 'CSS3', icon: 'css' },
        { name: 'SASS', icon: 'sass' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'React', icon: 'react' },
        { name: 'React Native', icon: 'react' },
        { name: 'Redux', icon: 'redux' },
        { name: 'Angular', icon: 'angular' },
        { name: 'Tailwind CSS', icon: 'tailwindcss' },
        { name: 'Bootstrap', icon: 'bootstrap' },
      ] as Skill[],
    },
    {
      label: t('skills.backend'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      skills: [
        { name: 'Node.js', icon: 'nodedotjs' },
        { name: 'Express.js', icon: 'express' },
        { name: 'Java', icon: 'openjdk' },
        { name: 'Spring Boot', icon: 'springboot' },
        { name: 'Hibernate', icon: 'hibernate' },
        { name: 'Python', icon: 'python' },
        { name: 'PHP', icon: 'php' },
        { name: '.NET', icon: 'dotnet' },
        { name: 'REST APIs', icon: 'fastapi' },
        { name: 'Microservices', icon: 'kubernetes' },
      ] as Skill[],
    },
    {
      label: t('skills.databases'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      skills: [
        { name: 'MySQL', icon: 'mysql' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MariaDB', icon: 'mariadb' },
        { name: 'MS SQL Server', icon: 'microsoftsqlserver' },
        { name: 'SQLite', icon: 'sqlite' },
        { name: 'Redis', icon: 'redis' },
      ] as Skill[],
    },
    {
      label: t('skills.tools'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      skills: [
        { name: 'Git', icon: 'git' },
        { name: 'GitHub', icon: 'github' },
        { name: 'GitLab', icon: 'gitlab' },
        { name: 'Docker', icon: 'docker' },
        { name: 'RabbitMQ', icon: 'rabbitmq' },
        { name: 'Maven', icon: 'apachemaven' },
        { name: 'ESLint', icon: 'eslint' },
        { name: 'Linux', icon: 'linux' },
        { name: 'Bash', icon: 'gnubash' },
        { name: 'Postman', icon: 'postman' },
        { name: 'Swagger', icon: 'swagger' },
        { name: 'Figma', icon: 'figma' },
        { name: 'WordPress', icon: 'wordpress' },
        { name: 'Proxmox', icon: 'proxmox' },
      ] as Skill[],
    },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section className="py-20 bg-surface" aria-label="Tech stack">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-primary mb-12"
        >
          {t('skills.title')}
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid md:grid-cols-2 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.label}
              variants={fadeInUp}
              className="border border-border rounded-xl p-6 bg-surface hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-accent">{category.icon}</span>
                <h3 className="text-sm font-semibold text-primary">
                  {category.label}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-2.5 text-sm text-secondary">
                    <img
                      src={`https://cdn.simpleicons.org/${skill.icon}/${iconColor}`}
                      alt=""
                      className="w-5 h-5 flex-shrink-0"
                      loading="lazy"
                    />
                    {skill.name}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
