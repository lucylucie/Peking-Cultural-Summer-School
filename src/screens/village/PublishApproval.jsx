import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEntries } from '../../lib/EntriesContext'
import { findUserById } from '../../data/users'
import { contributionTypeLabels } from '../../lib/tokens'
import AuthorAttribution from '../../components/shared/AuthorAttribution'
import EntrySections from '../../components/shared/EntrySections'
import PrimaryButton from '../../components/shared/PrimaryButton'
import SecondaryButton from '../../components/shared/SecondaryButton'

export default function PublishApproval() {
  const { entryId } = useParams()
  const navigate = useNavigate()
  const { getEntry, updateEntry } = useEntries()
  const entry = getEntry(entryId)
  const [requestingChanges, setRequestingChanges] = useState(false)
  const [comment, setComment] = useState('')

  if (!entry) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-sm text-ink/60">This entry could not be found.</p>
      </div>
    )
  }

  const primaryAuthor = findUserById(entry.primaryAuthor)

  function handleApprove() {
    updateEntry(entry.id, () => ({
      status: 'published',
      createdAt: new Date().toISOString().slice(0, 10),
    }))
    navigate(`/archive/${entry.id}`)
  }

  function handleRequestChanges() {
    updateEntry(entry.id, () => ({
      status: 'draft',
      meta: { ...entry.meta, changeRequestNote: comment },
    }))
    navigate(`/village/draft/${entry.id}`)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded bg-ochre/15 px-4 py-2 text-sm text-ink">
        Pending your review — this is exactly how the entry will appear once published.
      </div>

      <h1 className="mt-6 text-3xl">{entry.title.en}</h1>
      <p className="mt-1 text-lg text-ink/70">{entry.title.vi}</p>

      <div className="mt-4">
        <p className="text-sm font-medium">
          Primary author: <span className="font-normal">{primaryAuthor?.name}</span>
        </p>
        {entry.coAuthors.length > 0 && (
          <div className="mt-2 rounded bg-moss/10 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-moss">
              Co-author contributions
            </p>
            <ul className="mt-1 space-y-0.5 text-sm">
              {entry.coAuthors.map((c) => {
                const user = findUserById(c.id)
                return (
                  <li key={c.id}>
                    {user?.name} — {contributionTypeLabels[c.contribution] ?? c.contribution}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      <AuthorAttribution entry={entry} className="mt-4" />
      <EntrySections entry={entry} />

      {requestingChanges ? (
        <div className="mt-6 border-t border-ink/10 pt-6">
          <label className="text-sm font-medium">What needs to change?</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="mt-2 w-full rounded border border-ink/20 bg-white p-3 text-sm"
          />
          <div className="mt-3 flex gap-3">
            <SecondaryButton onClick={() => setRequestingChanges(false)}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleRequestChanges} disabled={!comment.trim()}>
              Send back for changes
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div className="mt-8 flex gap-3 border-t border-ink/10 pt-6">
          <SecondaryButton onClick={() => setRequestingChanges(true)}>
            Request changes
          </SecondaryButton>
          <PrimaryButton onClick={handleApprove}>I approve this for publication</PrimaryButton>
        </div>
      )}
    </div>
  )
}
