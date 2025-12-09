import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

type Award = {
  title: string
  issuer: string
  date: string
  association?: string
  description: string
}

const Awards = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()

  const awards: Award[] = [
    {
      title: t('awards.appetyt.title'),
      issuer: t('awards.appetyt.issuer'),
      date: t('awards.appetyt.date'),
      description: t('awards.appetyt.desc'),
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
    <section id="awards" className="min-h-screen flex items-center justify-center bg-transparent py-20 relative" aria-label="Awards and honors section">
      <div className="container mx-auto px-6">
        <div ref={ref}>
          <motion.div
            initial={{ y: 50 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              {t('awards.title')}
            </h2>
            <p className="text-white/70 text-center mb-12 text-lg">
              {t('awards.subtitle')}
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-6"
              role="list"
              aria-label="Awards list"
            >
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-7 border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                  role="listitem"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-yellow-500/30">
                      <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-white mb-2">{award.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-white/60 text-sm mb-3">
                        <span className="font-medium text-blue-400">{award.issuer}</span>
                        <span>·</span>
                        <span>{award.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed text-base">
                    {award.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Awards
