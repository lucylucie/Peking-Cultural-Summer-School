import { findUserById } from '../../data/users'
import { contributionTypeLabels } from '../../lib/tokens'
import PersonAvatar from './PersonAvatar'

export default function AuthorAttribution({ entry, className }) {
  const primaryAuthor = findUserById(entry.primaryAuthor)
  const coAuthors = entry.coAuthors.map((c) => ({
    user: findUserById(c.id),
    contribution: c.contribution,
  }))

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <PersonAvatar userId={entry.primaryAuthor} size={28} />
        <p className="text-sm text-ink">
          Authored by{' '}
          <span className="font-medium">{primaryAuthor?.name ?? 'Unknown'}</span>
        </p>
      </div>
      {coAuthors.length > 0 && (
        <div className="mt-2 flex items-start gap-2">
          <div className="mt-0.5 flex shrink-0 -space-x-2">
            {coAuthors.map((c, i) => (
              <PersonAvatar key={c.user?.id ?? i} userId={c.user?.id ?? String(i)} size={22} className="ring-2 ring-cream" />
            ))}
          </div>
          <p className="text-xs text-ink/70">
            Co-authored by{' '}
            {coAuthors.map((c, i) => (
              <span key={c.user?.id ?? i}>
                {c.user?.name ?? 'Unknown'}
                <span className="text-moss"> ({contributionTypeLabels[c.contribution] ?? c.contribution})</span>
                {i < coAuthors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}
