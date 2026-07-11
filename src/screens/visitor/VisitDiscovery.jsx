import { Link } from 'react-router-dom'
import { useEntries } from '../../lib/EntriesContext'
import PrimaryButton from '../../components/shared/PrimaryButton'

const DATE_RANGES = [
  { id: 'r1', label: 'Aug 10 – Aug 14', booked: true },
  { id: 'r2', label: 'Sep 7 – Sep 11', booked: false },
  { id: 'r3', label: 'Oct 12 – Oct 16', booked: false },
]

export default function VisitDiscovery() {
  const { publishedEntries } = useEntries()
  const nextAvailable = DATE_RANGES.find((r) => !r.booked)

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl">Co-Authoring Residency, Duong Lam</h1>
      <p className="mt-2 text-sm text-ink/70">
        A short residency spent alongside a village author — cooking, recording, and adding your
        own contribution to the living archive. You leave as a credited co-author, not a
        spectator.
      </p>

      <div className="mt-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-ink/50">
          What past visitors contributed
        </h2>
        <ul className="mt-2 space-y-2">
          {publishedEntries.slice(0, 2).map((e) => (
            <li key={e.id} className="rounded bg-white p-3 text-sm">
              <Link to={`/archive/${e.id}`} className="font-medium text-terracotta">
                {e.title.en}
              </Link>
              <span className="text-ink/60"> — {e.contributionCount} contributions recorded</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-ink/50">
          Available dates
        </h2>
        <ul className="mt-2 space-y-1.5 text-sm">
          {DATE_RANGES.map((r) => (
            <li key={r.id} className={r.booked ? 'text-ink/40 line-through' : 'text-ink/90'}>
              {r.label} {r.booked && '— fully booked'}
            </li>
          ))}
        </ul>
        {nextAvailable && (
          <p className="mt-2 text-xs text-moss">Next available window: {nextAvailable.label}</p>
        )}
      </div>

      <PrimaryButton as={Link} to="/visitor/booking" className="mt-6">
        Apply to Visit
      </PrimaryButton>
    </div>
  )
}
