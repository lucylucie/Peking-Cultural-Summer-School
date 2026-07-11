import { useState } from 'react'
import clsx from 'clsx'
import { useEntries } from '../../lib/EntriesContext'
import { findUserById } from '../../data/users'
import PrimaryButton from '../../components/shared/PrimaryButton'
import DishIllustration from '../../components/shared/DishIllustration'

const FORMATS = [
  { id: 'video', label: 'Short video card' },
  { id: 'image', label: 'Illustrated image card' },
  { id: 'quote', label: 'Quote card' },
]

const PLATFORMS = ['TikTok', 'Xiaohongshu', 'Instagram', 'Facebook']

export default function DerivativeGenerator() {
  const { publishedEntries } = useEntries()
  const [entryId, setEntryId] = useState('')
  const [format, setFormat] = useState(null)
  const [exportedTo, setExportedTo] = useState(null)

  const entry = publishedEntries.find((e) => e.id === entryId)

  function handleEntryChange(id) {
    setEntryId(id)
    setFormat(null)
    setExportedTo(null)
  }

  function handleFormatChange(id) {
    setFormat(id)
    setExportedTo(null)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl">Derivative Generator</h1>
      <p className="mt-1 text-sm text-ink/60">
        Turn an archive entry into short-form content for external platforms — the canonical
        record stays in the archive.
      </p>

      <div className="mt-6">
        <label className="text-sm font-medium">Select an archive entry</label>
        <select
          value={entryId}
          onChange={(e) => handleEntryChange(e.target.value)}
          className="mt-2 w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm"
        >
          <option value="">Choose an entry…</option>
          {publishedEntries.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title.en}
            </option>
          ))}
        </select>
      </div>

      {!entry && (
        <p className="mt-8 text-sm text-ink/50">Select an entry to begin.</p>
      )}

      {entry && (
        <>
          <div className="mt-6">
            <label className="text-sm font-medium">Choose a format</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFormatChange(f.id)}
                  className={clsx(
                    'rounded border px-3 py-1.5 text-sm',
                    format === f.id
                      ? 'border-terracotta bg-terracotta text-white'
                      : 'border-ink/20 text-ink/70 hover:bg-white'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {format && (
            <div className="mt-6">
              <p className="text-sm font-medium">Preview</p>
              <div className="mt-2 rounded bg-white p-5">
                <p className="mb-2 text-xs uppercase tracking-wide text-ink/40">
                  {FORMATS.find((f) => f.id === format)?.label}
                </p>
                <DishIllustration
                  dishSlug={entry.dishSlug}
                  className={clsx('rounded', format === 'quote' ? 'aspect-[4/5]' : 'aspect-[9/16] max-w-[220px]')}
                />
                {format === 'quote' ? (
                  <p className="mt-4 font-serif text-lg italic">"{entry.sections.origin}"</p>
                ) : (
                  <p className="mt-4 font-serif text-lg">{entry.title.en}</p>
                )}
                <p className="mt-1 text-xs text-ink/60">
                  {entry.title.vi} — {findUserById(entry.primaryAuthor)?.name}
                </p>
                <p className="mt-3 text-xs text-terracotta">
                  Read the full entry in the Duong Lam Food Archive →
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium">Export to</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PLATFORMS.map((p) => (
                    <PrimaryButton key={p} onClick={() => setExportedTo(p)} className="text-sm">
                      {p}
                    </PrimaryButton>
                  ))}
                </div>
                {exportedTo && (
                  <p className="mt-3 text-sm text-moss">Exported to {exportedTo} (mock).</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
