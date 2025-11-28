import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed top-6 right-6 z-50"
    >
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-1 flex gap-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            language === 'en'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
              : 'text-white/70 hover:text-white'
          }`}
        >
          EN
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage('pl')}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            language === 'pl'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
              : 'text-white/70 hover:text-white'
          }`}
        >
          PL
        </motion.button>
      </div>
    </motion.div>
  )
}

export default LanguageSwitcher
