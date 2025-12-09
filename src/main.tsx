import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './contexts/LanguageContext'
import App from './App.tsx'
import './index.css'
import './styles/mobile.css'

const removeLoadingScreen = () => {
  const loadingScreen = document.querySelector('.app-loading') as HTMLElement | null
  if (loadingScreen) {
    loadingScreen.style.animation = 'fadeOut 0.3s ease-in-out forwards'
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
