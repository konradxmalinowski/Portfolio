import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import pfp from '../assets/pfp.jpg';

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { t } = useLanguage()
  const [pfpLoaded, setPfpLoaded] = useState(false)

  const stats = [
    { label: t('stats.experience'), value: '2+', icon: '📅', iconLabel: 'Calendar' },
    { label: t('stats.technologies'), value: '20+', icon: '💻', iconLabel: 'Computer' },
    { label: t('stats.integrations'), value: '5+', icon: '⚡', iconLabel: 'Lightning bolt' }
  ]

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-transparent py-20 relative" aria-label="About me section">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ y: 50 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            {t('about.title')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" role="list" aria-label="Professional statistics">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20 }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                role="listitem"
              >
                <div className="text-4xl mb-3" role="img" aria-label={stat.iconLabel}>{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-2xl overflow-hidden backdrop-blur-lg border border-blue-500/30 p-4 ">
                  <div className='w-full h-full bg-center bg-cover rounded-xl object-cover object-center' style={{ backgroundImage: `url(${pfp})` }}>
                    <img
                      src={pfp}
                      alt="Konrad Malinowski - Professional portrait"
                      className={`w-full h-full object-cover rounded-xl object-center transition-[filter,opacity] duration-500 ${pfpLoaded ? 'blur-0 opacity-100' : 'blur-md opacity-70'}`}
                      loading='lazy'
                      onLoad={() => setPfpLoaded(true)}
                    />
                  </div>
                </div>
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                  className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
                  aria-hidden="true"
                />
                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                  className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"
                  aria-hidden="true"
                />
              </motion.div>

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

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-xl" role="img" aria-label="Target">🎯</div>
                    <span className="text-white/80 text-sm">{t('features.passion')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-xl" role="img" aria-label="Brain">🧠</div>
                    <span className="text-white/80 text-sm">{t('features.selftaught')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-xl" role="img" aria-label="Robot">🤖</div>
                    <span className="text-white/80 text-sm">{t('features.ai')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-xl" role="img" aria-label="Lightning">⚡</div>
                    <span className="text-white/80 text-sm">{t('features.fastlearner')}</span>
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
