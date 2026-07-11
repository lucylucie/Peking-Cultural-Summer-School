import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { Camera, Video, Mic, Square, X } from 'lucide-react'
import { useEntries } from '../../lib/EntriesContext'
import { useRole } from '../../lib/RoleContext'
import { currentUserForRole } from '../../lib/currentUser'
import AiLabel from './AiLabel'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

const ENTRY_LANGUAGE = 'Vietnamese'
const VIDEO_CAP_SECONDS = 60

const MODE_META = {
  photo: { label: 'Photo', icon: Camera },
  video: { label: 'Video', icon: Video },
  audio: { label: 'Audio', icon: Mic },
}

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

function mockCaption(mode, entryTitle) {
  const subject = entryTitle ?? 'this dish'
  if (mode === 'photo') return `A close look at ${subject}, captured on site in Duong Lam.`
  if (mode === 'video') return `A short clip showing part of how ${subject} comes together.`
  return `A voice note with more detail on ${subject}.`
}

function mockTranscript() {
  return "You can hear the pan on the stove in the background — this was recorded right in the kitchen, mid-preparation, not staged afterward."
}

function mockTranslation(caption) {
  return `[EN → VI, suggested] ${caption}`
}

export default function ContentStudio({
  allowedModes = ['photo', 'video', 'audio'],
  scopedEntryId = null,
  defaultEntryId = null,
  scopedLabel = null,
  createNew = false,
  primaryAuthorId = null,
  onClose = null,
  onComplete = null,
}) {
  const { entries, updateEntry, addDraftEntry } = useEntries()
  const { role } = useRole()
  const me = currentUserForRole(role)

  const [mode, setMode] = useState(null)
  const [phase, setPhase] = useState('select') // select | capturing | review | done
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef(null)

  const [dishName, setDishName] = useState('Chè lam Đường Lâm')
  const [caption, setCaption] = useState('')
  const [captionEdited, setCaptionEdited] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [transcriptEdited, setTranscriptEdited] = useState(false)
  const [translation, setTranslation] = useState('')
  const [translationEdited, setTranslationEdited] = useState(false)

  const [entryId, setEntryId] = useState(scopedEntryId ?? defaultEntryId ?? '')
  const [entryFilter, setEntryFilter] = useState('')
  const [createdEntry, setCreatedEntry] = useState(null)

  const selectedEntry = createNew ? createdEntry : entries.find((e) => e.id === entryId)
  const needsTranslation = me?.language && me.language !== ENTRY_LANGUAGE

  useEffect(() => {
    if (phase === 'capturing' && mode !== 'photo') {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          const next = s + 1
          if (mode === 'video' && next >= VIDEO_CAP_SECONDS) {
            clearInterval(intervalRef.current)
            finishCapture()
            return VIDEO_CAP_SECONDS
          }
          return next
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, mode])

  function startCapture(selectedMode) {
    setMode(selectedMode)
    setSeconds(0)
    if (selectedMode === 'photo') {
      finishCapture(selectedMode)
    } else {
      setPhase('capturing')
    }
  }

  function finishCapture(capturedMode = mode) {
    setPhase('review')
    const title = createNew ? dishName : selectedEntry?.title.en
    setCaption(mockCaption(capturedMode, title))
    setCaptionEdited(false)
    if (capturedMode !== 'photo') {
      setTranscript(mockTranscript())
      setTranscriptEdited(false)
    }
  }

  useEffect(() => {
    if (phase === 'review' && needsTranslation && caption) {
      setTranslation(mockTranslation(caption))
      setTranslationEdited(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  function handleCaptionChange(value) {
    setCaption(value)
    setCaptionEdited(true)
  }

  function handleTranscriptChange(value) {
    setTranscript(value)
    setTranscriptEdited(true)
  }

  function handleTranslationChange(value) {
    setTranslation(value)
    setTranslationEdited(true)
  }

  function handleConfirm() {
    if (createNew) {
      const draft = addDraftEntry({
        title: { vi: dishName, en: dishName, zh: '' },
        dishSlug: 'che-lam',
        primaryAuthor: primaryAuthorId ?? me?.id,
        origin: mode === 'photo' ? caption : transcript || caption,
        aiTranscribed: mode !== 'photo',
      })
      setCreatedEntry(draft)
      setPhase('done')
      onComplete?.({ mode, caption, transcript, translation, entryId: draft.id })
      return
    }

    if (!entryId) return
    const target = entries.find((e) => e.id === entryId)
    if (target) {
      const noteParts = [caption]
      if (mode !== 'photo' && transcript) noteParts.push(`Transcript: ${transcript}`)
      updateEntry(entryId, (entry) => ({
        sections: {
          ...entry.sections,
          variants: [
            ...entry.sections.variants,
            { author: me?.id, note: `${noteParts.join(' — ')} (captured via ${mode}).` },
          ],
        },
      }))
    }
    setPhase('done')
    onComplete?.({ mode, caption, transcript, translation, entryId })
  }

  function reset() {
    setMode(null)
    setPhase('select')
    setSeconds(0)
    setCaption('')
    setCaptionEdited(false)
    setTranscript('')
    setTranscriptEdited(false)
    setTranslation('')
    setTranslationEdited(false)
  }

  const filteredEntries = entries.filter((e) =>
    e.title.en.toLowerCase().includes(entryFilter.toLowerCase())
  )

  const body = (
    <div className="mx-auto max-w-xl px-4 py-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl">Content Studio</h2>
          {scopedLabel && <p className="mt-0.5 text-sm text-ink/60">For: {scopedLabel}</p>}
        </div>
        {onClose && (
          <button onClick={onClose} className="rounded p-1 text-ink/50 hover:bg-white" aria-label="Close">
            <X size={20} />
          </button>
        )}
      </div>

      {phase === 'select' && (
        <div className="mt-6">
          {createNew && (
            <div className="mb-6">
              <label className="text-xs font-medium uppercase tracking-wide text-ink/50">
                What are you sharing today?
              </label>
              <input
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                className="mt-1 w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm"
              />
              <div className="mt-3 space-y-1 text-sm text-ink/60">
                <p>What's the story behind this dish?</p>
                <p>What makes your version different?</p>
              </div>
            </div>
          )}
          <p className="text-sm text-ink/70">Choose how you'd like to capture this contribution.</p>
          <div className="mt-4 flex gap-3">
            {allowedModes.map((m) => {
              const { label, icon: Icon } = MODE_META[m]
              return (
                <button
                  key={m}
                  onClick={() => startCapture(m)}
                  className="flex flex-1 flex-col items-center gap-2 rounded border border-ink/20 bg-white py-6 text-sm hover:border-terracotta"
                >
                  <Icon size={24} strokeWidth={1.5} />
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {phase === 'capturing' && (
        <div className="mt-10 flex flex-col items-center">
          <button
            onClick={() => finishCapture()}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-terracotta text-white"
          >
            <Square size={26} />
          </button>
          <p className="mt-4 text-sm text-ink/60">
            {mode === 'video' ? `Recording — ${formatTime(seconds)} / ${formatTime(VIDEO_CAP_SECONDS)}` : `Recording — ${formatTime(seconds)}`}
          </p>
          {mode === 'video' && (
            <div className="mt-2 h-1 w-48 overflow-hidden rounded bg-ink/10">
              <div
                className="h-full bg-terracotta"
                style={{ width: `${Math.min(100, (seconds / VIDEO_CAP_SECONDS) * 100)}%` }}
              />
            </div>
          )}
          <p className="mt-3 text-xs text-ink/40">Tap to stop</p>
        </div>
      )}

      {phase === 'review' && (
        <div className="mt-6 space-y-6">
          <div className="rounded bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-ink/50">
              {MODE_META[mode].label} captured
            </p>
            <div className="mt-2 flex aspect-video items-center justify-center rounded bg-ink/10 text-ink/30">
              {(() => {
                const Icon = MODE_META[mode].icon
                return <Icon size={32} strokeWidth={1.2} />
              })()}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Caption</label>
              {captionEdited ? <span className="text-xs text-moss">Edited</span> : <AiLabel>AI-suggested caption</AiLabel>}
            </div>
            <textarea
              value={caption}
              onChange={(e) => handleCaptionChange(e.target.value)}
              rows={2}
              className="mt-2 w-full rounded border border-ink/20 bg-white p-3 text-sm"
            />
          </div>

          {mode !== 'photo' && (
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Transcription</label>
                {transcriptEdited ? <span className="text-xs text-moss">Edited</span> : <AiLabel>AI-transcribed</AiLabel>}
              </div>
              <textarea
                value={transcript}
                onChange={(e) => handleTranscriptChange(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded border border-ink/20 bg-white p-3 text-sm"
              />
            </div>
          )}

          {needsTranslation && (
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Suggested translation ({ENTRY_LANGUAGE})
                </label>
                {translationEdited ? <span className="text-xs text-moss">Edited</span> : <AiLabel>AI-translated</AiLabel>}
              </div>
              <p className="mt-1 text-xs text-ink/50">
                Your profile language is {me.language} — this entry is primarily documented in{' '}
                {ENTRY_LANGUAGE}.
              </p>
              <textarea
                value={translation}
                onChange={(e) => handleTranslationChange(e.target.value)}
                rows={2}
                className="mt-2 w-full rounded border border-ink/20 bg-white p-3 text-sm"
              />
            </div>
          )}

          {!createNew && (
            <div>
              <label className="text-sm font-medium">Which archive entry is this for?</label>
              {scopedEntryId ? (
                <p className="mt-2 rounded border border-ink/20 bg-white px-3 py-2 text-sm">
                  {selectedEntry?.title.en}
                </p>
              ) : (
                <>
                  <input
                    value={entryFilter}
                    onChange={(e) => setEntryFilter(e.target.value)}
                    placeholder="Search entries…"
                    className="mt-2 w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm"
                  />
                  <div className="mt-2 max-h-40 space-y-1 overflow-y-auto">
                    {filteredEntries.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => setEntryId(e.id)}
                        className={clsx(
                          'block w-full rounded border px-3 py-1.5 text-left text-sm',
                          entryId === e.id ? 'border-terracotta bg-white' : 'border-ink/10 bg-white/60'
                        )}
                      >
                        {e.title.en}
                      </button>
                    ))}
                    {filteredEntries.length === 0 && (
                      <p className="text-xs text-ink/50">
                        No matching entries — not every capture ties to an open scaffold yet.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex gap-3 border-t border-ink/10 pt-4">
            <SecondaryButton onClick={reset}>Discard &amp; retake</SecondaryButton>
            <PrimaryButton
              onClick={handleConfirm}
              disabled={(!createNew && !entryId) || !caption.trim()}
            >
              {createNew ? 'Create draft entry' : 'Attach to entry'}
            </PrimaryButton>
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div className="mt-10 text-center">
          <p className="text-sm text-moss">
            {createNew
              ? `Draft created for ${selectedEntry?.title.en}. A human reviewed and approved everything the AI suggested before this was saved.`
              : `Attached to ${selectedEntry?.title.en}. A human reviewed and approved everything the AI suggested before this was added.`}
          </p>
          {onClose && (
            <SecondaryButton onClick={onClose} className="mt-4">
              Close
            </SecondaryButton>
          )}
        </div>
      )}
    </div>
  )

  if (!onClose) return body

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 py-8">
      <div className="w-full max-w-xl rounded bg-cream shadow-sm">{body}</div>
    </div>
  )
}
