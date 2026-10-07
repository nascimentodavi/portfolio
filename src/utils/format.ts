import type { Language } from '../i18n/translations'

// "2024-03-01" → "mar. de 2024" / "Mar 2024"
export function formatMonth(date: string | null, lang: Language): string {
  if (!date) return ''
  const [year, month] = date.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    month: 'short',
    year: 'numeric',
  })
}

const DEVICON_CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest'

// Ícone colorido do devicon direto do CDN (só os SVGs usados são baixados)
export function deviconUrl(devicon: string, variant: string): string {
  return `${DEVICON_CDN}/icons/${devicon}/${devicon}-${variant}.svg`
}
