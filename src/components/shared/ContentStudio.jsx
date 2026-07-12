import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Camera, Video, Mic, Square, X, Crop, FileText } from 'lucide-react'
import { useEntries } from '../../lib/EntriesContext'
import { useRole } from '../../lib/RoleContext'
import { currentUserForRole } from '../../lib/currentUser'
import { villageAuthors, contributors } from '../../data/users'
import AiLabel from './AiLabel'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

const ENTRY_LANGUAGE = 'Vietnamese'
const VIDEO_CAP_SECONDS = 60
const CREDITABLE_PEOPLE = [...villageAuthors, ...contributors]

const MODE_META = {
  photo: { label: 'Photo', icon: Camera },
  video: { label: 'Video', icon: Video },
  audio: { label: 'Audio', icon: Mic },
}

const UPLOAD_META = {
  photo: { label: 'Photo', icon: Camera, accept: 'image/*' },
  video: { label: 'Video', icon: Video, accept: 'video/*' },
  audio: { label: 'Audio', icon: Mic, accept: 'audio/*' },
  text: { label: 'Script / document', icon: FileText, accept: null },
}

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

function mockCaption(kind, entryTitle) {
  const subject = entryTitle ?? 'this dish'
  if (kind === 'photo') return `A close look at ${subject}, captured on site in Duong Lam.`
  if (kind === 'video') return `A short clip showing part of how ${subject} comes together.`
  if (kind === 'text') return `A written account related to ${subject}, shared for the archive.`
  return `A voice note with more detail on ${subject}.`
}

function mockTranscript() {
  return "You can hear the pan on the stove in the background — this was recorded right in the kitchen, mid-preparation, not staged afterward."
}

function mockTranslation(caption) {
  return `[EN → VI, suggested] ${caption}`
}

function splitSentences(text) {
  return (text ?? '')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function mockStructuredDraft(text) {
  const sentences = splitSentences(text)
  const third = Math.ceil(sentences.length / 3) || 1
  return {
    origin: sentences.slice(0, third).join(' ') || text,
    method: sentences.slice(third, third * 2).join(' '),
    seasonalNotes: sentences.slice(third * 2).join(' '),
    ingredients: '',
  }
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

  const [studioMode, setStudioMode] = useState('capture') // capture | upload
  const [mode, setMode] = useState(null) // capture kind: photo | video | audio
  const [uploadKind, setUploadKind] = useState(null) // photo | video | audio | text
  const [uploadFileName, setUploadFileName] = useState('')
  const [uploadText, setUploadText] = useState('')
  const [phase, setPhase] = useState('select') // select | capturing | consent | review | done
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef(null)

  const [creditPersonId, setCreditPersonId] = useState('')
  const [creditFreeText, setCreditFreeText] = useState('')
  const [consentChecked, setConsentChecked] = useState(false)

  const [dishName, setDishName] = useState('Chè lam Đường Lâm')
  const [caption, setCaption] = useState('')
  const [captionEdited, setCaptionEdited] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [transcriptEdited, setTranscriptEdited] = useState(false)
  const [translation, setTranslation] = useState('')
  const [translationEdited, setTranslationEdited] = useState(false)
  const [structuredDraft, setStructuredDraft] = useState(null)

  const [entryId, setEntryId] = useState(scopedEntryId ?? defaultEntryId ?? '')
  const [entryFilter, setEntryFilter] = useState('')
  const [createdEntry, setCreatedEntry] = useState(null)
  const [enhanceChoice, setEnhanceChoice] = useState('original')

  const effectiveKind = studioMode === 'upload' ? uploadKind : mode
  const selectedEntry = createNew ? createdEntry : entries.find((e) => e.id === entryId)
  const needsTranslation = me?.language && me.language !== ENTRY_LANGUAGE
  const creditedPersonName =
    creditPersonId
      ? CREDITABLE_PEOPLE.find((p) => p.id === creditPersonId)?.name
      : creditFreeText.trim() || null

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
    populateAiAssist(capturedMode)
  }

  function handleUploadFileChange(kind, file) {
    setUploadKind(kind)
    setUploadFileName(file?.name ?? '')
  }

  function startUploadConsent() {
    setPhase('consent')
  }

  function confirmConsent() {
    setPhase('review')
    populateAiAssist(uploadKind)
  }

  function populateAiAssist(kind) {
    const title = createNew ? dishName : selectedEntry?.title.en
    setCaption(mockCaption(kind, title))
    setCaptionEdited(false)
    if (kind === 'audio' || kind === 'video') {
      setTranscript(mockTranscript())
      setTranscriptEdited(false)
    }
    if (kind === 'text') {
      setStructuredDraft(mockStructuredDraft(uploadText))
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

  function handleStructuredChange(field, value) {
    setStructuredDraft((prev) => ({ ...prev, [field]: value }))
  }

  function handleConfirm() {
    const source =
      studioMode === 'upload'
        ? { type: 'uploaded', creditedTo: creditedPersonName, consentConfirmed: consentChecked }
        : { type: 'captured', creditedTo: me?.name ?? null, consentConfirmed: true }

    if (createNew) {
      const draft = addDraftEntry({
        title: { vi: dishName, en: dishName, zh: '' },
        dishSlug: 'che-lam',
        primaryAuthor: primaryAuthorId ?? me?.id,
        origin:
          effectiveKind === 'text' && structuredDraft
            ? structuredDraft.origin
            : effectiveKind === 'photo'
              ? caption
              : transcript || caption,
        ingredients: effectiveKind === 'text' && structuredDraft ? structuredDraft.ingredients : '',
        method: effectiveKind === 'text' && structuredDraft ? structuredDraft.method : '',
        seasonalNotes:
          effectiveKind === 'text' && structuredDraft ? structuredDraft.seasonalNotes : '',
        aiTranscribed: effectiveKind !== 'photo',
        source,
      })
      setCreatedEntry(draft)
      setPhase('done')
      onComplete?.({ mode: effectiveKind, caption, transcript, translation, entryId: draft.id })
      return
    }

    if (!entryId) return
    const target = entries.find((e) => e.id === entryId)
    if (target) {
      const useStructuredSections =
        effectiveKind === 'text' && structuredDraft && target.status === 'draft'

      if (useStructuredSections) {
        updateEntry(entryId, (entry) => ({
          sections: {
            ...entry.sections,
            origin: structuredDraft.origin || entry.sections.origin,
            method: structuredDraft.method || entry.sections.method,
            seasonalNotes: structuredDraft.seasonalNotes || entry.sections.seasonalNotes,
            variants: [
              ...entry.sections.variants,
              { author: creditPersonId || me?.id, note: `${caption} (uploaded document).`, source },
            ],
          },
        }))
      } else {
        const noteParts = [caption]
        if (effectiveKind !== 'photo' && transcript) noteParts.push(`Transcript: ${transcript}`)
        if (effectiveKind === 'text' && structuredDraft) {
          noteParts.push(`Suggested origin: ${structuredDraft.origin}`)
        }
        updateEntry(entryId, (entry) => ({
          sections: {
            ...entry.sections,
            variants: [
              ...entry.sections.variants,
              {
                author: creditPersonId || me?.id,
                note: `${noteParts.join(' — ')} (${studioMode === 'upload' ? 'uploaded' : 'captured'} via ${effectiveKind}).`,
                source,
              },
            ],
          },
        }))
      }
    }
    setPhase('done')
    onComplete?.({ mode: effectiveKind, caption, transcript, translation, entryId })
  }

  function reset() {
    setStudioMode('capture')
    setMode(null)
    setUploadKind(null)
    setUploadFileName('')
    setUploadText('')
    setPhase('select')
    setSeconds(0)
    setCreditPersonId('')
    setCreditFreeText('')
    setConsentChecked(false)
    setCaption('')
    setCaptionEdited(false)
    setTranscript('')
    setTranscriptEdited(false)
    setTranslation('')
    setTranslationEdited(false)
    setStructuredDraft(null)
    setEnhanceChoice('original')
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

          <div className="flex gap-1 rounded bg-white p-1">
            <button
              onClick={() => setStudioMode('capture')}
              className={clsx(
                'flex-1 rounded py-1.5 text-sm',
                studioMode === 'capture' ? 'bg-terracotta text-white' : 'text-ink/60'
              )}
            >
              Capture
            </button>
            <button
              onClick={() => setStudioMode('upload')}
              className={clsx(
                'flex-1 rounded py-1.5 text-sm',
                studioMode === 'upload' ? 'bg-terracotta text-white' : 'text-ink/60'
              )}
            >
              Upload
            </button>
          </div>

          {studioMode === 'capture' && (
            <>
              <p className="mt-4 text-sm text-ink/70">
                Choose how you'd like to capture this contribution.
              </p>
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
            </>
          )}

          {studioMode === 'upload' && (
            <div className="mt-4">
              <p className="text-sm text-ink/70">
                Already have something? Upload it — an old recording, a photo, or something
                written down.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {Object.entries(UPLOAD_META).map(([kind, meta]) => {
                  const cardClass = clsx(
                    'flex cursor-pointer flex-col items-center gap-2 rounded border py-5 text-sm',
                    uploadKind === kind
                      ? 'border-terracotta bg-white'
                      : 'border-ink/20 bg-white hover:border-terracotta'
                  )
                  if (!meta.accept) {
                    return (
                      <button key={kind} type="button" onClick={() => setUploadKind(kind)} className={cardClass}>
                        <meta.icon size={22} strokeWidth={1.5} />
                        {meta.label}
                      </button>
                    )
                  }
                  return (
                    <label key={kind} className={cardClass}>
                      <meta.icon size={22} strokeWidth={1.5} />
                      {meta.label}
                      <input
                        type="file"
                        accept={meta.accept}
                        className="hidden"
                        onChange={(e) => handleUploadFileChange(kind, e.target.files?.[0])}
                      />
                    </label>
                  )
                })}
              </div>

              {uploadKind && uploadKind !== 'text' && (
                <p className="mt-3 text-xs text-ink/60">
                  Selected: {uploadFileName || `${UPLOAD_META[uploadKind].label} file`}
                </p>
              )}

              {uploadKind === 'text' && (
                <div className="mt-3">
                  <textarea
                    value={uploadText}
                    onChange={(e) => setUploadText(e.target.value)}
                    rows={6}
                    placeholder="Paste or type the account here…"
                    className="w-full rounded border border-ink/20 bg-white p-3 text-sm"
                  />
                </div>
              )}

              <div className="mt-4">
                <PrimaryButton
                  onClick={startUploadConsent}
                  disabled={!uploadKind || (uploadKind === 'text' ? !uploadText.trim() : !uploadFileName)}
                >
                  Continue
                </PrimaryButton>
              </div>
            </div>
          )}
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

      {phase === 'consent' && (
        <div className="mt-6 space-y-4">
          <div className="rounded bg-ochre/15 px-4 py-2 text-sm text-ink">
            Before this goes any further: whose knowledge is this, and did they agree to share it?
          </div>

          <div>
            <label className="text-sm font-medium">Whose knowledge or story is this?</label>
            <select
              value={creditPersonId}
              onChange={(e) => {
                setCreditPersonId(e.target.value)
                if (e.target.value) setCreditFreeText('')
              }}
              className="mt-2 w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm"
            >
              <option value="">Choose from the Commons Directory…</option>
              {CREDITABLE_PEOPLE.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-ink/50">Not yet in the system?</p>
            <input
              value={creditFreeText}
              onChange={(e) => {
                setCreditFreeText(e.target.value)
                if (e.target.value) setCreditPersonId('')
              }}
              placeholder="e.g. my grandmother, not yet on LA"
              className="mt-1 w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm"
            />
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              I have the right to share this, and the person named above should be credited.
            </span>
          </label>

          <div className="flex gap-3 border-t border-ink/10 pt-4">
            <SecondaryButton onClick={() => setPhase('select')}>Back</SecondaryButton>
            <PrimaryButton onClick={confirmConsent} disabled={!consentChecked || !creditedPersonName}>
              Continue
            </PrimaryButton>
          </div>
        </div>
      )}

      {phase === 'review' && (
        <div className="mt-6 space-y-6">
          {studioMode === 'upload' && (
            <div className="rounded bg-moss/10 px-4 py-2 text-xs text-moss">
              Credited to {creditedPersonName} · consent confirmed
            </div>
          )}

          <div className="rounded bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-ink/50">
              {studioMode === 'upload' ? `${UPLOAD_META[effectiveKind].label} uploaded` : `${MODE_META[effectiveKind].label} captured`}
            </p>
            {effectiveKind === 'text' ? (
              <p className="mt-2 max-h-32 overflow-y-auto text-sm text-ink/80">{uploadText}</p>
            ) : (
              <div className="mt-2 flex aspect-video items-center justify-center rounded bg-ink/10 text-ink/30">
                {(() => {
                  const Icon =
                    studioMode === 'upload' ? UPLOAD_META[effectiveKind].icon : MODE_META[effectiveKind].icon
                  return <Icon size={32} strokeWidth={1.2} />
                })()}
              </div>
            )}
          </div>

          {effectiveKind === 'photo' && studioMode === 'capture' && (
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Enhance (optional)</label>
                <AiLabel>AI-suggested crop &amp; color</AiLabel>
              </div>
              <p className="mt-1 text-xs text-ink/50">
                Crop and color adjustment only — your photo's content is never altered or
                regenerated. Keeping the original is the default.
              </p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setEnhanceChoice('original')}
                  className={clsx(
                    'rounded border-2 p-3 text-left',
                    enhanceChoice === 'original' ? 'border-terracotta' : 'border-transparent bg-white'
                  )}
                >
                  <div className="flex aspect-video items-center justify-center rounded bg-ink/10 text-ink/30">
                    <Camera size={24} strokeWidth={1.2} />
                  </div>
                  <p className="mt-2 text-xs font-medium">Original</p>
                </button>
                <button
                  onClick={() => setEnhanceChoice('enhanced')}
                  className={clsx(
                    'rounded border-2 p-3 text-left',
                    enhanceChoice === 'enhanced' ? 'border-terracotta' : 'border-transparent bg-white'
                  )}
                >
                  <div className="flex aspect-video items-center justify-center rounded bg-ochre/10 text-ink/30">
                    <Crop size={24} strokeWidth={1.2} />
                  </div>
                  <p className="mt-2 text-xs font-medium">Suggested crop &amp; color</p>
                </button>
              </div>
              <p className="mt-1.5 text-xs text-moss">
                Using: {enhanceChoice === 'original' ? 'Original photo' : 'Suggested enhancement'}
              </p>
            </div>
          )}

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
            <Link to="/ai-transparency" className="mt-1.5 inline-block text-xs text-terracotta">
              How AI helps here →
            </Link>
          </div>

          {(effectiveKind === 'audio' || effectiveKind === 'video') && (
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

          {effectiveKind === 'text' && structuredDraft && (
            <div className="rounded border border-moss/30 p-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Structure this into an entry</label>
                <AiLabel>AI-formatted from your text</AiLabel>
              </div>
              <p className="mt-1 text-xs text-ink/50">
                A suggested mapping of what you wrote into entry sections. Nothing here is
                invented — edit freely before it's used.
              </p>

              <label className="mt-3 block text-xs font-medium uppercase tracking-wide text-ink/50">
                Origin story
              </label>
              <textarea
                value={structuredDraft.origin}
                onChange={(e) => handleStructuredChange('origin', e.target.value)}
                rows={2}
                className="mt-1 w-full rounded border border-ink/20 bg-white p-2 text-sm"
              />

              <label className="mt-3 block text-xs font-medium uppercase tracking-wide text-ink/50">
                Ingredients
              </label>
              <textarea
                value={structuredDraft.ingredients}
                onChange={(e) => handleStructuredChange('ingredients', e.target.value)}
                rows={1}
                placeholder="Not detected in the uploaded text — add if relevant."
                className="mt-1 w-full rounded border border-ink/20 bg-white p-2 text-sm"
              />

              <label className="mt-3 block text-xs font-medium uppercase tracking-wide text-ink/50">
                Method
              </label>
              <textarea
                value={structuredDraft.method}
                onChange={(e) => handleStructuredChange('method', e.target.value)}
                rows={2}
                className="mt-1 w-full rounded border border-ink/20 bg-white p-2 text-sm"
              />

              <label className="mt-3 block text-xs font-medium uppercase tracking-wide text-ink/50">
                Seasonal notes
              </label>
              <textarea
                value={structuredDraft.seasonalNotes}
                onChange={(e) => handleStructuredChange('seasonalNotes', e.target.value)}
                rows={2}
                className="mt-1 w-full rounded border border-ink/20 bg-white p-2 text-sm"
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
