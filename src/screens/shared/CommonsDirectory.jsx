import { Link } from 'react-router-dom'
import { villageAuthors, contributors, visitors } from '../../data/users'
import { useEntries } from '../../lib/EntriesContext'
import PersonAvatar from '../../components/shared/PersonAvatar'

const ROLE_BADGE = {
  'village-author': { label: 'Village Author', className: 'bg-terracotta/15 text-terracotta' },
  contributor: { label: 'Contributor', className: 'bg-moss/15 text-moss' },
  visitor: { label: 'Visitor', className: 'bg-ink/10 text-ink' },
}

export default function CommonsDirectory() {
  const { entries } = useEntries()
  const people = [...villageAuthors, ...contributors, ...visitors]

  function creditedCount(personId) {
    return entries.filter(
      (e) => e.primaryAuthor === personId || e.coAuthors.some((c) => c.id === personId)
    ).length
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl">People</h1>
      <p className="mt-1 text-sm text-ink/60">
        Everyone whose work makes up the Duong Lam Food Archive — village authors, contributors,
        and visitors who completed a residency. Connections shown here are shared authorship, not
        a social network.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {people.map((person) => {
          const badge = ROLE_BADGE[person.role]
          const count = creditedCount(person.id)
          return (
            <Link
              key={person.id}
              to={`/people/${person.id}`}
              className="rounded bg-white p-4 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <PersonAvatar userId={person.id} size={44} />
                <div>
                  <p className="text-sm font-medium">{person.name}</p>
                  <span className={`mt-1 inline-block rounded px-2 py-0.5 text-xs ${badge.className}`}>
                    {badge.label}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs text-ink/60">
                Credited in {count} archive {count === 1 ? 'entry' : 'entries'}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
