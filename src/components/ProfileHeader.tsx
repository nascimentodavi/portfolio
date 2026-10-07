import { asset } from '../config'
import { usePortfolio } from '../data/PortfolioContext'
import { useLanguage } from '../i18n/LanguageContext'
import { LanguageSwitch } from './LanguageSwitch'
import { Reveal } from './Reveal'
import { ThemeToggle } from './ThemeToggle'

export function ProfileHeader() {
  const { lang, t } = useLanguage()
  const { profile } = usePortfolio()

  return (
    <header className="d-flex flex-column flex-sm-row justify-content-center align-items-center align-items-sm-start gap-4 gap-sm-5">
      {profile.photo && (
        <Reveal variant="zoom">
          <img src={asset(profile.photo)} alt={profile.name} id="profile-header-img" />
        </Reveal>
      )}
      <Reveal delay={150} className="text-center text-sm-start">
        <div>
          <h1 className="text-body-emphasis">{profile.name}</h1>
          <h3 className="text-body-emphasis fst-italic fw-lighter h5">{profile.job_title[lang]}</h3>
        </div>
        <div className="d-flex flex-column gap-3 mt-3">
          <div className="d-flex flex-row justify-content-center justify-content-sm-start align-items-center gap-2 text-secondary">
            {profile.location[lang] && (
              <>
                <i className="bi bi-geo-fill"></i>
                <p className="m-0 p-0">{profile.location[lang]}</p>
              </>
            )}
            {profile.location[lang] && profile.age !== null && '|'}
            {profile.age !== null && (
              <p className="m-0 p-0">
                {profile.age} {t.yearsOld}
              </p>
            )}
          </div>
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-start gap-4">
            {profile.institution_logo && (
              <img src={asset(profile.institution_logo)} alt={`Logo ${profile.institution_name ?? ''}`} id="faesa-logo" />
            )}
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start gap-3">
              {profile.github_url && (
                <a href={profile.github_url} target="_blank" rel="noreferrer" className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
                  <i className="bi bi-github"></i> Github
                </a>
              )}
              {profile.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
                  <i className="bi bi-linkedin"></i> LinkedIn
                </a>
              )}
              {profile.whatsapp_url && (
                <a href={profile.whatsapp_url} target="_blank" rel="noreferrer" className="text-decoration-none text-body-secondary d-flex align-items-center gap-2">
                  <i className="bi bi-whatsapp"></i> WhatsApp
                </a>
              )}
              {profile.cv_file && (
                <a href={asset(profile.cv_file)} target="_blank" rel="noreferrer" download className="btn btn-sm btn-outline-contrast d-flex align-items-center gap-2">
                  <i className="bi bi-download"></i> <span>{t.cvButtonText}</span>
                </a>
              )}
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
