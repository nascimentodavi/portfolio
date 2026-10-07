import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchPortfolio, type PortfolioData } from './portfolio'

type Status = 'loading' | 'ready' | 'error'

interface PortfolioContextValue {
  data: PortfolioData | null
  status: Status
  retry: () => void
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

// Carrega perfil, projetos, formação e experiência uma vez e compartilha entre as páginas.
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetchPortfolio(controller.signal)
      .then((result) => {
        setData(result)
        setStatus('ready')
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.error(error)
        setStatus('error')
      })
    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setStatus('loading')
    setAttempt((n) => n + 1)
  }, [])

  return <PortfolioContext.Provider value={{ data, status, retry }}>{children}</PortfolioContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function usePortfolioStatus() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolioStatus deve ser usado dentro de <PortfolioProvider>')
  return ctx
}

/** Dados já carregados — o <Layout> só renderiza as páginas depois disso */
// oxlint-disable-next-line react/only-export-components
export function usePortfolio(): PortfolioData {
  const { data } = usePortfolioStatus()
  if (!data) throw new Error('usePortfolio chamado antes de o portfólio carregar')
  return data
}
