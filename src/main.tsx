import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './contexts/LanguageContext'
import App from './App.tsx'
import './index.css'

const removeLoadingScreen = () => {
  const loadingScreen = document.querySelector('.app-loading') as HTMLElement | null
  if (loadingScreen) {
    loadingScreen.style.opacity = '0'
    loadingScreen.style.transition = 'opacity 0.3s ease'
    setTimeout(() => {
      loadingScreen.remove()
    }, 300)
  }
}

createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
)

requestAnimationFrame(() => {
  setTimeout(removeLoadingScreen, 100)
})
