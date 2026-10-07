const TECH_ICONS = [
  'devicon-php-plain colored',
  'devicon-laravel-plain colored',
  'devicon-javascript-plain colored',
  'devicon-react-plain colored',
  'devicon-microsoftsqlserver-plain colored',
  'devicon-git-plain colored',
  'devicon-jenkins-line jenkins-icon',
  'devicon-bootstrap-plain colored',
]

export function TechCarousel() {
  // Lista duplicada para o loop infinito da animação
  const icons = [...TECH_ICONS, ...TECH_ICONS]

  return (
    <div className="icon-carousel-horizontal mt-3 py-5">
      <div className="carousel-track align-items-center">
        {icons.map((icon, i) => (
          <i key={i} className={`${icon} display-3`} aria-hidden={i >= TECH_ICONS.length}></i>
        ))}
      </div>
    </div>
  )
}
