import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import pfp from '../assets/pfp.jpg'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()
  const [pfpLoaded, setPfpLoaded] = useState(false)

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section id="about" className="py-20 bg-surface" aria-label="About">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid md:grid-cols-5 gap-12 items-center"
        >
          <div className="md:col-span-3 space-y-6">
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-primary">
              {t('about.title')}
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-secondary leading-relaxed">
              {t('about.p1')}
            </motion.p>

            <motion.p variants={fadeInUp} className="text-secondary leading-relaxed">
              {t('about.p2')}
            </motion.p>

            <motion.p variants={fadeInUp} className="text-secondary leading-relaxed">
              {t('about.p3')}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-8 text-sm text-muted pt-2">
              <span>
                <strong className="text-primary text-lg font-semibold">2+</strong>{' '}
                {t('about.stats.experience')}
              </span>
              <span>
                <strong className="text-primary text-lg font-semibold">20+</strong>{' '}
                {t('about.stats.technologies')}
              </span>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="md:col-span-2">
            <div className="relative">
              <img
                src={pfp}
                alt="Konrad Malinowski"
                className={`w-full rounded-2xl transition-opacity duration-500 ${pfpLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                onLoad={() => setPfpLoaded(true)}
              />
              {!pfpLoaded && (
                <div className="absolute inset-0 bg-border rounded-2xl animate-pulse" />
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
