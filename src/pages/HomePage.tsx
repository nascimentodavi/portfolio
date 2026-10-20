import { useState } from 'react'
import { EducationSection } from '../components/EducationSection'
import { Pagination } from '../components/Pagination'
import { ExperienceSection } from '../components/ExperienceSection'
import { ProfileHeader } from '../components/ProfileHeader'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { TechCarousel } from '../components/TechCarousel'
import { usePortfolio } from '../data/PortfolioContext'
import type { ProjectKind } from '../data/portfolio'
import { useLanguage } from '../i18n/LanguageContext'

type ProjectFilter = 'all' | ProjectKind

const PROJECTS_PER_PAGE = 2

export function HomePage() {
  const { lang, t } = useLanguage()
  const { profile, projects } = usePortfolio()
  const [filter, setFilter] = useState<ProjectFilter>('all')
  const [page, setPage] = useState(1)

  const filteredProjects = filter === 'all' ? projects : projects.filter((project) => project.kind === filter)
  const lastPage = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE))
  const visibleProjects = filteredProjects.slice((page - 1) * PROJECTS_PER_PAGE, page * PROJECTS_PER_PAGE)

  function changeFilter(value: ProjectFilter) {
    setFilter(value)
    setPage(1)
  }

  // Ao trocar de página, volta ao topo da seção (a lista nova começa lá)
  function changePage(value: number) {
    setPage(value)
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  // O filtro só faz sentido quando existem projetos dos dois tipos
  const hasBothKinds = new Set(projects.map((project) => project.kind)).size > 1
  const filters: { value: ProjectFilter; label: string }[] = [
    { value: 'all', label: t.filterAll },
    { value: 'personal', label: t.filterPersonal },
    { value: 'professional', label: t.filterProfessional },
  ]

  return (
    <>
      <title>{`Home - ${profile.name}`}</title>

      <ProfileHeader />

      {profile.about_me[lang].length > 0 && (
        <section id="about-me" className="my-5 py-4">
          <Reveal delay={300}>
            <h2 className="fw-bold text-center mb-3">{t.aboutMeTitle}</h2>
            <div className="lead text-body-secondary col-md-10 mx-auto text-center">
              {profile.about_me[lang].map((paragraph) => (
                <p key={paragraph} className="mb-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {profile.techs.length > 0 && (
        <section className="my-5">
          <Reveal className="d-flex flex-column align-items-center">
            <h2 className="fw-bold text-center">{t.techTitle}</h2>
            <TechCarousel />
          </Reveal>
        </section>
      )}

      <ExperienceSection />

      <section id="projects" className="my-5 d-flex flex-column align-items-center gap-4">
        <Reveal>
          <h2 className="fw-bold">{t.projectsTitle}</h2>
        </Reveal>
        {hasBothKinds && (
          <div className="project-filter d-flex gap-2" role="group" aria-label={t.projectsTitle}>
            {filters.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={`btn btn-sm rounded-pill ${filter === value ? 'btn-contrast active' : 'btn-outline-secondary'}`}
                aria-pressed={filter === value}
                onClick={() => changeFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        <div className="container d-flex flex-column gap-4">
          {visibleProjects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i, 3) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <Pagination page={page} lastPage={lastPage} onChange={changePage} />
      </section>

      <EducationSection />
    </>
  )
}
