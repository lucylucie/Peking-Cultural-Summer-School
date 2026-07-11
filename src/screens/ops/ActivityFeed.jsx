import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { ROLES, useRole } from '../../lib/RoleContext'

const ACTIVITY = {
  [ROLES.VILLAGE]: [
    {
      id: 'a1',
      text: 'Nguyễn Phương Anh accepted your co-author invitation on Chè lam Đường Lâm.',
      link: '/archive/entry-che-lam',
      linkLabel: 'View entry',
    },
    {
      id: 'a2',
      text: 'Vũ Minh Đức added context notes to Gà Mía — ready for your review.',
      link: '/village/draft/entry-ga-mia',
      linkLabel: 'Review draft',
    },
    {
      id: 'a3',
      text: 'A new booking was confirmed for your hosted residency.',
      link: '/revenue',
      linkLabel: 'View revenue',
    },
  ],
  [ROLES.CONTRIBUTOR]: [
    {
      id: 'a4',
      text: 'Bà Nguyễn Thị Hạnh invited you to co-author Chè lam Đường Lâm.',
      link: '/archive/entry-che-lam',
      linkLabel: 'View entry',
    },
    {
      id: 'a5',
      text: 'Your context notes on Gà Mía were submitted for the village author\'s review.',
      link: '/contributor/edit/entry-ga-mia',
      linkLabel: 'View draft',
    },
  ],
  [ROLES.VISITOR]: [
    {
      id: 'a6',
      text: 'Your residency booking is confirmed.',
      link: '/visitor/itinerary',
      linkLabel: 'View itinerary',
    },
    {
      id: 'a7',
      text: 'Your contribution certificate is ready.',
      link: '/visitor/certificate',
      linkLabel: 'View certificate',
    },
  ],
}

export default function ActivityFeed() {
  const { role } = useRole()
  const [items, setItems] = useState(ACTIVITY[role].map((i) => ({ ...i, unread: true })))

  function markRead(id) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, unread: false } : i)))
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Activity</h1>
        {items.length > 0 && (
          <button onClick={() => setItems([])} className="text-xs text-ink/50 hover:text-ink">
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="mt-8 text-sm text-ink/60">Nothing new right now.</p>
      ) : (
        <ul className="mt-6 divide-y divide-ink/10 rounded bg-white">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-3 px-4 py-3">
              <span
                className={clsx(
                  'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                  item.unread ? 'bg-terracotta' : 'bg-transparent'
                )}
                aria-hidden="true"
              />
              <div className="flex-1">
                <p className="text-sm text-ink/90">{item.text}</p>
                <Link
                  to={item.link}
                  onClick={() => markRead(item.id)}
                  className="mt-1 inline-block text-xs text-terracotta"
                >
                  {item.linkLabel}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
