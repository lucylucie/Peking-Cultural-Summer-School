import { useLocation, Link } from 'react-router-dom'
import { useEntries } from '../../lib/EntriesContext'
import { CURRENT_VISITOR_ID } from '../../lib/currentUser'
import { findUserById } from '../../data/users'
import PrimaryButton from '../../components/shared/PrimaryButton'
import SecondaryButton from '../../components/shared/SecondaryButton'
import PersonAvatar from '../../components/shared/PersonAvatar'
import DishIllustration from '../../components/shared/DishIllustration'

export default function PostVisitCertificate() {
  const location = useLocation()
  const { getEntry, updateEntry } = useEntries()
  const entryId = location.state?.entryId ?? 'entry-che-lam'
  const paid = location.state?.paid ?? false
  const entry = getEntry(entryId)
  const me = findUserById(CURRENT_VISITOR_ID)

  if (!entry) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-sm text-ink/60">This entry could not be found.</p>
      </div>
    )
  }

  const alreadyCredited = entry.coAuthors.some((c) => c.id === CURRENT_VISITOR_ID)

  function handleGenerate() {
    updateEntry(entry.id, () => ({
      coAuthors: [...entry.coAuthors, { id: CURRENT_VISITOR_ID, contribution: 'visit' }],
    }))
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl">Your Contribution</h1>

      {!alreadyCredited ? (
        <div className="mt-6">
          <p className="text-sm text-ink/70">
            Your visit is complete — generate your certificate to be added as a credited
            co-author on {entry.title.en}.
          </p>
          <PrimaryButton className="mt-4" onClick={handleGenerate}>
            Generate Certificate
          </PrimaryButton>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded bg-white">
          <DishIllustration dishSlug={entry.dishSlug} className="aspect-[16/9] w-full" />
          <div className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-ink/50">Certificate of Contribution</p>
              {paid && <span className="text-xs text-moss">Visit paid &amp; confirmed</span>}
            </div>
            <h2 className="mt-2 font-serif text-2xl">{entry.title.en}</h2>
            <p className="text-ink/60">{entry.title.vi}</p>
            <div className="mt-4 flex items-center gap-3">
              <PersonAvatar userId={me?.id} size={36} />
              <p className="text-sm text-ink/80">
                {me?.name} contributed to this entry's origin story during a co-authoring residency
                at Duong Lam, and now appears in its permanent co-author record.
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <SecondaryButton as={Link} to={`/archive/${entry.id}`}>
                View in Archive
              </SecondaryButton>
              <PrimaryButton onClick={() => window.print()}>Download</PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
