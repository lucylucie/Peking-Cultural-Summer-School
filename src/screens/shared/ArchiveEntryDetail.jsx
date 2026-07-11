import { useParams, Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { useEntries } from '../../lib/EntriesContext'
import AuthorAttribution from '../../components/shared/AuthorAttribution'
import EntrySections from '../../components/shared/EntrySections'
import PrimaryButton from '../../components/shared/PrimaryButton'
import DishIllustration from '../../components/shared/DishIllustration'
import VillageMap from '../../components/shared/VillageMap'

const DISH_TO_SCAFFOLD = {
  'che-lam': 'scaffold-tet-sweets',
  tuong: 'scaffold-fermentation-practices',
}

export default function ArchiveEntryDetail() {
  const { entryId } = useParams()
  const { getEntry } = useEntries()
  const entry = getEntry(entryId)

  if (!entry) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-sm text-ink/60">This entry could not be found.</p>
        <Link to="/archive" className="mt-2 inline-block text-sm text-terracotta">
          Back to Archive
        </Link>
      </div>
    )
  }

  const scaffoldId = DISH_TO_SCAFFOLD[entry.dishSlug]

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <DishIllustration dishSlug={entry.dishSlug} className="aspect-[16/9] w-full rounded" />

      <div className="mt-6">
        <h1 className="text-3xl">{entry.title.en}</h1>
        <p className="mt-1 text-lg text-ink/70">{entry.title.vi}</p>
        {entry.title.zh && <p className="text-sm text-ink/50">{entry.title.zh}</p>}
      </div>

      <AuthorAttribution entry={entry} className="mt-4" />

      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/50">Where this comes from</p>
        <VillageMap mode="single" entryId={entry.id} className="mt-2 h-28 w-full" />
      </div>

      {entry.audioUrl && (
        <button className="mt-4 inline-flex items-center gap-2 rounded border border-ink/20 px-4 py-2 text-sm hover:bg-white">
          <Play size={16} strokeWidth={1.5} />
          Play village author recording
        </button>
      )}

      <EntrySections entry={entry} />

      <div className="mt-8 border-t border-ink/10 pt-6">
        <PrimaryButton as={Link} to={scaffoldId ? `/contributor/scaffold/${scaffoldId}` : '/contributor'}>
          Contribute a variant
        </PrimaryButton>
      </div>
    </div>
  )
}
