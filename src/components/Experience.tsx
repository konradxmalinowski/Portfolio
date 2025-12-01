import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { t } = useLanguage()

  const experiences = [
    {
      company: 'Aibron',
      role: 'Full-stack Developer (Angular/Java)',
      type: 'Internship',
      period: 'August 2025 – Present',
      duration: '4 months',
      location: 'Poland · Hybrid',
      description: 'I have been developing Educomfee - enterprise-grade application optimizes complex business processes using a modular, microservices-based architecture. It\'s built with a scalable Spring Boot backend and a modern Angular frontend, ensuring a robust and responsive user experience.',
      skills: ['JavaScript', 'Microservices', 'Angular', 'Java', 'Spring Boot', 'Enterprise Applications'],
      current: true
    },
    {
      company: 'Technikum nr 2 w Zespole Szkół Elektronicznych',
      role: 'WordPress Developer',
      type: 'Freelance/Contract',
      period: 'May 2023 – Present',
      duration: '2 years 7 months',
      location: 'Poland · Remote',
      description: 'I redesigned and developed the www.zse-zdwola.pl school website in WordPress, creating a modern, responsive, and user-friendly platform for students, parents, and staff. I optimized performance, improved content management, delivered a clean layout that the school team can easily maintain, and I continue to further develop and enhance the platform.',
      skills: ['Search Engine Optimization (SEO)', 'MySQL', 'WordPress', 'Web Design', 'Performance Optimization', 'Content Management'],
      current: true
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center bg-transparent py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            {t('experience.title')}
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                {/* Timeline dot */}
                <div className="absolute -left-3 top-8 w-6 h-6 bg-blue-600 rounded-full border-4 border-slate-900 hidden md:block" />

                {/* Current badge */}
                {exp.current && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                  >
                    {t('experience.current')}
                  </motion.div>
                )}

                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                      <span>{exp.company}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-white/60 text-sm">{exp.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-white/60 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {exp.period}
                  </span>
                  <span className="text-white/40">·</span>
                  <span>{exp.duration}</span>
                  <span className="text-white/40">·</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {exp.location}
                  </span>
                </div>

                <p className="text-white/80 leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-lg text-xs font-medium border border-blue-500/30"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline line */}
          <div className="hidden md:block absolute left-6 top-32 bottom-32 w-0.5 bg-gradient-to-b from-blue-500 via-blue-600 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
