import { useLocation, useNavigate } from 'react-router-dom'
import { useEntries } from '../../lib/EntriesContext'
import { findUserById } from '../../data/users'
import PrimaryButton from '../../components/shared/PrimaryButton'
import PersonAvatar from '../../components/shared/PersonAvatar'

export default function PreVisitPrep() {
  const location = useLocation()
  const navigate = useNavigate()
  const { getEntry } = useEntries()
  const entryId = location.state?.entryId ?? 'entry-che-lam'
  const paid = location.state?.paid ?? false
  const entry = getEntry(entryId)
  const host = entry ? findUserById(entry.primaryAuthor) : null

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl">Getting ready for your visit</h1>
      {paid && (
        <p className="mt-1 text-xs text-moss">Payment confirmed for this residency.</p>
      )}

      <div className="mt-6 rounded bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/50">Your host</p>
        <div className="mt-2 flex items-center gap-3">
          <PersonAvatar userId={host?.id} size={48} />
          <p className="font-serif text-lg">{host?.name}</p>
        </div>
        <p className="mt-2 text-sm text-ink/70">{host?.bio}</p>
        {entry && (
          <p className="mt-2 text-xs text-moss">
            Known for {entry.title.en} ({entry.title.vi})
          </p>
        )}
        <p className="mt-3 text-xs text-ink/50">
          Your host will be introduced to you on arrival — there's no direct messaging in this
          prototype.
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-ink/50">What to expect</h2>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-ink/80">
          <li>Mornings are spent cooking alongside your host</li>
          <li>Afternoons are for recording — your notes and questions become part of the archive</li>
          <li>Evenings are shared meals with the household, not a scheduled activity</li>
        </ul>
        <p className="mt-3 text-sm text-ink/70">
          You're a participant in this visit, not an audience — the goal is a contribution, not
          just photographs.
        </p>
      </div>

      <PrimaryButton
        className="mt-6"
        onClick={() => navigate('/visitor/itinerary', { state: { entryId, paid } })}
      >
        View Itinerary
      </PrimaryButton>
    </div>
  )
}
