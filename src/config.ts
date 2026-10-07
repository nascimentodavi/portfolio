export const GITHUB_URL = 'https://github.com/NascimentoDavi'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/davi-rodrigues-cs/'
export const EMAIL = 'davirnascimentox@gmail.com'
export const WHATSAPP_URL = 'https://wa.me/5527992745458'
export const WHATSAPP_DISPLAY = '+55 (27) 99274-5458'
export const CV_FILE_NAME = 'resume_davi_rodrigues_do_nascimento.pdf'

/** Resolve um arquivo da pasta public/ respeitando o `base` do Vite; URLs absolutas (uploads do blog) passam direto. */
export function asset(path: string) {
  return /^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path}`
}
