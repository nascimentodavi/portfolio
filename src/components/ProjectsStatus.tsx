import { useProjects } from '../data/ProjectsContext'
import { useLanguage } from '../i18n/LanguageContext'

// Estados de carregamento/erro da lista de projetos vinda da API.
export function ProjectsStatus() {
  const { status, retry } = useProjects()
  const { t } = useLanguage()

  if (status === 'loading') {
    return (
      <div className="text-center text-body-secondary py-5">
        <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
        {t.loadingProjects}
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="text-center text-body-secondary py-5">
        <p className="mb-3">{t.projectsError}</p>
        <button type="button" className="btn btn-sm btn-outline-contrast" onClick={retry}>
          <i className="bi bi-arrow-clockwise me-1"></i> {t.retry}
        </button>
      </div>
    )
  }

  return null
}
