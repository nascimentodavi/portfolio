export function TechBadges({ techs, className = '' }: { techs: string[]; className?: string }) {
  return (
    <div className={`d-flex flex-wrap gap-2 ${className}`}>
      {techs.map((tech) => (
        <span key={tech} className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill tech-badge">
          {tech}
        </span>
      ))}
    </div>
  )
}
