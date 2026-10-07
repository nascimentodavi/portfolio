import { ProfileHeader } from '../components/ProfileHeader'
import { ProjectCard } from '../components/ProjectCard'
import { TechCarousel } from '../components/TechCarousel'
import { ProjectsStatus } from '../components/ProjectsStatus'
import { Reveal } from '../components/Reveal'
import { useProjects } from '../data/ProjectsContext'
import { useLanguage } from '../i18n/LanguageContext'

export function HomePage() {
  const { t } = useLanguage()
  const { projects } = useProjects()

  return (
    <>
      <title>{`Home - ${t.fullName}`}</title>

      <ProfileHeader />

      <section id="about-me" className="my-5 py-4">
        <Reveal delay={300}>
          <h2 className="fw-bold text-center mb-3">{t.aboutMeTitle}</h2>
          <p className="lead text-body-secondary col-md-10 mx-auto text-center">
            {t.aboutMeText[0]}
            <br />
            {t.aboutMeText[1]}
          </p>
        </Reveal>
      </section>

      <section className="my-5">
        <Reveal className="d-flex flex-column align-items-center">
          <h2 className="fw-bold text-center">{t.techTitle}</h2>
          <TechCarousel />
        </Reveal>
      </section>

      <section id="projects" className="my-5 d-flex flex-column align-items-center gap-4">
        <Reveal>
          <h2 className="fw-bold">{t.projectsTitle}</h2>
        </Reveal>
        <div className="container d-flex flex-column gap-4">
          <ProjectsStatus />
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i, 3) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
