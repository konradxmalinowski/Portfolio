import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import pfp from '../assets/pfp.jpg'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { t } = useLanguage()

  const stats = [
    { label: 'Years of Experience', value: '2+', icon: '📅' },
    { label: 'Technologies', value: '20+', icon: '💻' },
    { label: 'API Integrations', value: '5+', icon: '⚡' }
  ]

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            {t('about.title')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Stats Cards */}
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left side - Image/Visual */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-2xl overflow-hidden backdrop-blur-lg border border-blue-500/30 p-4">
                  <img
                    src={pfp}
                    alt="Konrad Malinowski"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
                />
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"
                />
              </motion.div>

              {/* Right side - Text */}
              <div className="space-y-6 text-left">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  {t('about.p1')} <strong className="text-blue-400 font-bold">{t('about.p1.bold')}</strong> {t('about.p1.rest')}
                </p>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  {t('about.p2')} <strong className="text-blue-400 font-bold">{t('about.p2.bold')}</strong> {t('about.p2.rest')}
                </p>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  {t('about.p3')} <strong className="text-blue-400 font-bold">{t('about.p3.bold')}</strong> {t('about.p3.rest')}
                </p>

                {/* Key highlights */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-xl">🎯</div>
                    <span className="text-white/80 text-sm">Passion-driven</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-xl">🧠</div>
                    <span className="text-white/80 text-sm">Self-taught</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-xl">🤖</div>
                    <span className="text-white/80 text-sm">AI-enhanced</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-xl">⚡</div>
                    <span className="text-white/80 text-sm">Fast learner</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
