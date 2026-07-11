import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Mic, Square } from 'lucide-react'
import { useEntries } from '../../lib/EntriesContext'
import { CURRENT_VILLAGE_AUTHOR_ID } from '../../lib/currentUser'
import PrimaryButton from '../../components/shared/PrimaryButton'
import SecondaryButton from '../../components/shared/SecondaryButton'

const PROMPTS = [
  'What\'s the story behind this dish?',
  'What makes your version different?',
]

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

function mockTranscript(dishName) {
  return `This is ${dishName}, made the way it's always been made in this house. The story behind it goes back further than I can say exactly — my mother learned it from hers, and I learned it standing beside her in the kitchen. What makes my version different is mostly in the timing — knowing by feel when it's ready, not by the clock.`
}

export default function VoiceContribution() {
  const navigate = useNavigate()
  const { addDraftEntry } = useEntries()
  const [dishName, setDishName] = useState('Chè lam Đường Lâm')
  const [state, setState] = useState('idle') // idle | recording | recorded | processing
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (state === 'recording') {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [state])

  function startRecording() {
    setSeconds(0)
    setState('recording')
  }

  function stopRecording() {
    setState('recorded')
  }

  function reRecord() {
    setSeconds(0)
    setState('idle')
  }

  function handleContinue() {
    setState('processing')
    setTimeout(() => {
      const draft = addDraftEntry({
        title: { vi: dishName, en: dishName, zh: '' },
        dishSlug: 'che-lam',
        primaryAuthor: CURRENT_VILLAGE_AUTHOR_ID,
        origin: mockTranscript(dishName),
        aiTranscribed: true,
      })
      navigate(`/village/draft/${draft.id}`)
    }, 1400)
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-10 text-center">
      {state === 'idle' && (
        <>
          <label className="w-full text-left text-xs font-medium uppercase tracking-wide text-ink/50">
            What are you sharing today?
          </label>
          <input
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="mt-1 w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm"
          />

          <div className="mt-8 space-y-1 text-sm text-ink/60">
            {PROMPTS.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </>
      )}

      {state === 'processing' ? (
        <p className="mt-16 text-sm text-ink/60">Transcribing your recording…</p>
      ) : (
        <>
          <button
            onClick={state === 'recording' ? stopRecording : state === 'idle' ? startRecording : undefined}
            disabled={state === 'recorded'}
            className={clsx(
              'mt-10 flex h-28 w-28 items-center justify-center rounded-full text-white transition-colors',
              state === 'recording' ? 'bg-terracotta' : 'bg-terracotta/90 hover:bg-terracotta'
            )}
          >
            {state === 'recording' ? <Square size={28} /> : <Mic size={28} />}
          </button>

          {state === 'recording' && (
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-end gap-0.5" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 animate-pulse bg-terracotta"
                    style={{
                      height: `${8 + ((i * 7) % 20)}px`,
                      animationDelay: `${i * 80}ms`,
                    }}
                  />
                ))}
              </div>
              <span className="text-sm text-ink/60">{formatTime(seconds)}</span>
            </div>
          )}

          {state === 'recorded' && (
            <div className="mt-4 w-full">
              <p className="text-sm text-ink/60">Recording saved — {formatTime(seconds)}</p>
              <div className="mt-4 flex justify-center gap-3">
                <SecondaryButton onClick={reRecord}>Re-record</SecondaryButton>
                <PrimaryButton onClick={handleContinue}>Continue</PrimaryButton>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
