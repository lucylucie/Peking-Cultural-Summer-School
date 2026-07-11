import { Link } from 'react-router-dom'
import AuthorAttribution from './AuthorAttribution'
import DishIllustration from './DishIllustration'

export default function EntryCard({ entry }) {
  return (
    <Link
      to={`/archive/${entry.id}`}
      className="block overflow-hidden rounded bg-white transition-shadow hover:shadow-sm"
    >
      <DishIllustration dishSlug={entry.dishSlug} className="aspect-[4/3] w-full" />
      <div className="p-4">
        <h3 className="font-serif text-lg leading-tight">{entry.title.en}</h3>
        <p className="text-sm text-ink/60">{entry.title.vi}</p>
        <AuthorAttribution entry={entry} className="mt-3" />
        <div className="mt-3 text-xs text-ink/60">
          {entry.contributionCount}{' '}
          {entry.contributionCount === 1 ? 'contribution' : 'contributions'}
        </div>
      </div>
    </Link>
  )
}
