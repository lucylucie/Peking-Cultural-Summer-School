import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useEntries } from '../../lib/EntriesContext'
import PrimaryButton from '../../components/shared/PrimaryButton'
import SecondaryButton from '../../components/shared/SecondaryButton'
import DishIllustration from '../../components/shared/DishIllustration'

const DATE_RANGES = [
  { id: 'r2', label: 'Sep 7 – Sep 11' },
  { id: 'r3', label: 'Oct 12 – Oct 16' },
]

const STEP_LABELS = ['Dates', 'Practice', 'Confirm']

export default function BookingFlow() {
  const navigate = useNavigate()
  const { publishedEntries } = useEntries()
  const [step, setStep] = useState(1)
  const [dateId, setDateId] = useState(null)
  const [groupSize, setGroupSize] = useState(1)
  const [entryId, setEntryId] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const selectedDate = DATE_RANGES.find((d) => d.id === dateId)
  const selectedEntry = publishedEntries.find((e) => e.id === entryId)

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-8">
        <h1 className="text-2xl">Booking confirmed</h1>
        <p className="mt-2 text-sm text-ink/70">
          {selectedDate?.label} · {groupSize} {groupSize === 1 ? 'guest' : 'guests'} · contributing
          to {selectedEntry?.title.en}
        </p>
        <PrimaryButton
          className="mt-6"
          onClick={() => navigate('/visitor/prep', { state: { entryId } })}
        >
          Continue to Pre-Visit Prep
        </PrimaryButton>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="flex gap-2 text-xs text-ink/50">
        {STEP_LABELS.map((label, i) => (
          <span key={label} className={clsx(i + 1 === step && 'font-medium text-terracotta')}>
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {step === 1 && (
        <div className="mt-6">
          <h2 className="text-lg">Choose your dates</h2>
          <div className="mt-3 space-y-2">
            {DATE_RANGES.map((d) => (
              <button
                key={d.id}
                onClick={() => setDateId(d.id)}
                className={clsx(
                  'block w-full rounded border px-4 py-2 text-left text-sm',
                  dateId === d.id ? 'border-terracotta bg-white' : 'border-ink/20'
                )}
              >
                {d.label}
              </button>
            ))}
          </div>

          <label className="mt-4 block text-sm font-medium">Group size</label>
          <input
            type="number"
            min={1}
            max={6}
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            className="mt-1 w-24 rounded border border-ink/20 bg-white px-3 py-2 text-sm"
          />

          <div className="mt-6">
            <PrimaryButton onClick={() => setStep(2)} disabled={!dateId}>
              Next
            </PrimaryButton>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6">
          <h2 className="text-lg">Which practice draws you?</h2>
          <div className="mt-3 space-y-2">
            {publishedEntries.map((e) => (
              <button
                key={e.id}
                onClick={() => setEntryId(e.id)}
                className={clsx(
                  'flex w-full items-center gap-3 rounded border px-4 py-2 text-left text-sm',
                  entryId === e.id ? 'border-terracotta bg-white' : 'border-ink/20'
                )}
              >
                <DishIllustration dishSlug={e.dishSlug} className="h-10 w-14 shrink-0 rounded" />
                {e.title.en}
              </button>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <SecondaryButton onClick={() => setStep(1)}>Back</SecondaryButton>
            <PrimaryButton onClick={() => setStep(3)} disabled={!entryId}>
              Next
            </PrimaryButton>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6">
          <h2 className="text-lg">Confirm your residency</h2>
          <p className="mt-2 text-sm text-ink/70">
            {selectedDate?.label} · {groupSize} {groupSize === 1 ? 'guest' : 'guests'} ·
            contributing to {selectedEntry?.title.en}
          </p>
          <div className="mt-4 rounded bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink/50">
              What to bring
            </p>
            <ul className="mt-2 list-disc pl-4 text-sm text-ink/80">
              <li>Comfortable clothes for kitchen work</li>
              <li>A notebook, if you like to write by hand</li>
              <li>An open afternoon — recording sessions run at their own pace</li>
            </ul>
          </div>
          <div className="mt-6 flex gap-3">
            <SecondaryButton onClick={() => setStep(2)}>Back</SecondaryButton>
            <PrimaryButton onClick={() => setConfirmed(true)}>Confirm Booking</PrimaryButton>
          </div>
        </div>
      )}
    </div>
  )
}
