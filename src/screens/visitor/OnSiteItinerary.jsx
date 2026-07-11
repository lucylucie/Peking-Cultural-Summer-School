import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import PrimaryButton from '../../components/shared/PrimaryButton'

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
  const [expanded, setExpanded] = useState(null)
  const [checked, setChecked] = useState({})

  const allComplete = BLOCKS.every((b) => checked[b.id])

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl">Today's Itinerary</h1>

      <ul className="mt-6 space-y-3">
        {BLOCKS.map((b) => (
          <li key={b.id} className="rounded bg-white p-4">
            <button
              onClick={() => setExpanded(expanded === b.id ? null : b.id)}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <p className="text-xs uppercase tracking-wide text-ink/50">{b.label}</p>
                <p className="font-serif text-lg">{b.title}</p>
              </div>
              {checked[b.id] && <span className="text-xs text-moss">Complete</span>}
            </button>
            {expanded === b.id && (
              <div className="mt-3 border-t border-ink/10 pt-3">
                <p className="text-sm text-ink/80">{b.detail}</p>
                <button
                  onClick={() => setChecked((prev) => ({ ...prev, [b.id]: !prev[b.id] }))}
                  className={clsx(
                    'mt-3 rounded border px-3 py-1.5 text-xs',
                    checked[b.id]
                      ? 'border-moss bg-moss text-white'
                      : 'border-ink/20 text-ink/70 hover:bg-cream'
                  )}
                >
                  {checked[b.id] ? 'Checked in' : 'Check in'}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <PrimaryButton
        className="mt-6"
        disabled={!allComplete}
        onClick={() => navigate('/visitor/certificate', { state: { entryId } })}
      >
        Complete Visit
      </PrimaryButton>
    </div>
  )
}
