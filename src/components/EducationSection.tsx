import { asset } from '../config'
import { usePortfolio } from '../data/PortfolioContext'
import type { Education } from '../data/portfolio'
import { useLanguage } from '../i18n/LanguageContext'
import { formatMonth } from '../utils/format'
import { Reveal } from './Reveal'

function EducationCard({ item }: { item: Education }) {
  const { lang, t } = useLanguage()
  const isCertificate = item.kind === 'certificate'

  const period = isCertificate
    ? item.start_date && `${t.issuedOn} ${formatMonth(item.start_date, lang)}`
    : item.start_date
      ? `${formatMonth(item.start_date, lang)} – ${item.end_date ? formatMonth(item.end_date, lang) : t.inProgress}`
      : item.end_date && formatMonth(item.end_date, lang)

  return (
    <article className="card h-100 rounded-4 p-4 d-flex flex-column">
      <div className="d-flex align-items-start gap-3">
        <i className={`bi ${isCertificate ? 'bi-patch-check' : 'bi-mortarboard'} fs-3 text-body-secondary`}></i>
        <div>
          <h3 className="h6 fw-bold text-body-emphasis mb-1">{item.title[lang]}</h3>
          <div className="text-body-secondary small">
            {item.institution_url ? (
              <a href={item.institution_url} target="_blank" rel="noreferrer" className="link-secondary">
                {item.institution}
              </a>
            ) : (
              item.institution
            )}
          </div>
          {period && <small className="text-secondary">{period}</small>}
        </div>
      </div>
      {item.description?.[lang] && <p className="text-body-secondary small mt-3 mb-0">{item.description[lang]}</p>}
      {item.credential_url && (
        <a
          href={asset(item.credential_url)}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-outline-secondary align-self-start d-inline-flex align-items-center gap-2 mt-3"
        >
          <i className="bi bi-box-arrow-up-right"></i> {t.viewCredential}
        </a>
      )}
    </article>
  )
}

export function EducationSection() {
  const { t } = useLanguage()
  const { education } = usePortfolio()

  const groups = [
    { title: t.educationGroup, items: education.filter((item) => item.kind === 'education') },
    { title: t.certificatesGroup, items: education.filter((item) => item.kind === 'certificate') },
  ].filter((group) => group.items.length > 0)

  if (groups.length === 0) return null

  return (
    <section id="education" className="my-5 d-flex flex-column align-items-center gap-4">
      <Reveal>
        <h2 className="fw-bold">{t.educationTitle}</h2>
      </Reveal>
      <div className="container d-flex flex-column gap-4">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="h6 text-uppercase text-secondary fw-bold mb-3">{group.title}</h3>
            <div className="row g-3">
              {group.items.map((item, i) => (
                <div key={item.id} className="col-md-6">
                  <Reveal delay={Math.min(i, 3) * 100} className="h-100">
                    <EducationCard item={item} />
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
