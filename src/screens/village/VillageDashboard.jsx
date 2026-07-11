import { Link } from 'react-router-dom'
import { useEntries } from '../../lib/EntriesContext'
import { CURRENT_VILLAGE_AUTHOR_ID } from '../../lib/currentUser'
import { findUserById } from '../../data/users'
import PrimaryButton from '../../components/shared/PrimaryButton'
import StatusDot from '../../components/shared/StatusDot'

const STATUS_LABEL = {
  draft: 'Draft',
  'awaiting-approval': 'Awaiting your approval',
  published: 'Published',
}

function entryLink(entry) {
  if (entry.status === 'draft') return `/village/draft/${entry.id}`
  if (entry.status === 'awaiting-approval') return `/village/publish/${entry.id}`
  return `/archive/${entry.id}`
}

export default function VillageDashboard() {
  const { entries } = useEntries()
  const me = findUserById(CURRENT_VILLAGE_AUTHOR_ID)
  const myEntries = entries.filter((e) => e.primaryAuthor === CURRENT_VILLAGE_AUTHOR_ID)
  const awaitingApproval = myEntries.filter((e) => e.status === 'awaiting-approval')

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl">Chào, {me?.name ?? 'Village Author'}</h1>

      {awaitingApproval.length > 0 && (
        <Link
          to={entryLink(awaitingApproval[0])}
          className="mt-3 inline-block rounded bg-ochre/20 px-3 py-1.5 text-xs text-ink"
        >
          {awaitingApproval.length} {awaitingApproval.length === 1 ? 'entry' : 'entries'} awaiting
          your approval
        </Link>
      )}

      <div className="mt-6">
        <PrimaryButton as={Link} to="/village/record" className="w-full py-4 text-base">
          Record a Contribution
        </PrimaryButton>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-wide text-ink/50">My Entries</h2>

        {myEntries.length === 0 ? (
          <p className="mt-3 text-sm text-ink/60">
            You haven't recorded anything yet. Start with a story about chè lam, tương, or bánh
            tẻ — whatever comes to mind first.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-ink/10 rounded bg-white">
            {myEntries.map((entry) => (
              <li key={entry.id}>
                <Link to={entryLink(entry)} className="flex items-center justify-between px-4 py-3">
                  <span>{entry.title.en}</span>
                  {entry.status === 'draft' ? (
                    <StatusDot label="Draft" />
                  ) : (
                    <span className="text-xs text-ink/60">{STATUS_LABEL[entry.status]}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
