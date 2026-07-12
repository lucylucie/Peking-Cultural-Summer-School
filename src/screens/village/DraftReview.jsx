import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { useEntries } from '../../lib/EntriesContext'
import PrimaryButton from '../../components/shared/PrimaryButton'
import SecondaryButton from '../../components/shared/SecondaryButton'
import AiLabel from '../../components/shared/AiLabel'
import DishIllustration from '../../components/shared/DishIllustration'

export default function DraftReview() {
  const { entryId } = useParams()
  const navigate = useNavigate()
  const { getEntry, updateEntry } = useEntries()
  const entry = getEntry(entryId)
  const [text, setText] = useState(entry?.sections.origin ?? '')

  if (!entry) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-sm text-ink/60">This draft could not be found.</p>
      </div>
    )
  }

  const edited = entry.meta?.edited

  function handleChange(value) {
    setText(value)
    updateEntry(entry.id, () => ({
      sections: { ...entry.sections, origin: value },
      meta: { ...entry.meta, edited: value !== entry.sections.origin || entry.meta?.edited },
    }))
  }

  function handleContinue() {
    navigate(`/village/invite/${entry.id}`)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded bg-ochre/15 px-4 py-2 text-sm text-ink">
        This is a draft — nothing is public yet.
      </div>

      <DishIllustration dishSlug={entry.dishSlug} className="mt-4 aspect-[16/9] w-full rounded" />
      <h1 className="mt-4 text-2xl">{entry.title.en}</h1>

      {entry.audioUrl && (
        <button className="mt-3 inline-flex items-center gap-2 rounded border border-ink/20 px-4 py-2 text-sm hover:bg-white">
          <Play size={16} strokeWidth={1.5} />
          Play original recording
        </button>
      )}

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wide text-ink/50">
            Transcribed text
          </h2>
          {entry.meta?.aiTranscribed && !edited && <AiLabel>AI-transcribed</AiLabel>}
          {edited && <span className="text-xs text-moss">Edited</span>}
        </div>
        <textarea
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          rows={8}
          className="mt-2 w-full rounded border border-ink/20 bg-white p-3 text-sm"
        />
      </div>

      <div className="mt-6 flex gap-3">
        <SecondaryButton as={Link} to="/village/record">
          Re-record
        </SecondaryButton>
        <PrimaryButton onClick={handleContinue}>Looks good, invite a co-author</PrimaryButton>
      </div>
    </div>
  )
}
