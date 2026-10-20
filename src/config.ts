/** Resolve um arquivo da pasta public/ respeitando o `base` do Vite; URLs absolutas (uploads do blog) passam direto. */
export function asset(path: string) {
  return /^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path}`
}
