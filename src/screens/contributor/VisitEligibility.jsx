import { Link } from 'react-router-dom'
import { useEntries } from '../../lib/EntriesContext'
import { CURRENT_CONTRIBUTOR_ID } from '../../lib/currentUser'
import PrimaryButton from '../../components/shared/PrimaryButton'
import SecondaryButton from '../../components/shared/SecondaryButton'

const ELIGIBILITY_THRESHOLD = 2

export default function VisitEligibility() {
  const { entries } = useEntries()
  const creditedCount = entries.filter((e) =>
    e.coAuthors.some((c) => c.id === CURRENT_CONTRIBUTOR_ID)
  ).length
  const eligible = creditedCount >= ELIGIBILITY_THRESHOLD

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl">Visit Eligibility</h1>

      {eligible ? (
        <>
          <p className="mt-3 text-sm text-ink/90">
            You've co-authored {creditedCount} entries — you're eligible to book a residency.
          </p>
          <PrimaryButton as={Link} to="/visitor/booking" className="mt-4">
            Book a Residency
          </PrimaryButton>
        </>
      ) : (
        <>
          <p className="mt-3 text-sm text-ink/90">
            You've co-authored {creditedCount} of {ELIGIBILITY_THRESHOLD} entries needed to book a
            residency. Contributing to an open scaffold is the fastest way to become eligible.
          </p>
          <SecondaryButton as={Link} to="/contributor" className="mt-4">
            Browse Open Scaffolds
          </SecondaryButton>
        </>
      )}
    </div>
  )
}
