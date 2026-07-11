const INK = '#2B2420'
const OCHRE = '#C9A24B'

function Morning() {
  return (
    <>
      <circle cx="20" cy="24" r="8" fill="none" stroke={OCHRE} strokeWidth="1.6" />
      <line x1="6" y1="32" x2="34" y2="32" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="12" y1="14" x2="9" y2="10" stroke={OCHRE} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="28" y1="14" x2="31" y2="10" stroke={OCHRE} strokeWidth="1.6" strokeLinecap="round" />
    </>
  )
}

function Afternoon() {
  return (
    <>
      <circle cx="20" cy="20" r="9" fill="none" stroke={OCHRE} strokeWidth="1.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 20 + Math.cos(rad) * 13
        const y1 = 20 + Math.sin(rad) * 13
        const x2 = 20 + Math.cos(rad) * 17
        const y2 = 20 + Math.sin(rad) * 17
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={OCHRE} strokeWidth="1.6" strokeLinecap="round" />
      })}
    </>
  )
}

function Evening() {
  return (
    <path
      d="M27 12 C22 12 18 16 18 21 C18 26 22 30 27 30 C23 30 20 26 20 21 C20 16 23 12 27 12 Z"
      fill="none"
      stroke={INK}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  )
}

const ICONS = { morning: Morning, afternoon: Afternoon, evening: Evening }

export default function TimeOfDayIcon({ time, size = 32, className }) {
  const Icon = ICONS[time]
  if (!Icon) return null
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
      <Icon />
    </svg>
  )
}
