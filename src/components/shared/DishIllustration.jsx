const TERRACOTTA = '#b85042'
const MOSS = '#4A5D45'
const OCHRE = '#C9A24B'
const INK = '#2B2420'

function CheLam() {
  return (
    <>
      <rect x="40" y="70" width="120" height="26" rx="4" fill="none" stroke={TERRACOTTA} strokeWidth="2" />
      <rect x="52" y="96" width="120" height="26" rx="4" fill="none" stroke={TERRACOTTA} strokeWidth="2" />
      <rect x="34" y="44" width="120" height="26" rx="4" fill="none" stroke={TERRACOTTA} strokeWidth="2" />
      {[52, 66, 80, 94, 108, 122, 136].map((x) => (
        <circle key={x} cx={x} cy="57" r="1.4" fill={OCHRE} />
      ))}
    </>
  )
}

function Tuong() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={80 + i * 20}
          y1="30"
          x2={80 + i * 20}
          y2="44"
          stroke={OCHRE}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      <rect x="88" y="50" width="24" height="8" rx="2" fill="none" stroke={MOSS} strokeWidth="2" />
      <path
        d="M70 58 C70 58 66 90 74 110 C80 122 120 122 126 110 C134 90 130 58 130 58 Z"
        fill="none"
        stroke={MOSS}
        strokeWidth="2"
      />
    </>
  )
}

function BanhTe() {
  return (
    <>
      <path
        d="M60 55 L140 55 L150 100 L50 100 Z"
        fill="none"
        stroke={MOSS}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="60" y1="55" x2="50" y2="100" stroke={MOSS} strokeWidth="1.2" />
      <line x1="140" y1="55" x2="150" y2="100" stroke={MOSS} strokeWidth="1.2" />
      <line x1="55" y1="77" x2="145" y2="77" stroke={TERRACOTTA} strokeWidth="2" />
    </>
  )
}

function KeoDoi() {
  return (
    <>
      <path
        d="M45 78 C45 60 65 60 75 78 C85 96 105 96 115 78 C125 60 145 60 155 78"
        fill="none"
        stroke={TERRACOTTA}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {[58, 90, 122].map((x) => (
        <circle key={x} cx={x} cy="78" r="2" fill={OCHRE} />
      ))}
    </>
  )
}

function GaMia() {
  return (
    <>
      <ellipse cx="100" cy="90" rx="34" ry="22" fill="none" stroke={INK} strokeWidth="2" />
      <circle cx="140" cy="66" r="12" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M136 55 C136 50 140 48 142 52" fill="none" stroke={TERRACOTTA} strokeWidth="2" strokeLinecap="round" />
      <path d="M144 54 C146 49 150 49 150 54" fill="none" stroke={TERRACOTTA} strokeWidth="2" strokeLinecap="round" />
      <path d="M66 96 L52 90 M66 100 L50 100 M66 104 L52 110" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
    </>
  )
}

function CheKho() {
  return (
    <>
      <path
        d="M55 100 L55 76 Q55 66 65 66 L135 66 Q145 66 145 76 L145 100 Z"
        fill="none"
        stroke={MOSS}
        strokeWidth="2"
      />
      {[75, 95, 115].map((x) => (
        <line key={x} x1={x} y1="66" x2={x - 10} y2="100" stroke={OCHRE} strokeWidth="1.2" />
      ))}
    </>
  )
}

const ILLUSTRATIONS = {
  'che-lam': CheLam,
  tuong: Tuong,
  'banh-te': BanhTe,
  'keo-doi': KeoDoi,
  'ga-mia': GaMia,
  'che-kho': CheKho,
}

// Tints are low-opacity mixes of the existing palette colors, not new hues.
const TINTS = {
  'che-lam': 'rgba(184, 80, 66, 0.08)', // terracotta
  tuong: 'rgba(74, 93, 69, 0.08)', // moss
  'banh-te': 'rgba(74, 93, 69, 0.08)', // moss
  'keo-doi': 'rgba(201, 162, 75, 0.12)', // ochre
  'ga-mia': 'rgba(43, 36, 32, 0.06)', // ink
  'che-kho': 'rgba(74, 93, 69, 0.08)', // moss
}

export default function DishIllustration({ dishSlug, className }) {
  const Illustration = ILLUSTRATIONS[dishSlug]
  const tint = TINTS[dishSlug] ?? 'rgba(43, 36, 32, 0.05)'

  if (!Illustration) {
    return <div className={className} style={{ backgroundColor: tint }} aria-hidden="true" />
  }

  return (
    <svg
      viewBox="0 0 200 150"
      className={className}
      style={{ backgroundColor: tint }}
      role="img"
      aria-label={`Illustration of ${dishSlug.replace('-', ' ')}`}
    >
      <Illustration />
    </svg>
  )
}
