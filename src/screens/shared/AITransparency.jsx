const TOUCHPOINTS = [
  {
    title: 'Transcription',
    does: 'Turns your spoken words into text.',
    doesNot: "Never changes what you said.",
  },
  {
    title: 'Translation',
    does: 'Suggests a translation when needed.',
    doesNot: "A person reviews it before it's used.",
  },
  {
    title: 'Caption suggestions',
    does: "Suggests a caption for what you've captured.",
    doesNot: 'You can edit or ignore it.',
  },
  {
    title: 'Infographic formatting',
    does: "Turns an entry's existing information into a visual layout.",
    doesNot: "Doesn't add new information.",
  },
  {
    title: 'Photo enhancement',
    does: 'Adjusts crop and color of your real photo.',
    doesNot: 'Never generates a new image.',
  },
]

const NEVER_DOES = [
  "Never publishes anything without a human's explicit approval",
  'Never speaks as, or on behalf of, a village author',
  "Never generates imagery of a dish, ritual, or practice that wasn't actually photographed",
  "Never appears without a label — if you see AI-generated text or formatting anywhere in the app, it's marked",
]

export default function AITransparency() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-serif text-2xl">How AI Helps Here</h1>
      <p className="mt-2 text-sm text-ink/70">
        AI shows up in a few specific places in this app. Here's exactly what it does, and what it
        doesn't.
      </p>

      <ul className="mt-6 divide-y divide-ink/10">
        {TOUCHPOINTS.map((t) => (
          <li key={t.title} className="py-4">
            <p className="text-sm font-medium">{t.title}</p>
            <p className="mt-1 text-sm text-ink/80">{t.does}</p>
            <p className="mt-0.5 text-sm text-moss">{t.doesNot}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-l-2 border-moss bg-cream py-2 pl-4">
        <h2 className="font-serif text-lg">What AI never does here</h2>
        <ul className="mt-2 space-y-2">
          {NEVER_DOES.map((line) => (
            <li key={line} className="text-sm text-ink/80">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
