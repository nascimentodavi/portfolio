import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from './Footer'

export function Layout() {
  const { pathname, hash } = useLocation()

  // Ao trocar de página, rola até a âncora (ex.: /#projects) ou volta ao topo
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="container my-5">
      <Outlet />
      <Footer />
    </div>
  )
}
