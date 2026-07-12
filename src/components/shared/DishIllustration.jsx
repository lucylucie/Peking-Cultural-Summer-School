const TERRACOTTA = '#b85042'
const MOSS = '#4A5D45'
const OCHRE = '#C9A24B'
const INK = '#2B2420'
const WHITE = '#ffffff'

// Muted fill mixes derived from the palette — kept flat, no gradients.
const TERRACOTTA_SOFT = 'rgba(184, 80, 66, 0.75)'
const TERRACOTTA_DARK = 'rgba(120, 52, 43, 0.9)'
const MOSS_SOFT = 'rgba(74, 93, 69, 0.8)'
const MOSS_DARK = 'rgba(46, 58, 43, 0.9)'
const OCHRE_SOFT = 'rgba(201, 162, 75, 0.85)'

function Plate({ cx = 100, cy = 118, rx = 62, ry = 16 }) {
  return (
    <>
      <ellipse cx={cx} cy={cy + 3} rx={rx} ry={ry} fill="rgba(43,36,32,0.08)" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={WHITE} stroke={INK} strokeWidth="1.4" />
    </>
  )
}

function CheLam() {
  return (
    <>
      <Plate />
      <g transform="translate(0,-6)">
        <rect x="56" y="88" width="92" height="22" rx="4" fill={TERRACOTTA_DARK} stroke={INK} strokeWidth="1.4" />
        <rect x="64" y="68" width="92" height="22" rx="4" fill={TERRACOTTA_SOFT} stroke={INK} strokeWidth="1.4" />
        <rect x="48" y="48" width="92" height="22" rx="4" fill={TERRACOTTA} stroke={INK} strokeWidth="1.4" />
        {[64, 76, 88, 100, 112, 124].map((x) => (
          <circle key={x} cx={x} cy="59" r="1.6" fill={OCHRE} />
        ))}
        {[80, 92, 104, 116, 128, 140].map((x) => (
          <circle key={x} cx={x} cy="79" r="1.6" fill={OCHRE} />
        ))}
      </g>
      {/* ginger root garnish */}
      <path
        d="M162 108 C170 100 178 102 178 110 C178 116 170 118 166 114"
        fill={OCHRE_SOFT}
        stroke={INK}
        strokeWidth="1.2"
      />
    </>
  )
}

function Tuong() {
  return (
    <>
      {/* wooden board */}
      <ellipse cx="100" cy="122" rx="72" ry="14" fill="rgba(74,93,69,0.18)" stroke={INK} strokeWidth="1.2" />
      {/* sun rays */}
      {[76, 96, 116].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1="16"
          x2={x - 4 + i * 4}
          y2="30"
          stroke={OCHRE}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      ))}
      {/* jar */}
      <path
        d="M68 52 C68 52 62 96 74 116 C82 130 118 130 126 116 C138 96 132 52 132 52 Z"
        fill={MOSS_SOFT}
        stroke={INK}
        strokeWidth="1.6"
      />
      <path d="M70 58 C70 58 65 92 75 112" fill="none" stroke={MOSS_DARK} strokeWidth="1.2" opacity="0.5" />
      <rect x="84" y="42" width="32" height="12" rx="2" fill={MOSS_DARK} stroke={INK} strokeWidth="1.4" />
      {/* liquid line visible through jar mouth */}
      <ellipse cx="100" cy="60" rx="20" ry="4" fill={TERRACOTTA_DARK} opacity="0.6" />
      {/* ladle */}
      <path d="M138 90 L152 74" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="140" cy="92" rx="6" ry="4" fill={OCHRE_SOFT} stroke={INK} strokeWidth="1.2" />
    </>
  )
}

function BanhTe() {
  return (
    <>
      <Plate cx={100} cy={120} rx={66} ry={15} />
      {/* wrapped parcel */}
      <path
        d="M40 58 L92 58 L98 108 L34 108 Z"
        fill={MOSS_SOFT}
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <line x1="40" y1="58" x2="34" y2="108" stroke={MOSS_DARK} strokeWidth="1" opacity="0.5" />
      <line x1="66" y1="58" x2="66" y2="108" stroke={MOSS_DARK} strokeWidth="1" opacity="0.4" />
      <line x1="38" y1="82" x2="96" y2="82" stroke={TERRACOTTA} strokeWidth="2.4" />
      {/* unwrapped cross-section */}
      <path
        d="M108 62 L158 62 L164 106 L102 106 Z"
        fill={WHITE}
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {[
        [122, 78],
        [136, 88],
        [128, 96],
        [146, 76],
        [140, 100],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill={TERRACOTTA_DARK} />
      ))}
    </>
  )
}

function KeoDoi() {
  return (
    <>
      <ellipse cx="100" cy="112" rx="70" ry="20" fill={WHITE} stroke={INK} strokeWidth="1.4" />
      {[
        { cx: 64, cy: 98, rot: -12 },
        { cx: 100, cy: 92, rot: 4 },
        { cx: 136, cy: 100, rot: 14 },
      ].map((c, i) => (
        <g key={i} transform={`rotate(${c.rot} ${c.cx} ${c.cy})`}>
          <rect
            x={c.cx - 26}
            y={c.cy - 10}
            width="52"
            height="20"
            rx="10"
            fill={TERRACOTTA_SOFT}
            stroke={INK}
            strokeWidth="1.4"
          />
          {[c.cx - 14, c.cx, c.cx + 14].map((x) => (
            <circle key={x} cx={x} cy={c.cy} r="2" fill={OCHRE} />
          ))}
        </g>
      ))}
    </>
  )
}

function GaMia() {
  return (
    <>
      <ellipse cx="100" cy="126" rx="50" ry="8" fill="rgba(43,36,32,0.1)" />
      {/* tail feathers */}
      <path
        d="M56 96 C40 86 38 68 50 58 C56 72 62 84 70 92 Z"
        fill={MOSS_SOFT}
        stroke={INK}
        strokeWidth="1.4"
      />
      {/* body */}
      <ellipse cx="102" cy="98" rx="42" ry="26" fill={TERRACOTTA_SOFT} stroke={INK} strokeWidth="1.6" />
      {[
        [80, 90],
        [92, 96],
        [104, 92],
        [116, 98],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q4 6 0 12`} stroke={TERRACOTTA_DARK} strokeWidth="1.4" fill="none" opacity="0.6" />
      ))}
      {/* head */}
      <circle cx="150" cy="70" r="15" fill={TERRACOTTA_SOFT} stroke={INK} strokeWidth="1.6" />
      <circle cx="155" cy="67" r="1.6" fill={INK} />
      {/* comb */}
      <path
        d="M142 58 C142 50 148 48 149 54 C151 47 158 48 157 55 C160 50 164 53 161 60"
        fill={TERRACOTTA}
        stroke={INK}
        strokeWidth="1.2"
      />
      {/* beak */}
      <path d="M164 72 L172 75 L164 78 Z" fill={OCHRE} stroke={INK} strokeWidth="1" />
      {/* legs */}
      <path d="M92 122 L88 134 M112 122 L116 134" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path d="M84 134 L92 134 M108 134 L118 134" stroke={OCHRE} strokeWidth="2" strokeLinecap="round" />
      {/* grass */}
      {[30, 44, 160, 174].map((x) => (
        <path key={x} d={`M${x} 130 q3 -10 6 0`} stroke={MOSS} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      ))}
    </>
  )
}

function CheKho() {
  return (
    <>
      <Plate />
      <path
        d="M58 108 L58 76 Q58 64 70 64 L130 64 Q142 64 142 76 L142 108 Z"
        fill={OCHRE_SOFT}
        stroke={INK}
        strokeWidth="1.6"
      />
      {[80, 100, 120].map((x) => (
        <line key={x} x1={x} y1="64" x2={x - 14} y2="108" stroke={MOSS_DARK} strokeWidth="1.2" opacity="0.55" />
      ))}
      {[74, 90, 106, 122].map((x) => (
        <circle key={x} cx={x} cy="72" r="1.4" fill={MOSS} opacity="0.7" />
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

// Backgrounds are low-opacity mixes of the existing palette colors, not new hues.
const BACKGROUNDS = {
  'che-lam': 'rgba(184, 80, 66, 0.08)', // terracotta
  tuong: 'rgba(74, 93, 69, 0.08)', // moss
  'banh-te': 'rgba(74, 93, 69, 0.08)', // moss
  'keo-doi': 'rgba(201, 162, 75, 0.12)', // ochre
  'ga-mia': 'rgba(74, 93, 69, 0.06)', // moss
  'che-kho': 'rgba(201, 162, 75, 0.1)', // ochre
}

export default function DishIllustration({ dishSlug, className }) {
  const Illustration = ILLUSTRATIONS[dishSlug]
  const background = BACKGROUNDS[dishSlug] ?? 'rgba(43, 36, 32, 0.05)'

  if (!Illustration) {
    return <div className={className} style={{ backgroundColor: background }} aria-hidden="true" />
  }

  return (
    <svg
      viewBox="0 0 200 150"
      className={className}
      style={{ backgroundColor: background }}
      role="img"
      aria-label={`Illustration of ${dishSlug.replace('-', ' ')}`}
    >
      <Illustration />
    </svg>
  )
}
