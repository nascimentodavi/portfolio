import { useLanguage } from '../i18n/LanguageContext'
import { asset, CV_FILE_NAME, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '../config'
import { LanguageSwitch } from './LanguageSwitch'
import { Reveal } from './Reveal'
import { ThemeToggle } from './ThemeToggle'

export function ProfileHeader() {
  const { t } = useLanguage()

  return (
    <header className="d-flex flex-column flex-sm-row justify-content-center align-items-center align-items-sm-start gap-4 gap-sm-5">
      <Reveal variant="zoom">
        <img src={asset('img/profile.png')} alt="Foto de Perfil de Davi Rodrigues" id="profile-header-img" />
      </Reveal>
      <Reveal delay={150} className="text-center text-sm-start">
        <div>
          <h1 className="text-body-emphasis">{t.fullName}</h1>
          <h3 className="text-body-emphasis fst-italic fw-lighter h5">{t.jobTitle}</h3>
        </div>
        <div className="d-flex flex-column gap-3 mt-3">
          <div className="d-flex flex-row justify-content-center justify-content-sm-start align-items-center gap-2 text-secondary">
            <i className="bi bi-geo-fill"></i>
            <p className="m-0 p-0">{t.location}</p>|<p className="m-0 p-0">{t.age}</p>
          </div>
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-start gap-4">
            <img src={asset('img/faesa.png')} alt="Logo FAESA" id="faesa-logo" />
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start gap-3">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
                <i className="bi bi-github"></i> Github
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
                <i className="bi bi-linkedin"></i> LinkedIn
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
                <i className="bi bi-whatsapp"></i> WhatsApp
              </a>
              <a href={asset(`assets/${CV_FILE_NAME}`)} download={CV_FILE_NAME} className="btn btn-sm btn-outline-contrast d-flex align-items-center gap-2">
                <i className="bi bi-download"></i> <span>{t.cvButtonText}</span>
              </a>
              <div className="language-switch d-flex align-items-center gap-2 ps-3 ms-2">
                <ThemeToggle />
                <LanguageSwitch className="ms-2" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </header>
  )
}
