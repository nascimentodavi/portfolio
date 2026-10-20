import { asset } from '../config'
import { usePortfolio } from '../data/PortfolioContext'
import { useLanguage } from '../i18n/LanguageContext'
import { formatMonth } from '../utils/format'
import { Reveal } from './Reveal'
import { TechBadges } from './TechBadges'

// Linha do tempo de experiências (a API já entrega o emprego atual primeiro)
export function ExperienceSection() {
  const { lang, t } = useLanguage()
  const { experience } = usePortfolio()

  if (experience.length === 0) return null

  return (
    <section id="experience" className="my-5 d-flex flex-column align-items-center gap-4">
      <Reveal>
        <h2 className="fw-bold">{t.experienceTitle}</h2>
      </Reveal>
      <ol className="timeline list-unstyled container mb-0">
        {experience.map((item, i) => (
          <li key={item.id} className="timeline-item">
            <Reveal delay={Math.min(i, 3) * 100}>
              <article className="card rounded-4 p-4">
                <div className="d-flex align-items-start gap-3">
                  {item.logo && <img src={asset(item.logo)} alt="" className="timeline-logo rounded-3" />}
                  <div className="flex-grow-1">
                    <h3 className="h5 fw-bold text-body-emphasis mb-1">{item.role[lang]}</h3>
                    <div className="text-body-secondary">
                      {item.company_url ? (
                        <a href={item.company_url} target="_blank" rel="noreferrer" className="link-secondary">
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                      {item.location && <span> · {item.location}</span>}
                    </div>
                    <small className="text-secondary">
                      {formatMonth(item.start_date, lang)} – {item.end_date ? formatMonth(item.end_date, lang) : t.present}
                    </small>
                  </div>
                </div>
                {item.description[lang].length > 0 && (
                  <ul className="text-body-secondary mt-3 mb-0 ps-3">
                    {item.description[lang].map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                )}
                {item.techs.length > 0 && <TechBadges techs={item.techs} className="mt-3" />}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
