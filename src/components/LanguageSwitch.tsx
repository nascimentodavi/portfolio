import { useLanguage } from '../i18n/LanguageContext'

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div className={`form-check form-switch ${className}`}>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="languageSwitch"
        checked={lang === 'en'}
        onChange={(e) => setLang(e.target.checked ? 'en' : 'pt')}
      />
      <label className="form-check-label" htmlFor="languageSwitch">
        {lang.toUpperCase()}
      </label>
    </div>
  )
}
