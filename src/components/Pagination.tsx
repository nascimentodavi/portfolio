import { useLanguage } from '../i18n/LanguageContext'

interface PaginationProps {
  page: number
  lastPage: number
  onChange: (page: number) => void
}

// Anterior · 1 2 3 · Próxima — some quando tudo cabe em uma página
export function Pagination({ page, lastPage, onChange }: PaginationProps) {
  const { t } = useLanguage()

  if (lastPage <= 1) return null

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1)

  return (
    <nav className="d-flex flex-wrap justify-content-center align-items-center gap-2" aria-label={`${page} ${t.pageOf} ${lastPage}`}>
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary rounded-pill"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        <i className="bi bi-chevron-left me-1"></i>
        {t.previousPage}
      </button>
      {pages.map((n) => (
        <button
          key={n}
          type="button"
          className={`btn btn-sm rounded-pill pagination-page ${n === page ? 'btn-contrast active' : 'btn-outline-secondary'}`}
          aria-current={n === page ? 'page' : undefined}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary rounded-pill"
        disabled={page >= lastPage}
        onClick={() => onChange(page + 1)}
      >
        {t.nextPage}
        <i className="bi bi-chevron-right ms-1"></i>
      </button>
    </nav>
  )
}
