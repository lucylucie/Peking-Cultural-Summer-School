import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useEntries } from '../../lib/EntriesContext'
import { contributors } from '../../data/users'
import PrimaryButton from '../../components/shared/PrimaryButton'
import PersonAvatar from '../../components/shared/PersonAvatar'

const SUGGESTED_IDS = ['co-anh', 'co-mai', 'co-huong']

export default function CoAuthorInvitation() {
  const { entryId } = useParams()
  const navigate = useNavigate()
  const { getEntry, updateEntry } = useEntries()
  const entry = getEntry(entryId)
  const [invited, setInvited] = useState([])
  const [openToAny, setOpenToAny] = useState(false)

  if (!entry) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-sm text-ink/60">This entry could not be found.</p>
      </div>
    )
  }

  const suggested = contributors.filter((c) => SUGGESTED_IDS.includes(c.id))

  function toggleInvite(id) {
    setInvited((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  function handleContinue() {
    updateEntry(entry.id, () => ({
      coAuthors: invited.map((id) => ({ id, contribution: 'context' })),
      status: 'awaiting-approval',
    }))
    navigate(`/village/publish/${entry.id}`)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl">Invite a co-author</h1>
      <p className="mt-1 text-sm text-ink/60">
        These contributors are already active on scaffolds related to {entry.title.en}.
      </p>

      <ul className="mt-6 divide-y divide-ink/10 rounded bg-white">
        {suggested.map((c) => {
          const isInvited = invited.includes(c.id)
          return (
            <li key={c.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div className="flex items-center gap-3">
                <PersonAvatar userId={c.id} size={40} />
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-ink/60">{c.bio}</p>
                  <p className="mt-0.5 text-xs text-moss">{c.contributionCount} prior contributions</p>
                </div>
              </div>
              <button
                onClick={() => toggleInvite(c.id)}
                className={clsx(
                  'shrink-0 rounded border px-3 py-1.5 text-xs',
                  isInvited
                    ? 'border-moss bg-moss text-white'
                    : 'border-ink/20 text-ink/70 hover:bg-cream'
                )}
              >
                {isInvited ? 'Invited' : 'Invite'}
              </button>
            </li>
          )
        })}
      </ul>

      <label className="mt-4 flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={openToAny}
          onChange={(e) => setOpenToAny(e.target.checked)}
        />
        Open to any contributor
      </label>

      <p className="mt-6 text-xs text-ink/50">
        For this prototype, a co-author's response is simulated instantly on continue.
      </p>

      <div className="mt-3">
        <PrimaryButton onClick={handleContinue}>Continue to Publish Approval</PrimaryButton>
      </div>
    </div>
  )
}
