import { EMAIL, LINKEDIN_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '../config'
import { useLanguage } from '../i18n/LanguageContext'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="text-center pb-4">
      <hr className="border-secondary my-5" />
      <div id="contact" className="mb-5">
        <h2 className="fw-bold text-body-emphasis mb-3">{t.contactTitle}</h2>
        <p className="text-body-secondary col-md-8 mx-auto">{t.contactDesc}</p>
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-4 mt-4">
          <a href={`mailto:${EMAIL}`} className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
            <i className="bi bi-envelope-fill fs-5"></i>
            {EMAIL}
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
            <i className="bi bi-linkedin fs-5"></i>
            LinkedIn
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
            <i className="bi bi-whatsapp fs-5"></i>
            {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>
      <p className="mb-0 text-secondary">
        &copy; {CURRENT_YEAR} {t.fullName}. {t.copyright}
      </p>
    </footer>
  )
}
