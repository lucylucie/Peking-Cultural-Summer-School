import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getScaffoldById } from '../../data/scaffolds'
import { findUserById } from '../../data/users'
import { useEntries } from '../../lib/EntriesContext'
import { CURRENT_CONTRIBUTOR_ID } from '../../lib/currentUser'
import { scaffoldCommentTypeLabels, scaffoldTagLabels } from '../../lib/tokens'
import PrimaryButton from '../../components/shared/PrimaryButton'
import PersonAvatar from '../../components/shared/PersonAvatar'

export default function ScaffoldThreadView() {
  const { scaffoldId } = useParams()
  const scaffold = getScaffoldById(scaffoldId)
  const { getEntry } = useEntries()
  const [comments, setComments] = useState(scaffold?.comments ?? [])
  const [draft, setDraft] = useState('')
  const [flagged, setFlagged] = useState({})

  if (!scaffold) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-sm text-ink/60">This scaffold could not be found.</p>
      </div>
    )
  }

  const graduatedEntry = scaffold.graduatedTo ? getEntry(scaffold.graduatedTo) : null

  function handlePost() {
    if (!draft.trim()) return
    setComments((prev) => [
      ...prev,
      {
        id: `local-${prev.length}`,
        authorId: CURRENT_CONTRIBUTOR_ID,
        type: 'family-memory',
        text: draft,
        createdAt: new Date().toISOString().slice(0, 10),
      },
    ])
    setDraft('')
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {graduatedEntry && (
        <Link
          to={`/archive/${graduatedEntry.id}`}
          className="mb-6 block rounded bg-ochre/15 px-4 py-2 text-sm text-ink"
        >
          This thread has graduated into a structured entry — view "{graduatedEntry.title.en}" in
          the Archive →
        </Link>
      )}

      <div className="rounded bg-white p-5">
        <h1 className="font-serif text-xl">{scaffold.prompt}</h1>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {scaffold.tags.map((t) => (
            <span key={t} className="rounded bg-moss/10 px-2 py-0.5 text-xs text-moss">
              {scaffoldTagLabels[t] ?? t}
            </span>
          ))}
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {comments.map((c) => {
          const author = findUserById(c.authorId)
          return (
            <li key={c.id} className="rounded bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PersonAvatar userId={c.authorId} size={28} />
                  <p className="text-sm font-medium">{author?.name ?? 'Unknown'}</p>
                </div>
                <span className="text-xs text-moss">
                  {scaffoldCommentTypeLabels[c.type] ?? c.type}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-ink/90">{c.text}</p>
              <button
                onClick={() => setFlagged((prev) => ({ ...prev, [c.id]: !prev[c.id] }))}
                className="mt-2 text-xs text-terracotta"
              >
                {flagged[c.id] ? 'Flagged for archive entry ✓' : 'Suggest this becomes an archive entry'}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-6">
        <label className="text-sm font-medium">Add your contribution</label>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded border border-ink/20 bg-white p-3 text-sm"
        />
        <div className="mt-2">
          <PrimaryButton onClick={handlePost} disabled={!draft.trim()}>
            Post
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
