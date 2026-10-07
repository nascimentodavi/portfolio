import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { asset } from '../config'
import { useLanguage } from '../i18n/LanguageContext'

interface ProjectGalleryProps {
  images: string[]
  title: string
}

// Grade de miniaturas; ao clicar, abre a imagem em tela cheia (<dialog> nativo:
// já trata foco, Esc e bloqueio do fundo)
export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const { t } = useLanguage()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (openIndex !== null && !dialog.open) dialog.showModal()
    if (openIndex === null && dialog.open) dialog.close()
  }, [openIndex])

  if (images.length === 0) return null

  const total = images.length
  const step = (offset: number) => setOpenIndex((i) => (i === null ? i : (i + offset + total) % total))
  const altFor = (i: number) => `${title} — ${t.galleryImage} ${i + 1}/${total}`

  function handleKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }

  // Clique no fundo escuro (fora da imagem e dos botões) fecha
  function handleBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) setOpenIndex(null)
  }

  return (
    <section className="mb-5">
      {/* Título só para leitores de tela: visualmente a grade já continua a capa */}
      <h2 className="visually-hidden">{t.gallery}</h2>
      <div className="project-gallery-grid">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className="project-gallery-thumb rounded-3 border border-secondary p-0 overflow-hidden"
            onClick={() => setOpenIndex(i)}
          >
            <img src={asset(src)} alt={altFor(i)} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="project-lightbox"
        onClose={() => setOpenIndex(null)}
        onKeyDown={handleKeyDown}
        onClick={handleBackdropClick}
        aria-label={t.gallery}
      >
        {openIndex !== null && (
          <>
            <img src={asset(images[openIndex])} alt={altFor(openIndex)} className="project-lightbox-img" />
            <button type="button" className="btn btn-contrast project-lightbox-close" onClick={() => setOpenIndex(null)} aria-label={t.galleryClose}>
              <i className="bi bi-x-lg"></i>
            </button>
            {total > 1 && (
              <>
                <button type="button" className="btn btn-contrast project-lightbox-nav start-0" onClick={() => step(-1)} aria-label={t.galleryPrev}>
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button type="button" className="btn btn-contrast project-lightbox-nav end-0" onClick={() => step(1)} aria-label={t.galleryNext}>
                  <i className="bi bi-chevron-right"></i>
                </button>
                <span className="project-lightbox-counter badge rounded-pill">
                  {openIndex + 1} / {total}
                </span>
              </>
            )}
          </>
        )}
      </dialog>
    </section>
  )
}
