import { useNavigate } from 'react-router-dom'
import { ROLES, useRole } from '../../lib/RoleContext'

const OPTIONS = [
  {
    role: ROLES.VILLAGE,
    letter: 'V',
    title: "I'm a Village Author",
    description: 'I hold recipes and stories from Duong Lam and want to record them.',
    home: '/village',
  },
  {
    role: ROLES.CONTRIBUTOR,
    letter: 'C',
    title: "I'm a Contributor",
    description: 'I want to translate, illustrate, or add context to village entries.',
    home: '/contributor',
  },
  {
    role: ROLES.VISITOR,
    letter: 'Vi',
    title: "I'm Visiting",
    description: 'I want to book a co-authoring residency in Duong Lam.',
    home: '/visitor',
  },
]

export default function RoleSelection() {
  const { setRole } = useRole()
  const navigate = useNavigate()

  function choose(option) {
    setRole(option.role)
    navigate(option.home)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <h1 className="text-2xl">Welcome to LA</h1>
      <p className="mt-1 text-sm text-ink/60">Which brings you to Duong Lam?</p>

      <div className="mt-6 space-y-3">
        {OPTIONS.map((option) => (
          <button
            key={option.role}
            onClick={() => choose(option)}
            className="flex w-full items-center gap-4 rounded bg-white p-4 text-left hover:shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta font-serif text-white">
              {option.letter}
            </span>
            <span>
              <span className="block font-serif text-lg">{option.title}</span>
              <span className="block text-sm text-ink/60">{option.description}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
