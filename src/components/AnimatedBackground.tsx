import { useEffect, useRef } from 'react'

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    let rafId = 0
    let lastScrollY = 0
    let ticking = false

    const update = () => {
      if (bgRef.current) {
        const offset = lastScrollY * 0.06
        const transform = `translate3d(0, ${offset}px, 0)`
        bgRef.current.style.webkitTransform = transform
        bgRef.current.style.transform = transform
      }
      ticking = false
    }

    const onScroll = () => {
      lastScrollY = window.scrollY || window.pageYOffset

      if (!ticking) {
        rafId = requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div ref={bgRef} className="animated-bg" aria-hidden />
    </div>
  )
}

export default AnimatedBackground
