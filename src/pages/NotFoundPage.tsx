import { Link } from 'react-router'
import { usePortfolio } from '../data/PortfolioContext'
import { useLanguage } from '../i18n/LanguageContext'

export function NotFoundPage() {
  const { t } = useLanguage()
  const { profile } = usePortfolio()

  return (
    <section className="text-center py-5">
      <title>{`404 - ${profile.name}`}</title>
      <h1 className="display-1 fw-bold text-secondary">404</h1>
      <h2 className="fw-bold">{t.notFoundTitle}</h2>
      <p className="text-body-secondary">{t.notFoundText}</p>
      <Link to="/" className="btn btn-outline-contrast d-inline-flex align-items-center gap-2 mt-3">
        <i className="bi bi-arrow-left"></i> {t.backToHome}
      </Link>
    </section>
  )
}
