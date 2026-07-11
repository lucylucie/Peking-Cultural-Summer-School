export default function PlaceholderScreen({ number, title, phase }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <p className="text-xs uppercase tracking-wide text-ink/40">
        Screen {number} · Phase {phase}
      </p>
      <h1 className="mt-1 text-2xl">{title}</h1>
      <p className="mt-3 text-sm text-ink/60">Not yet built.</p>
    </div>
  )
}
