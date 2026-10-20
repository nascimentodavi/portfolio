import { usePortfolio } from '../data/PortfolioContext'
import { useLanguage } from '../i18n/LanguageContext'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const { lang, t } = useLanguage()
  const { profile } = usePortfolio()

  return (
    <footer className="text-center pb-4">
      <hr className="border-secondary my-5" />
      <div id="contact" className="mb-5">
        <h2 className="fw-bold text-body-emphasis mb-3">{t.contactTitle}</h2>
        {profile.contact_text[lang] && <p className="text-body-secondary col-md-8 mx-auto">{profile.contact_text[lang]}</p>}
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-4 mt-4">
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
              <i className="bi bi-envelope-fill fs-5"></i>
              {profile.email}
            </a>
          )}
          {profile.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
              <i className="bi bi-linkedin fs-5"></i>
              LinkedIn
            </a>
          )}
          {profile.whatsapp_url && (
            <a href={profile.whatsapp_url} target="_blank" rel="noreferrer" className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
              <i className="bi bi-whatsapp fs-5"></i>
              {profile.whatsapp_display}
            </a>
          )}
        </div>
      </div>
      <p className="mb-0 text-secondary">
        &copy; {CURRENT_YEAR} {profile.name}. {t.copyright}
      </p>
    </footer>
  )
}
