import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { usePortfolioStatus } from '../data/PortfolioContext'
import { Footer } from './Footer'
import { PortfolioStatus } from './PortfolioStatus'

export function Layout() {
  const { pathname, hash } = useLocation()
  const { status } = usePortfolioStatus()

  // Ao trocar de página (ou quando o conteúdo chega), rola até a âncora (ex.: /#projects) ou volta ao topo
  useEffect(() => {
    if (status !== 'ready') return
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash, status])

  // Todo o conteúdo (nome, textos, projetos) vem da API: as páginas só aparecem depois dela
  if (status !== 'ready') {
    return (
      <div className="container my-5 min-vh-100 d-flex align-items-center justify-content-center">
        <PortfolioStatus />
      </div>
    )
  }

  return (
    <div className="container my-5">
      <Outlet />
      <Footer />
    </div>
  )
}
