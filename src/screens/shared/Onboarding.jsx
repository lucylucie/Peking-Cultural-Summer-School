import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import PrimaryButton from '../../components/shared/PrimaryButton'

const CARDS = [
  'Villagers hold the knowledge',
  'Members co-author, credited by name',
  'Visitors bring it to life on-site',
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const isLast = index === CARDS.length - 1

  function next() {
    if (isLast) navigate('/role-selection')
    else setIndex((i) => i + 1)
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream px-4 py-8">
      <div className="flex justify-end">
        <button onClick={() => navigate('/role-selection')} className="text-sm text-ink/50">
          Skip
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <button onClick={next} className="max-w-sm text-center">
          <p className="font-serif text-2xl leading-snug">{CARDS[index]}</p>
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {CARDS.map((_, i) => (
          <span
            key={i}
            className={clsx('h-1.5 w-1.5 rounded-full', i === index ? 'bg-terracotta' : 'bg-ink/20')}
          />
        ))}
      </div>

      <PrimaryButton onClick={next} className="mt-8 w-full">
        {isLast ? 'Get Started' : 'Next'}
      </PrimaryButton>
    </div>
  )
}
