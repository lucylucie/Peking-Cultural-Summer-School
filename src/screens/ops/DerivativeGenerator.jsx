import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useEntries } from '../../lib/EntriesContext'
import { findUserById } from '../../data/users'
import PrimaryButton from '../../components/shared/PrimaryButton'
import DishIllustration from '../../components/shared/DishIllustration'
import AiLabel from '../../components/shared/AiLabel'

const FORMATS = [
  { id: 'video', label: 'Short video card' },
  { id: 'image', label: 'Illustrated image card' },
  { id: 'quote', label: 'Quote card' },
  { id: 'infographic', label: 'Infographic' },
]

const PLATFORMS = ['TikTok', 'Xiaohongshu', 'Instagram', 'Facebook']

const INFOGRAPHIC_TYPES = [
  { id: 'ingredients-method', label: 'Ingredients & Method' },
  { id: 'variants-compared', label: 'Variants Compared', requiresMultipleVariants: true },
]

function splitIngredients(text) {
  return (text ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function splitSteps(text) {
  return (text ?? '')
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function IngredientsMethodInfographic({ entry }) {
  const ingredients = splitIngredients(entry.sections.ingredients)
  const steps = splitSteps(entry.sections.method)

  return (
    <div className="rounded border border-ink/10 bg-white p-5">
      <p className="font-serif text-xl">{entry.title.en}</p>
      <p className="text-sm text-ink/60">{entry.title.vi}</p>
      <div className="mt-3 h-px bg-ochre/40" />

      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink/50">Ingredients</p>
      {ingredients.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-2">
          {ingredients.map((item) => (
            <li key={item} className="rounded-full bg-ochre/15 px-3 py-1 text-sm text-ink">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-ochre">Not yet documented.</p>
      )}

      <p className="mt-5 text-xs font-medium uppercase tracking-wide text-ink/50">Method</p>
      {steps.length > 0 ? (
        <ol className="mt-2 space-y-2">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terracotta text-xs text-white">
                {i + 1}
              </span>
              <span className="text-ink/90">{step}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-2 text-sm text-ochre">Not yet documented.</p>
      )}
    </div>
  )
}

function VariantsComparedInfographic({ entry }) {
  const variants = entry.sections.variants ?? []

  return (
    <div className="rounded border border-ink/10 bg-white p-5">
      <p className="font-serif text-xl">{entry.title.en}</p>
      <p className="text-sm text-ink/60">Variants compared</p>
      <div className="mt-3 h-px bg-ochre/40" />

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {variants.map((v, i) => {
          const author = findUserById(v.author)
          return (
            <div key={i} className="border-l-2 border-moss/40 pl-3">
              <p className="text-xs font-medium uppercase tracking-wide text-moss">
                {author?.name ?? 'Unknown'}
              </p>
              <p className="mt-1 text-sm text-ink/90">{v.note}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function DerivativeGenerator() {
  const { publishedEntries } = useEntries()
  const [entryId, setEntryId] = useState('')
  const [format, setFormat] = useState(null)
  const [infographicType, setInfographicType] = useState(null)
  const [exportedTo, setExportedTo] = useState(null)

  const entry = publishedEntries.find((e) => e.id === entryId)
  const hasMultipleVariants = (entry?.sections.variants?.length ?? 0) > 1

  function handleEntryChange(id) {
    setEntryId(id)
    setFormat(null)
    setInfographicType(null)
    setExportedTo(null)
  }

  function handleFormatChange(id) {
    setFormat(id)
    setInfographicType(null)
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
            {format === 'infographic' && (
              <Link to="/ai-transparency" className="mt-2 inline-block text-xs text-terracotta">
                How AI helps here →
              </Link>
            )}
          </div>

          {format === 'infographic' && (
            <div className="mt-4">
              <label className="text-sm font-medium">Infographic type</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {INFOGRAPHIC_TYPES.map((t) => {
                  const disabled = t.requiresMultipleVariants && !hasMultipleVariants
                  return (
                    <button
                      key={t.id}
                      disabled={disabled}
                      onClick={() => setInfographicType(t.id)}
                      title={disabled ? 'This entry only has one contributed variant so far.' : undefined}
                      className={clsx(
                        'rounded border px-3 py-1.5 text-sm',
                        disabled
                          ? 'cursor-not-allowed border-ink/10 text-ink/30'
                          : infographicType === t.id
                            ? 'border-terracotta bg-terracotta text-white'
                            : 'border-ink/20 text-ink/70 hover:bg-white'
                      )}
                    >
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {format && format !== 'infographic' && (
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

          {format === 'infographic' && infographicType && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Preview</p>
                <AiLabel>AI-formatted from entry data</AiLabel>
              </div>
              <div className="mt-2">
                {infographicType === 'ingredients-method' && (
                  <IngredientsMethodInfographic entry={entry} />
                )}
                {infographicType === 'variants-compared' && (
                  <VariantsComparedInfographic entry={entry} />
                )}
              </div>
              <p className="mt-2 text-xs text-terracotta">
                Read the full entry in the Duong Lam Food Archive →
              </p>

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
