import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/useTheme'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const label = theme === 'dark' ? t.lightTheme : t.darkTheme

  return (
    <button
      type="button"
      className={`btn btn-sm btn-link theme-toggle p-1 ${className}`}
      onClick={toggleTheme}
      title={label}
      aria-label={label}
    >
      <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'}`}></i>
    </button>
  )
}
