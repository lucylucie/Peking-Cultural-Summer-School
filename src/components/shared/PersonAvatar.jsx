import clsx from 'clsx'

const INK = '#2B2420'
const TERRACOTTA = '#b85042'
const MOSS = '#4A5D45'
const OCHRE = '#C9A24B'

// Skin/backdrop tones are low-opacity mixes of the existing palette colors.
const SKIN_TONES = [
  'rgba(184, 80, 66, 0.28)', // terracotta
  'rgba(201, 162, 75, 0.32)', // ochre
  'rgba(120, 68, 44, 0.3)', // warm brown mix
]

const HAIR_COLORS = [INK, 'rgba(74, 93, 69, 0.9)', 'rgba(43, 36, 32, 0.75)']
const CLOTHING_COLORS = [TERRACOTTA, MOSS, OCHRE, 'rgba(43,36,32,0.7)']

const BACKGROUNDS = [
  'rgba(184, 80, 66, 0.1)',
  'rgba(74, 93, 69, 0.1)',
  'rgba(201, 162, 75, 0.14)',
  'rgba(43, 36, 32, 0.06)',
]

function hashIndex(id, mod, salt = 0) {
  let hash = salt
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0
  return Math.abs(hash) % mod
}

function Hair({ style, color }) {
  if (style === 0) {
    // short crop
    return <path d="M11 17 C11 8 29 8 29 17 L29 20 C22 15 18 15 11 20 Z" fill={color} />
  }
  if (style === 1) {
    // long, side-parted
    return (
      <path
        d="M10 16 C10 6 30 6 30 16 L31 30 C29 24 27 20 27 20 C25 14 15 14 13 20 C13 20 11 24 9 30 Z"
        fill={color}
      />
    )
  }
  if (style === 2) {
    // bun
    return (
      <>
        <path d="M11 17 C11 8 29 8 29 17 L29 19 C22 14 18 14 11 19 Z" fill={color} />
        <circle cx="20" cy="6" r="4" fill={color} />
      </>
    )
  }
  // close-cropped / bald
  return <path d="M12 15 C12 9 28 9 28 15" fill="none" stroke={color} strokeWidth="1.4" />
}

export default function PersonAvatar({ userId, size = 40, className }) {
  const id = userId ?? ''
  const background = BACKGROUNDS[hashIndex(id, BACKGROUNDS.length, 1)]
  const skin = SKIN_TONES[hashIndex(id, SKIN_TONES.length, 2)]
  const hairColor = HAIR_COLORS[hashIndex(id, HAIR_COLORS.length, 3)]
  const hairStyle = hashIndex(id, 4, 4)
  const clothing = CLOTHING_COLORS[hashIndex(id, CLOTHING_COLORS.length, 5)]

  return (
    <div
      className={clsx('shrink-0 overflow-hidden rounded-full', className)}
      style={{ width: size, height: size, backgroundColor: background }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" width="100%" height="100%">
        {/* shoulders / clothing */}
        <path d="M4 40 C4 28 11 24 20 24 C29 24 36 28 36 40 Z" fill={clothing} />
        {/* neck */}
        <rect x="16" y="21" width="8" height="6" fill={skin} />
        {/* face */}
        <circle cx="20" cy="15" r="9" fill={skin} stroke={INK} strokeWidth="1.1" />
        {/* eyes */}
        <circle cx="16.5" cy="15" r="1" fill={INK} />
        <circle cx="23.5" cy="15" r="1" fill={INK} />
        {/* mouth */}
        <path d="M16.5 19 Q20 21.2 23.5 19" fill="none" stroke={INK} strokeWidth="1.1" strokeLinecap="round" />
        {/* hair */}
        <Hair style={hairStyle} color={hairColor} />
      </svg>
    </div>
  )
}
