export default function StatusDot({ label = 'Draft' }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink/60">
      <span className="h-1.5 w-1.5 rounded-full bg-ochre" aria-hidden="true" />
      {label}
    </span>
  )
}
