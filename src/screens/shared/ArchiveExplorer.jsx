import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useEntries } from '../../lib/EntriesContext'
import { findUserById } from '../../data/users'
import { dishLabels } from '../../lib/tokens'
import EntryCard from '../../components/shared/EntryCard'

export default function ArchiveExplorer() {
  const { publishedEntries } = useEntries()
  const [loading, setLoading] = useState(true)
  const [dishFilter, setDishFilter] = useState(null)
  const [contributorFilter, setContributorFilter] = useState(null)
  const [sortRecent, setSortRecent] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const dishOptions = useMemo(
    () => [...new Set(publishedEntries.map((e) => e.dishSlug))],
    [publishedEntries]
  )

  const contributorOptions = useMemo(() => {
    const ids = new Set()
    publishedEntries.forEach((e) => e.coAuthors.forEach((c) => ids.add(c.id)))
    return [...ids]
  }, [publishedEntries])

  const filtered = useMemo(() => {
    let result = publishedEntries
    if (dishFilter) result = result.filter((e) => e.dishSlug === dishFilter)
    if (contributorFilter)
      result = result.filter((e) => e.coAuthors.some((c) => c.id === contributorFilter))
    if (sortRecent) {
      result = [...result].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    }
    return result
  }, [publishedEntries, dishFilter, contributorFilter, sortRecent])

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl">Duong Lam Food Archive</h1>
      <p className="mt-1 text-sm text-ink/60">
        A living archive of Duong Lam foodways, co-authored by villagers and contributors.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {dishOptions.map((slug) => (
          <button
            key={slug}
            onClick={() => setDishFilter(dishFilter === slug ? null : slug)}
            className={clsx(
              'rounded border px-3 py-1 text-xs transition-colors',
              dishFilter === slug
                ? 'border-terracotta bg-terracotta text-white'
                : 'border-ink/20 text-ink/70 hover:bg-white'
            )}
          >
            {dishLabels[slug] ?? slug}
          </button>
        ))}
        {contributorOptions.map((id) => {
          const user = findUserById(id)
          return (
            <button
              key={id}
              onClick={() => setContributorFilter(contributorFilter === id ? null : id)}
              className={clsx(
                'rounded border px-3 py-1 text-xs transition-colors',
                contributorFilter === id
                  ? 'border-moss bg-moss text-white'
                  : 'border-ink/20 text-ink/70 hover:bg-white'
              )}
            >
              {user?.name ?? id}
            </button>
          )
        })}
        <button
          onClick={() => setSortRecent((v) => !v)}
          className={clsx(
            'rounded border px-3 py-1 text-xs transition-colors',
            sortRecent
              ? 'border-terracotta bg-terracotta text-white'
              : 'border-ink/20 text-ink/70 hover:bg-white'
          )}
        >
          Recently updated
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded bg-white">
              <div className="aspect-[4/3] w-full bg-ink/10" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 rounded bg-ink/10" />
                <div className="h-3 w-1/2 rounded bg-ink/10" />
              </div>
            </div>
          ))}

        {!loading && filtered.map((entry) => <EntryCard key={entry.id} entry={entry} />)}
      </div>

      {!loading && filtered.length === 0 && publishedEntries.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink/60">
          The archive starts with its first scaffold post — check back soon as village authors
          begin recording their first entries.
        </p>
      )}

      {!loading && filtered.length === 0 && publishedEntries.length > 0 && (
        <p className="mt-10 text-center text-sm text-ink/60">
          No entries match this filter yet.
        </p>
      )}
    </div>
  )
}
