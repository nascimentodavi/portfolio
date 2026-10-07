import { Link } from 'react-router'
import { asset } from '../config'
import type { Project } from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'
import { TechBadges } from './TechBadges'

export function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLanguage()
  const title = project.title[lang]

  return (
    <article className="card project-card shadow-lg rounded-4 overflow-hidden">
      <div className="row g-0">
        {/* Imagem encostada nas bordas: topo no celular, lateral no desktop */}
        <div className="col-sm-4 col-lg-3 card-media">
          <img src={asset(project.image)} alt={title} />
        </div>
        <div className="col-sm-8 col-lg-9">
          <div className="card-body p-4 text-center text-sm-start">
            <h5 className="fw-bold mb-0">
              {/* stretched-link torna o card inteiro clicável */}
              <Link to={`/projetos/${project.slug}`} className="text-decoration-none text-body-emphasis stretched-link">
                {title}
              </Link>
            </h5>
            <TechBadges techs={project.techs} className="justify-content-center justify-content-sm-start my-3" />
            <p className="text-muted mb-3">{project.summary[lang]}</p>
            <span className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2">
              {t.viewDetails} <i className="bi bi-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
