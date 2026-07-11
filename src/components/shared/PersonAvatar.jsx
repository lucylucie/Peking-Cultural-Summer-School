import clsx from 'clsx'

const INK = '#2B2420'

// Tints are low-opacity mixes of the existing palette colors, not new hues.
const TINTS = [
  'rgba(184, 80, 66, 0.08)', // terracotta
  'rgba(74, 93, 69, 0.08)', // moss
  'rgba(201, 162, 75, 0.12)', // ochre
  'rgba(43, 36, 32, 0.06)', // ink
]

function hashIndex(id, mod) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0
  return Math.abs(hash) % mod
}

export default function PersonAvatar({ userId, size = 40, className }) {
  const tint = TINTS[hashIndex(userId ?? '', TINTS.length)]

  return (
    <div
      className={clsx('shrink-0 overflow-hidden rounded-full', className)}
      style={{ width: size, height: size, backgroundColor: tint }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" width="100%" height="100%">
        <circle cx="20" cy="16" r="7" fill="none" stroke={INK} strokeWidth="1.6" />
        <path
          d="M6 39 C6 27 12 24 20 24 C28 24 34 27 34 39"
          fill="none"
          stroke={INK}
          strokeWidth="1.6"
        />
      </svg>
    </div>
  )
}
