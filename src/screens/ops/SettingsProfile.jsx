import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROLES, useRole } from '../../lib/RoleContext'
import { useEntries } from '../../lib/EntriesContext'
import { CURRENT_CONTRIBUTOR_ID, currentUserForRole } from '../../lib/currentUser'
import SecondaryButton from '../../components/shared/SecondaryButton'
import PersonAvatar from '../../components/shared/PersonAvatar'

const ROLE_LABEL = {
  [ROLES.VILLAGE]: 'Village Author',
  [ROLES.CONTRIBUTOR]: 'Contributor',
  [ROLES.VISITOR]: 'Visitor',
}

export default function SettingsProfile() {
  const { role } = useRole()
  const { entries } = useEntries()
  const navigate = useNavigate()
  const me = currentUserForRole(role)
  const [language, setLanguage] = useState('Vietnamese')
  const [notifications, setNotifications] = useState(true)

  const creditedCount =
    role === ROLES.CONTRIBUTOR
      ? entries.filter((e) => e.coAuthors.some((c) => c.id === CURRENT_CONTRIBUTOR_ID)).length
      : 0

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl">Settings</h1>

      <div className="mt-6 flex items-center gap-4">
        <PersonAvatar userId={me?.id} size={64} />
        <div>
          <p className="font-serif text-lg">{me?.name}</p>
          <span className="mt-1 inline-block rounded bg-ochre/20 px-2 py-0.5 text-xs text-ink">
            {ROLE_LABEL[role]}
          </span>
        </div>
      </div>

      {role === ROLES.VILLAGE && (
        <div className="mt-6 rounded bg-white p-4">
          <p className="text-sm font-medium">Revenue-share settings</p>
          <p className="mt-1 text-xs text-ink/60">
            Review your visit fee split and brand partnership income.
          </p>
          <Link to="/revenue" className="mt-2 inline-block text-sm text-terracotta">
            View Revenue Dashboard →
          </Link>
        </div>
      )}

      {role === ROLES.CONTRIBUTOR && (
        <div className="mt-6 rounded bg-white p-4">
          <p className="text-sm font-medium">Contribution history</p>
          <p className="mt-1 text-sm text-ink/70">
            Credited in {creditedCount} archive {creditedCount === 1 ? 'entry' : 'entries'} ·{' '}
            {me?.contributionCount} contributions total
          </p>
          <Link to="/contributor/profile" className="mt-2 inline-block text-sm text-terracotta">
            View full profile →
          </Link>
        </div>
      )}

      {role === ROLES.VISITOR && (
        <div className="mt-6 rounded bg-white p-4">
          <p className="text-sm font-medium">Past visits</p>
          <p className="mt-1 text-sm text-ink/70">
            {me?.visitsCompleted} completed {me?.visitsCompleted === 1 ? 'visit' : 'visits'}
          </p>
        </div>
      )}

      <div className="mt-6 rounded bg-white p-4">
        <Link to="/ai-transparency" className="flex items-center justify-between text-sm font-medium">
          How AI Helps Here
          <span className="text-terracotta">→</span>
        </Link>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium">Language preference</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-2 w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm"
        >
          <option>Vietnamese</option>
          <option>English</option>
          <option>Chinese</option>
        </select>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
        Notify me about activity on my entries
      </label>

      <SecondaryButton className="mt-8" onClick={() => navigate('/')}>
        Log out
      </SecondaryButton>
    </div>
  )
}
