import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import PrimaryButton from '../../components/shared/PrimaryButton'
import SecondaryButton from '../../components/shared/SecondaryButton'
import TimeOfDayIcon from '../../components/shared/TimeOfDayIcon'
import ContentStudio from '../../components/shared/ContentStudio'
import VillageMap from '../../components/shared/VillageMap'

const BLOCKS = [
  {
    id: 'morning',
    label: 'Morning',
    title: 'Cooking session',
    detail: 'Prepare ingredients and cook alongside your host, at their pace and in their kitchen.',
  },
  {
    id: 'afternoon',
    label: 'Afternoon',
    title: 'On-site recording',
    detail: 'Record notes, questions, and observations — this becomes part of your contribution.',
  },
  {
    id: 'evening',
    label: 'Evening',
    title: 'Village dinner',
    detail: 'A shared meal with the household — unscheduled, unstructured, and not for the camera.',
  },
]

export default function OnSiteItinerary() {
  const location = useLocation()
  const navigate = useNavigate()
  const entryId = location.state?.entryId ?? 'entry-che-lam'
  const paid = location.state?.paid ?? false
  const [expanded, setExpanded] = useState(null)
  const [checked, setChecked] = useState({})
  const [studioBlock, setStudioBlock] = useState(null)

  const allComplete = BLOCKS.every((b) => checked[b.id])

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl">Today's Itinerary</h1>

      <VillageMap
        mode="itinerary"
        itineraryEntryIds={[entryId]}
        currentEntryId={entryId}
        className="mt-4 h-36 w-full"
      />

      <ul className="mt-6 space-y-3">
        {BLOCKS.map((b) => (
          <li key={b.id} className="rounded bg-white p-4">
            <button
              onClick={() => setExpanded(expanded === b.id ? null : b.id)}
              className="flex w-full items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <TimeOfDayIcon time={b.id} />
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink/50">{b.label}</p>
                  <p className="font-serif text-lg">{b.title}</p>
                </div>
              </div>
              {checked[b.id] && <span className="text-xs text-moss">Complete</span>}
            </button>
            {expanded === b.id && (
              <div className="mt-3 border-t border-ink/10 pt-3">
                <p className="text-sm text-ink/80">{b.detail}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setChecked((prev) => ({ ...prev, [b.id]: !prev[b.id] }))}
                    className={clsx(
                      'rounded border px-3 py-1.5 text-xs',
                      checked[b.id]
                        ? 'border-moss bg-moss text-white'
                        : 'border-ink/20 text-ink/70 hover:bg-cream'
                    )}
                  >
                    {checked[b.id] ? 'Checked in' : 'Check in'}
                  </button>
                  <SecondaryButton onClick={() => setStudioBlock(b)} className="px-3 py-1.5 text-xs">
                    Capture
                  </SecondaryButton>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <PrimaryButton
        className="mt-6"
        disabled={!allComplete}
        onClick={() => navigate('/visitor/certificate', { state: { entryId, paid } })}
      >
        Complete Visit
      </PrimaryButton>

      {studioBlock && (
        <ContentStudio
          scopedEntryId={entryId}
          scopedLabel={`${studioBlock.label} — ${studioBlock.title}`}
          onClose={() => setStudioBlock(null)}
        />
      )}
    </div>
  )
}
