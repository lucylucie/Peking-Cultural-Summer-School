import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { Home, Mic, Compass, User, ListChecks, MapPin, Archive } from 'lucide-react'
import { ROLES, useRole } from '../../lib/RoleContext'
import RoleSwitcher from './RoleSwitcher'

const NAV_ITEMS = {
  [ROLES.VILLAGE]: [
    { to: '/village', label: 'Home', icon: Home, end: true },
    { to: '/village/record', label: 'Contribute', icon: Mic },
    { to: '/village', label: 'My Entries', icon: ListChecks },
    { to: '/settings', label: 'Profile', icon: User },
  ],
  [ROLES.CONTRIBUTOR]: [
    { to: '/contributor', label: 'Explore', icon: Compass, end: true },
    { to: '/contributor/profile', label: 'My Contributions', icon: ListChecks },
    { to: '/contributor/eligibility', label: 'Visit', icon: MapPin },
    { to: '/settings', label: 'Profile', icon: User },
  ],
  [ROLES.VISITOR]: [
    { to: '/visitor', label: 'Discover', icon: Compass, end: true },
    { to: '/visitor/itinerary', label: 'My Visit', icon: MapPin },
    { to: '/archive', label: 'Archive', icon: Archive },
    { to: '/settings', label: 'Profile', icon: User },
  ],
}

function NavItems({ role }) {
  return NAV_ITEMS[role].map(({ to, label, icon: Icon, end }) => (
    <NavLink
      key={label}
      to={to}
      end={end}
      className={({ isActive }) =>
        clsx(
          'flex flex-1 flex-col items-center gap-1 py-2 text-xs md:flex-row md:gap-1.5 md:px-3',
          isActive ? 'text-terracotta' : 'text-ink/60'
        )
      }
    >
      <Icon size={18} strokeWidth={1.5} />
      <span>{label}</span>
    </NavLink>
  ))
}

export default function NavShell({ children }) {
  const { role } = useRole()
  const isTopNav = role === ROLES.CONTRIBUTOR

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <RoleSwitcher />

      {isTopNav && (
        <header className="flex items-center justify-between border-b border-ink/10 bg-white px-4 py-3">
          <span className="font-serif text-lg">LA — Làng Archives</span>
          <nav className="flex items-center gap-1">
            <NavItems role={role} />
          </nav>
        </header>
      )}

      <main className="flex-1 pb-16 md:pb-0">{children}</main>

      {!isTopNav && (
        <nav className="fixed inset-x-0 bottom-0 flex border-t border-ink/10 bg-white">
          <NavItems role={role} />
        </nav>
      )}
    </div>
  )
}
