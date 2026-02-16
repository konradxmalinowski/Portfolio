import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Process = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()

  const steps = [
    { num: '01', title: t('process.01.title'), desc: t('process.01.desc') },
    { num: '02', title: t('process.02.title'), desc: t('process.02.desc') },
    { num: '03', title: t('process.03.title'), desc: t('process.03.desc') },
    { num: '04', title: t('process.04.title'), desc: t('process.04.desc') },
    { num: '05', title: t('process.05.title'), desc: t('process.05.desc') },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.08 },
    }),
  }

  return (
    <section className="py-20 bg-surface" aria-label="Work process">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-primary mb-16"
        >
          {t('process.title')}
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="relative flex gap-6 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-accent text-sm font-semibold font-mono group-hover:bg-accent-light group-hover:border-accent/20 transition-colors duration-200 relative z-10">
                  {step.num}
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-primary mb-1">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
