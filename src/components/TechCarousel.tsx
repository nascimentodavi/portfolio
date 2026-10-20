import { usePortfolio } from '../data/PortfolioContext'
import { deviconUrl } from '../utils/format'

export function TechCarousel() {
  const { profile } = usePortfolio()
  // Lista duplicada para o loop infinito da animação
  const icons = [...profile.techs, ...profile.techs]

  return (
    <div className="icon-carousel-horizontal mt-3 py-5">
      <div className="carousel-track align-items-center">
        {icons.map((tech, i) => (
          <img
            key={i}
            src={deviconUrl(tech.devicon, tech.variant)}
            alt={i < profile.techs.length ? tech.name : ''}
            aria-hidden={i >= profile.techs.length}
            title={tech.name}
            className="tech-icon"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}
