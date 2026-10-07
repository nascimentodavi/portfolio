import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

// O tema inicial é aplicado por um script no <head> do index.html (antes do
// React carregar, para não piscar); aqui apenas lemos o que ele definiu.
function getCurrentTheme(): Theme {
  return document.documentElement.getAttribute('data-bs-theme') === 'light' ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignora falhas de persistência (ex.: modo privado)
    }
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
