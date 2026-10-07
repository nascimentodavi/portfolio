import type { Localized } from '../i18n/translations'

/** Projeto como retornado por GET /api/public/projects (API do blog). */
export interface Project {
  id: number
  /** Usado na URL: /projetos/<slug> */
  slug: string
  /** URL absoluta (upload do blog) ou caminho relativo à pasta public/ */
  image: string
  /** Imagens extras exibidas na galeria da página do projeto (ausente em APIs antigas) */
  gallery?: string[]
  techs: string[]
  github_url: string | null
  live_url: string | null
  title: Localized<string>
  /** Resumo curto exibido no card da página inicial */
  summary: Localized<string>
  /** Parágrafos exibidos na página do projeto */
  description: Localized<string[]>
  highlights: Localized<string[]>
}

export async function fetchProjects(signal?: AbortSignal): Promise<Project[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/public/projects`, {
    headers: { Accept: 'application/json' },
    signal,
  })
  if (!response.ok) throw new Error(`Falha ao carregar projetos (HTTP ${response.status})`)
  return response.json()
}
