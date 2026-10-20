import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Atraso em ms, para animar elementos em sequência */
  delay?: number
  variant?: 'up' | 'down' | 'zoom'
  className?: string
}

// Anima a entrada do conteúdo (ver motion.css) quando ele aparece na tela:
// o que está visível ao abrir a página anima logo; o resto, ao rolar até ele.
export function Reveal({ children, delay = 0, variant = 'up', className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      // Margem superior enorme: o que já ficou acima da tela (rolagem rápida,
      // link para âncora) conta como visto, em vez de ficar invisível
      { threshold: 0.1, rootMargin: '100000px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const variantClass = variant === 'up' ? '' : `reveal-${variant}`

  return (
    <div
      ref={ref}
      className={`reveal ${variantClass} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
