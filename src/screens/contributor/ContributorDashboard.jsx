import { Link } from 'react-router-dom'
import { scaffolds } from '../../data/scaffolds'
import { useEntries } from '../../lib/EntriesContext'
import { scaffoldTagLabels } from '../../lib/tokens'

export default function ContributorDashboard() {
  const { entries } = useEntries()
  const draftsNeedingInput = entries.filter(
    (e) => e.status === 'draft' && e.coAuthors.length > 0
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl">Open Scaffolds</h1>
      <p className="mt-1 text-sm text-ink/60">
        Where a contribution is currently needed across the Duong Lam archive.
      </p>

      {scaffolds.length === 0 ? (
        <p className="mt-6 text-sm text-ink/60">No open scaffolds right now, check back soon.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {scaffolds.map((s) => (
            <li key={s.id}>
              <Link
                to={`/contributor/scaffold/${s.id}`}
                className="block rounded bg-white p-4 hover:shadow-sm"
              >
                <p className="font-serif text-lg leading-snug">{s.prompt}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded bg-moss/10 px-2 py-0.5 text-xs text-moss">
                      {scaffoldTagLabels[t] ?? t}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-ink/60">{s.comments.length} contributions so far</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {draftsNeedingInput.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-wide text-ink/50">
            Drafts in progress needing your input
          </h2>
          <ul className="mt-3 divide-y divide-ink/10 rounded bg-white">
            {draftsNeedingInput.map((e) => (
              <li key={e.id}>
                <Link to={`/contributor/edit/${e.id}`} className="flex items-center justify-between px-4 py-3">
                  <span>{e.title.en}</span>
                  <span className="text-xs text-ink/60">Needs context</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
