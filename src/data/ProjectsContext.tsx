import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchProjects, type Project } from './projects'

type Status = 'loading' | 'ready' | 'error'

interface ProjectsContextValue {
  projects: Project[]
  status: Status
  retry: () => void
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null)

// Carrega os projetos uma vez e compartilha entre a home e as páginas de projeto.
export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetchProjects(controller.signal)
      .then((data) => {
        setProjects(data)
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

  return <ProjectsContext.Provider value={{ projects, status, retry }}>{children}</ProjectsContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useProjects() {
  const ctx = useContext(ProjectsContext)
  if (!ctx) throw new Error('useProjects deve ser usado dentro de <ProjectsProvider>')
  return ctx
}
