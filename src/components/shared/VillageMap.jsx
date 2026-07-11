import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { villageAuthors, findUserById } from '../../data/users'
import { useEntries } from '../../lib/EntriesContext'
import PersonAvatar from './PersonAvatar'

function MapBase() {
  return (
    <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <rect width="300" height="200" fill="rgba(74,93,69,0.08)" />
      {/* river */}
      <path
        d="M -10 150 C 60 140, 90 170, 150 140 C 210 110, 240 130, 310 100"
        fill="none"
        stroke="rgba(74,93,69,0.22)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* paths */}
      <path d="M 150 0 L 150 200" stroke="rgba(43,36,32,0.1)" strokeWidth="3" />
      <path d="M 0 90 L 300 90" stroke="rgba(43,36,32,0.1)" strokeWidth="3" />
      {/* rice paddy grid clusters */}
      {[
        [20, 20],
        [225, 25],
        [15, 160],
        [235, 155],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={c * 14}
                y={r * 10}
                width="11"
                height="7"
                fill="rgba(201,162,75,0.18)"
                stroke="rgba(74,93,69,0.2)"
                strokeWidth="0.6"
              />
            ))
          )}
        </g>
      ))}
    </svg>
  )
}

function Pin({ x, y, active, size, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-label={label}
    >
      <svg width={size} height={size * 1.25} viewBox="0 0 24 30">
        <path
          d="M12 0 C5.4 0 0 5.4 0 12 C0 21 12 30 12 30 C12 30 24 21 24 12 C24 5.4 18.6 0 12 0 Z"
          fill={active ? '#b85042' : '#4A5D45'}
          stroke="#2B2420"
          strokeWidth="1"
        />
        <circle cx="12" cy="12" r="4.5" fill="#ffffff" />
      </svg>
    </button>
  )
}

export default function VillageMap({
  mode = 'overview',
  entryId = null,
  itineraryEntryIds = null,
  currentEntryId = null,
  className,
}) {
  const { entries } = useEntries()
  const [activeAuthorId, setActiveAuthorId] = useState(null)

  let authorsToShow = villageAuthors.filter((a) => a.location)

  if (mode === 'single' && entryId) {
    const entry = entries.find((e) => e.id === entryId)
    authorsToShow = authorsToShow.filter((a) => a.id === entry?.primaryAuthor)
  }

  if (mode === 'itinerary' && itineraryEntryIds) {
    const authorIds = itineraryEntryIds
      .map((id) => entries.find((e) => e.id === id)?.primaryAuthor)
      .filter(Boolean)
    authorsToShow = authorsToShow.filter((a) => authorIds.includes(a.id))
  }

  const currentAuthorId = currentEntryId
    ? entries.find((e) => e.id === currentEntryId)?.primaryAuthor
    : null

  const activeAuthor = activeAuthorId ? findUserById(activeAuthorId) : null
  const activeAuthorEntry = activeAuthor
    ? entries.find((e) => e.primaryAuthor === activeAuthor.id)
    : null

  const pinSize = mode === 'single' ? 22 : 28

  return (
    <div className={clsx('relative overflow-hidden rounded', className)}>
      <MapBase />

      {authorsToShow.map((author) => {
        const isActive = mode === 'single' || author.id === currentAuthorId
        return (
          <Pin
            key={author.id}
            x={author.location.x}
            y={author.location.y}
            active={isActive}
            size={isActive ? pinSize * 1.15 : pinSize}
            label={author.location.label}
            onClick={() => setActiveAuthorId(activeAuthorId === author.id ? null : author.id)}
          />
        )
      })}

      {activeAuthor && (
        <div className="absolute bottom-2 left-2 right-2 rounded bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <PersonAvatar userId={activeAuthor.id} size={28} />
            <div>
              <p className="text-sm font-medium">{activeAuthor.name}</p>
              <p className="text-xs text-ink/60">{activeAuthor.location.label}</p>
            </div>
          </div>
          {activeAuthorEntry && (
            <Link
              to={`/archive/${activeAuthorEntry.id}`}
              className="mt-1.5 block text-xs text-terracotta"
            >
              Known for {activeAuthorEntry.title.en} →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
