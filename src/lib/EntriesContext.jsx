import { createContext, useContext, useState } from 'react'
import { entries as initialEntries } from '../data/entries'

const EntriesContext = createContext(null)

let nextId = 1000

export function EntriesProvider({ children }) {
  const [entries, setEntries] = useState(initialEntries)

  function getEntry(id) {
    return entries.find((e) => e.id === id)
  }

  function updateEntry(id, updater) {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updater(e) } : e))
    )
  }

  function addDraftEntry({
    title,
    dishSlug,
    primaryAuthor,
    origin,
    ingredients = '',
    method = '',
    seasonalNotes = '',
    aiTranscribed,
    source = null,
  }) {
    const id = `entry-draft-${nextId++}`
    const draft = {
      id,
      title,
      dishSlug,
      primaryAuthor,
      coAuthors: [],
      status: 'draft',
      sections: {
        origin,
        ingredients,
        method,
        seasonalNotes,
        variants: [],
      },
      meta: { aiTranscribed, edited: false, source },
      audioUrl: '/mock-audio/new-recording.mp3',
      heroImage: '/mock-images/placeholder.jpg',
      createdAt: new Date().toISOString().slice(0, 10),
      contributionCount: 0,
    }
    setEntries((prev) => [draft, ...prev])
    return draft
  }

  const publishedEntries = entries.filter((e) => e.status === 'published')

  return (
    <EntriesContext.Provider
      value={{ entries, getEntry, updateEntry, addDraftEntry, publishedEntries }}
    >
      {children}
    </EntriesContext.Provider>
  )
}

export function useEntries() {
  const ctx = useContext(EntriesContext)
  if (!ctx) throw new Error('useEntries must be used within an EntriesProvider')
  return ctx
}
