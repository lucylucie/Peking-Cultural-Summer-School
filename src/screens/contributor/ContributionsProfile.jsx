import { Link } from 'react-router-dom'
import { useEntries } from '../../lib/EntriesContext'
import { CURRENT_CONTRIBUTOR_ID } from '../../lib/currentUser'
import { findUserById } from '../../data/users'
import { contributionTypeLabels } from '../../lib/tokens'
import PrimaryButton from '../../components/shared/PrimaryButton'
import PersonAvatar from '../../components/shared/PersonAvatar'
import DishIllustration from '../../components/shared/DishIllustration'

export default function ContributionsProfile() {
  const { entries } = useEntries()
  const me = findUserById(CURRENT_CONTRIBUTOR_ID)
  const creditedEntries = entries.filter((e) =>
    e.coAuthors.some((c) => c.id === CURRENT_CONTRIBUTOR_ID)
  )

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3">
        <PersonAvatar userId={me?.id} size={56} />
        <h1 className="text-2xl">{me?.name}</h1>
      </div>
      <p className="mt-3 text-sm text-ink/60">{me?.bio}</p>
      <p className="mt-3 text-sm text-moss">
        Credited in {creditedEntries.length} archive {creditedEntries.length === 1 ? 'entry' : 'entries'} ·{' '}
        {me?.contributionCount} contributions total
      </p>

      {creditedEntries.length === 0 ? (
        <div className="mt-8">
          <p className="text-sm text-ink/60">
            You haven't been credited on an archive entry yet — open scaffolds are the place to
            start.
          </p>
          <PrimaryButton as={Link} to="/contributor" className="mt-3">
            Browse Open Scaffolds
          </PrimaryButton>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-ink/10 rounded bg-white">
          {creditedEntries.map((e) => {
            const c = e.coAuthors.find((co) => co.id === CURRENT_CONTRIBUTOR_ID)
            return (
              <li key={e.id}>
                <Link to={`/archive/${e.id}`} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <DishIllustration dishSlug={e.dishSlug} className="h-10 w-14 rounded" />
                    <span>{e.title.en}</span>
                  </div>
                  <span className="text-xs text-moss">
                    {contributionTypeLabels[c.contribution] ?? c.contribution}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
