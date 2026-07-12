import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { ROLES, useRole } from '../../lib/RoleContext'

const OPTIONS = [
  { role: ROLES.VILLAGE, label: 'Village Author', home: '/village' },
  { role: ROLES.CONTRIBUTOR, label: 'Contributor', home: '/contributor' },
  { role: ROLES.VISITOR, label: 'Visitor', home: '/visitor' },
]

export default function RoleSwitcher() {
  const { role, setRole } = useRole()
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-1 border-b border-ink/10 bg-white px-3 py-1.5 text-xs">
      <span className="mr-2 text-ink/40">Dev role:</span>
      {OPTIONS.map((opt) => (
        <button
          key={opt.role}
          onClick={() => {
            setRole(opt.role)
            navigate(opt.home)
          }}
          className={clsx(
            'rounded px-2 py-1 transition-colors',
            role === opt.role ? 'bg-terracotta text-white' : 'text-ink/60 hover:bg-ink/5'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
