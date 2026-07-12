import { findUserById } from '../../data/users'

function Section({ label, content }) {
  return (
    <div className="border-t border-ink/10 py-5">
      <h3 className="text-sm font-medium uppercase tracking-wide text-ink/50">{label}</h3>
      {content ? (
        <p className="mt-2 text-ink/90">{content}</p>
      ) : (
        <p className="mt-2 text-ochre">Not yet documented.</p>
      )}
    </div>
  )
}

export default function EntrySections({ entry }) {
  const { sections } = entry

  return (
    <div>
      <Section label="Origin story" content={sections.origin} />
      <Section label="Ingredients" content={sections.ingredients} />
      <Section label="Method" content={sections.method} />
      <Section label="Seasonal notes" content={sections.seasonalNotes} />

      <div className="mt-6 rounded bg-white/60 p-5">
        <h3 className="text-sm font-medium uppercase tracking-wide text-ink/50">
          Variants shared by the community
        </h3>
        {sections.variants && sections.variants.length > 0 ? (
          <ul className="mt-3 space-y-3">
            {sections.variants.map((v, i) => {
              const author = findUserById(v.author)
              const showSourceCredit =
                v.source?.type === 'uploaded' && v.source.creditedTo && v.source.creditedTo !== author?.name
              return (
                <li key={i} className="text-sm">
                  <p className="text-ink/90">{v.note}</p>
                  <p className="mt-1 text-xs text-moss">
                    — {author?.name ?? 'Unknown'}
                    {showSourceCredit && <> · original story credited to {v.source.creditedTo}</>}
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-ochre">
            No variants shared yet — this section is still open.
          </p>
        )}
      </div>
    </div>
  )
}
