import { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'
import { useEntries } from '../../lib/EntriesContext'
import { CURRENT_CONTRIBUTOR_ID } from '../../lib/currentUser'
import { findUserById } from '../../data/users'
import PrimaryButton from '../../components/shared/PrimaryButton'

export default function CollaborativeEditing() {
  const { entryId } = useParams()
  const navigate = useNavigate()
  const { getEntry, updateEntry } = useEntries()
  const entry = getEntry(entryId)
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('idle') // idle | saving | saved | submitted
  const saveTimer = useRef(null)

  if (!entry) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-sm text-ink/60">This entry could not be found.</p>
      </div>
    )
  }

  const primaryAuthor = findUserById(entry.primaryAuthor)

  function handleChange(value) {
    setNote(value)
    setStatus('saving')
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => setStatus('saved'), 600)
  }

  function handleSubmit() {
    updateEntry(entry.id, () => ({
      sections: {
        ...entry.sections,
        variants: [...entry.sections.variants, { author: CURRENT_CONTRIBUTOR_ID, note }],
      },
    }))
    setStatus('submitted')
    setTimeout(() => navigate(`/village/draft/${entry.id}`), 1000)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl">{entry.title.en}</h1>
      <p className="text-sm text-ink/60">Working with {primaryAuthor?.name}'s recording</p>

      <div className="mt-6 rounded bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/50">
          Original transcript — read only
        </p>
        {entry.audioUrl && (
          <button className="mt-2 inline-flex items-center gap-2 rounded border border-ink/20 px-3 py-1.5 text-xs hover:bg-cream">
            <Play size={14} strokeWidth={1.5} />
            Play original recording
          </button>
        )}
        <p className="mt-3 text-sm text-ink/90">{entry.sections.origin || 'Not yet documented.'}</p>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Your context notes</label>
          {status === 'saving' && <span className="text-xs text-ink/40">Saving…</span>}
          {status === 'saved' && <span className="text-xs text-moss">Saved</span>}
        </div>
        <textarea
          value={note}
          onChange={(e) => handleChange(e.target.value)}
          rows={6}
          placeholder="Add translation, regional context, or notes for the village author…"
          className="mt-2 w-full rounded border border-ink/20 bg-white p-3 text-sm"
        />
      </div>

      <div className="mt-4">
        {status === 'submitted' ? (
          <p className="text-sm text-moss">Submitted — notifying {primaryAuthor?.name}…</p>
        ) : (
          <PrimaryButton onClick={handleSubmit} disabled={!note.trim()}>
            Submit for village author review
          </PrimaryButton>
        )}
      </div>
    </div>
  )
}
