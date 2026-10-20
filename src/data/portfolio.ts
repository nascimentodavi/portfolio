import type { Localized } from '../i18n/translations'

export interface TechItem {
  name: string
  /** Pasta do ícone no devicon (ex.: "php") */
  devicon: string
  /** Variação do SVG (ex.: "original", "plain") */
  variant: string
}

/** Perfil editado no painel do blog (Portfólio → Perfil). */
export interface Profile {
  name: string
  job_title: Localized<string>
  location: Localized<string>
  age: number | null
  /** URL absoluta (upload do blog) ou caminho relativo à pasta public/ */
  photo: string | null
  institution_name: string | null
  institution_logo: string | null
  about_me: Localized<string[]>
  techs: TechItem[]
  email: string | null
  whatsapp_url: string | null
  whatsapp_display: string | null
  github_url: string | null
  linkedin_url: string | null
  cv_file: string | null
  contact_text: Localized<string>
}

export type ProjectKind = 'personal' | 'professional'

export interface Collaborator {
  name: string
  role: Localized<string> | null
  url: string | null
}

export interface Project {
  id: number
  /** Usado na URL: /projetos/<slug> */
  slug: string
  kind: ProjectKind
  /** URL absoluta (upload do blog) ou caminho relativo à pasta public/ */
  image: string
  /** Imagens extras exibidas na galeria da página do projeto */
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
  collaborators?: Collaborator[]
}

export interface Education {
  id: number
  /** "education": curso (end_date nulo = em andamento); "certificate": start_date é a emissão */
  kind: 'education' | 'certificate'
  title: Localized<string>
  institution: string
  institution_url: string | null
  start_date: string | null
  end_date: string | null
  description: Localized<string> | null
  credential_url: string | null
}

export interface Experience {
  id: number
  company: string
  company_url: string | null
  logo: string | null
  role: Localized<string>
  location: string | null
  start_date: string
  /** Nulo = emprego atual */
  end_date: string | null
  description: Localized<string[]>
  techs: string[]
}

export interface PortfolioData {
  profile: Profile
  projects: Project[]
  education: Education[]
  experience: Experience[]
}

/** Tudo o que o portfólio exibe, em uma requisição (GET /api/public/portfolio da API do blog). */
export async function fetchPortfolio(signal?: AbortSignal): Promise<PortfolioData> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/public/portfolio`, {
    headers: { Accept: 'application/json' },
    signal,
  })
  if (!response.ok) throw new Error(`Falha ao carregar o portfólio (HTTP ${response.status})`)
  return response.json()
}
