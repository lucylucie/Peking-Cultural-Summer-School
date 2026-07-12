import { useParams, Link } from 'react-router-dom'
import { findUserById } from '../../data/users'
import { useEntries } from '../../lib/EntriesContext'
import { contributionTypeLabels } from '../../lib/tokens'
import PersonAvatar from '../../components/shared/PersonAvatar'
import DishIllustration from '../../components/shared/DishIllustration'

const ROLE_BADGE = {
  'village-author': { label: 'Village Author', className: 'bg-terracotta/15 text-terracotta' },
  contributor: { label: 'Contributor', className: 'bg-moss/15 text-moss' },
  visitor: { label: 'Visitor', className: 'bg-ink/10 text-ink' },
}

export default function PersonProfile() {
  const { personId } = useParams()
  const { entries } = useEntries()
  const person = findUserById(personId)

  if (!person) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-sm text-ink/60">This profile could not be found.</p>
        <Link to="/people" className="mt-2 inline-block text-sm text-terracotta">
          Back to People
        </Link>
      </div>
    )
  }

  const creditedEntries = entries.filter(
    (e) => e.primaryAuthor === person.id || e.coAuthors.some((c) => c.id === person.id)
  )

  const coAuthorIds = new Set()
  creditedEntries.forEach((e) => {
    if (e.primaryAuthor !== person.id) coAuthorIds.add(e.primaryAuthor)
    e.coAuthors.forEach((c) => {
      if (c.id !== person.id) coAuthorIds.add(c.id)
    })
  })
  const coAuthors = [...coAuthorIds].map(findUserById).filter(Boolean)

  const badge = ROLE_BADGE[person.role]

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link to="/people" className="text-sm text-terracotta">
        ← People
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <PersonAvatar userId={person.id} size={64} />
        <div>
          <h1 className="font-serif text-2xl">{person.name}</h1>
          <span className={`mt-1 inline-block rounded px-2 py-0.5 text-xs ${badge.className}`}>
            {badge.label}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink/70">{person.bio}</p>

      <div className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-wide text-ink/50">
          Credited archive entries
        </h2>
        {creditedEntries.length === 0 ? (
          <p className="mt-2 text-sm text-ink/60">No credited entries yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-ink/10 rounded bg-white">
            {creditedEntries.map((e) => {
              const isPrimary = e.primaryAuthor === person.id
              const contribution = e.coAuthors.find((c) => c.id === person.id)?.contribution
              return (
                <li key={e.id}>
                  <Link to={`/archive/${e.id}`} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <DishIllustration dishSlug={e.dishSlug} className="h-10 w-14 rounded" />
                      <span>{e.title.en}</span>
                    </div>
                    <span className="text-xs text-moss">
                      {isPrimary ? 'Primary author' : contributionTypeLabels[contribution] ?? contribution}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-wide text-ink/50">
          Co-authored with
        </h2>
        {coAuthors.length === 0 ? (
          <p className="mt-2 text-sm text-ink/60">No shared credits yet.</p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-3">
            {coAuthors.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/people/${p.id}`}
                  className="flex items-center gap-2 rounded bg-white px-3 py-2 text-sm hover:shadow-sm"
                >
                  <PersonAvatar userId={p.id} size={28} />
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
