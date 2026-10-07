import { Link, useParams } from 'react-router'
import { LanguageSwitch } from '../components/LanguageSwitch'
import { ThemeToggle } from '../components/ThemeToggle'
import { TechBadges } from '../components/TechBadges'
import { asset } from '../config'
import { ProjectsStatus } from '../components/ProjectsStatus'
import { ProjectGallery } from '../components/ProjectGallery'
import { useProjects } from '../data/ProjectsContext'
import { useLanguage } from '../i18n/LanguageContext'
import { NotFoundPage } from './NotFoundPage'

export function ProjectPage() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const { projects, status } = useProjects()
  const project = projects.find((p) => p.slug === slug)

  if (status !== 'ready') return <ProjectsStatus />
  if (!project) return <NotFoundPage />

  const title = project.title[lang]
  const others = projects.filter((p) => p.slug !== project.slug)

  return (
    <>
      <title>{`${title} - ${t.fullName}`}</title>

      <nav className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/#projects" className="btn btn-sm btn-outline-contrast d-inline-flex align-items-center gap-2">
          <i className="bi bi-arrow-left"></i> {t.backToHome}
        </Link>
        <div className="d-flex align-items-center gap-3">
          <ThemeToggle />
          <LanguageSwitch />
        </div>
      </nav>

      <article>
        <header className="mb-4">
          <h1 className="fw-bold text-body-emphasis">{title}</h1>
          <p className="lead text-body-secondary mb-0">{project.summary[lang]}</p>
        </header>

        <img src={asset(project.image)} alt={title} className="project-hero rounded-4 border border-2 border-secondary shadow-lg mb-5" />

        <div className="row g-5">
          <div className="col-lg-8">
            <h2 className="h4 fw-bold mb-3">{t.aboutProject}</h2>
            {project.description[lang].map((paragraph) => (
              <p key={paragraph} className="text-body-secondary">
                {paragraph}
              </p>
            ))}

            <h2 className="h4 fw-bold mt-5 mb-3">{t.highlights}</h2>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {project.highlights[lang].map((item) => (
                <li key={item} className="d-flex gap-2 text-body-secondary">
                  <i className="bi bi-check2-circle text-success"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <ProjectGallery images={project.gallery ?? []} title={title} />
          </div>

          <aside className="col-lg-4">
            <div className="card border-2 border-secondary rounded-4">
              <div className="card-body p-4 d-flex flex-column gap-4">
                <div>
                  <h2 className="h6 text-uppercase text-secondary fw-bold mb-3">{t.technologies}</h2>
                  <TechBadges techs={project.techs} />
                </div>
                {(project.live_url || project.github_url) && (
                  <div className="d-flex flex-column gap-2">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-contrast d-inline-flex justify-content-center align-items-center gap-2">
                        <i className="bi bi-box-arrow-up-right"></i> {t.viewLive}
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-outline-secondary d-inline-flex justify-content-center align-items-center gap-2">
                        <i className="devicon-github-original"></i> {t.viewOnGithub}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </article>

      {others.length > 0 && (
        <section className="mt-5 pt-4">
          <h2 className="h4 fw-bold mb-3">{t.otherProjects}</h2>
          <div className="row g-3">
            {others.map((p) => (
              <div key={p.slug} className="col-sm-6 col-lg-4">
                <Link to={`/projetos/${p.slug}`} className="card project-card h-100 border-2 border-secondary rounded-4 text-decoration-none">
                  <img src={asset(p.image)} alt={p.title[lang]} className="card-img-top rounded-top-4 other-project-img" />
                  <div className="card-body">
                    <h3 className="h6 fw-bold text-body-emphasis mb-1">{p.title[lang]}</h3>
                    <p className="small text-muted mb-0">{p.summary[lang]}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
