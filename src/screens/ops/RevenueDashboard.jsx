import { useState } from 'react'
import clsx from 'clsx'
import { getRevenueForAuthor } from '../../data/revenue'
import { CURRENT_VILLAGE_AUTHOR_ID } from '../../lib/currentUser'

const ALL_TIME_MULTIPLIER = 4.2

function formatVnd(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫'
}

export default function RevenueDashboard() {
  const [period, setPeriod] = useState('this-quarter')
  const revenue = getRevenueForAuthor(CURRENT_VILLAGE_AUTHOR_ID)

  if (!revenue) {
    return (
      <div className="mx-auto max-w-xl px-4 py-8">
        <h1 className="text-2xl">Revenue</h1>
        <p className="mt-3 text-sm text-ink/60">
          No revenue recorded yet — this fills in once your first hosted visit is completed.
        </p>
      </div>
    )
  }

  const factor = period === 'all-time' ? ALL_TIME_MULTIPLIER : 1
  const visitFees = revenue.visitFees * factor
  const revenueShareAmount = revenue.revenueShareAmount * factor
  const brandIncome = revenue.brandPartnershipIncome * factor
  const isZero = visitFees === 0

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl">Revenue</h1>

      <div className="mt-4 flex gap-2">
        {['this-quarter', 'all-time'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={clsx(
              'rounded border px-3 py-1 text-xs',
              period === p ? 'border-terracotta bg-terracotta text-white' : 'border-ink/20 text-ink/70'
            )}
          >
            {p === 'this-quarter' ? 'This quarter' : 'All time'}
          </button>
        ))}
      </div>

      {isZero ? (
        <p className="mt-8 text-sm text-ink/60">
          No visit fees recorded for this period yet — figures will appear once your first hosted
          visit is completed.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          <div className="rounded bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-ink/50">Visit fees</p>
            <p className="mt-1 text-2xl font-serif">{formatVnd(visitFees)}</p>
          </div>
          <div className="rounded bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-ink/50">
              Your revenue share ({revenue.revenueSharePercent}%)
            </p>
            <p className="mt-1 text-2xl font-serif">{formatVnd(revenueShareAmount)}</p>
          </div>
          <div className="rounded bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-ink/50">
              Brand partnership income
            </p>
            <p className="mt-1 text-2xl font-serif">{formatVnd(brandIncome)}</p>
          </div>
        </div>
      )}

      <div className="mt-6 rounded bg-moss/10 p-4 text-sm text-ink/80">
        <p className="font-medium text-moss">How the split works</p>
        <p className="mt-1">
          {revenue.split.village}% stays with the hosting village author, {revenue.split.platform}%
          supports the LA platform, and {revenue.split.contributorPool}% funds the contributor
          pool that supports translation and context work across the archive.
        </p>
      </div>
    </div>
  )
}
