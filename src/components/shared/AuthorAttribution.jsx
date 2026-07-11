import { findUserById } from '../../data/users'
import { contributionTypeLabels } from '../../lib/tokens'

export default function AuthorAttribution({ entry, className }) {
  const primaryAuthor = findUserById(entry.primaryAuthor)
  const coAuthors = entry.coAuthors.map((c) => ({
    user: findUserById(c.id),
    contribution: c.contribution,
  }))

  return (
    <div className={className}>
      <p className="text-sm text-ink">
        Authored by{' '}
        <span className="font-medium">{primaryAuthor?.name ?? 'Unknown'}</span>
      </p>
      {coAuthors.length > 0 && (
        <p className="mt-0.5 text-xs text-ink/70">
          Co-authored by{' '}
          {coAuthors.map((c, i) => (
            <span key={c.user?.id ?? i}>
              {c.user?.name ?? 'Unknown'}
              <span className="text-moss"> ({contributionTypeLabels[c.contribution] ?? c.contribution})</span>
              {i < coAuthors.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      )}
    </div>
  )
}
