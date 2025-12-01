import { useEffect, useRef } from 'react'

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let rafId = 0

    const update = () => {
      if (containerRef.current && bgRef.current) {
        const scrollY = window.scrollY || window.pageYOffset
        const offset = scrollY * 0.06
        bgRef.current.style.transform = `translateY(${offset}px) translateZ(0)`
      }
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)

    return () => {
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
