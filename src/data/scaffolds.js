export const scaffolds = [
  {
    id: 'scaffold-tet-sweets',
    prompt: 'Which Duong Lam sweets do you remember from Tết in your household?',
    tags: ['needs-translation', 'needs-context'],
    createdAt: '2026-02-02',
    graduatedTo: 'entry-che-lam',
    comments: [
      {
        id: 'c1',
        authorId: 'co-jian',
        type: 'regional-variant',
        text: 'In parts of Taiwan we make a very similar peanut nougat, though ours skips the ginger entirely. The Duong Lam version\'s ginger note is distinct.',
        createdAt: '2026-02-03',
      },
      {
        id: 'c2',
        authorId: 'co-yen',
        type: 'family-memory',
        text: 'My grandmother always let the children cut the chè lam into bars — it was the one kitchen task we were trusted with before Tết.',
        createdAt: '2026-02-04',
      },
      {
        id: 'c3',
        authorId: 'co-huong',
        type: 'dialectal-term',
        text: 'Some older Son Tay households call the roasted rice coating "bột rang" rather than the more common term used elsewhere in the delta.',
        createdAt: '2026-02-05',
      },
      {
        id: 'c4',
        authorId: 'co-anh',
        type: 'correction',
        text: 'Small correction on the draft: it\'s sugarcane syrup, not cane sugar directly — the distinction matters for the texture description.',
        createdAt: '2026-02-06',
      },
    ],
  },
  {
    id: 'scaffold-fermentation-practices',
    prompt: 'How does your family time and manage fermentation for tương or other preserved foods?',
    tags: ['needs-context', 'needs-illustration'],
    createdAt: '2026-04-10',
    graduatedTo: null,
    comments: [
      {
        id: 'c5',
        authorId: 'co-wei',
        type: 'regional-variant',
        text: 'Cantonese soybean paste uses a shorter fermentation window, usually under two months, and rarely relies on direct sun exposure the way this description does.',
        createdAt: '2026-04-11',
      },
      {
        id: 'c6',
        authorId: 'co-duc',
        type: 'family-memory',
        text: 'I remember my grandfather checking the jars every morning before breakfast, tasting a spoonful straight from the lid to judge how many weeks were left.',
        createdAt: '2026-04-12',
      },
      {
        id: 'c7',
        authorId: 'co-linh',
        type: 'dialectal-term',
        text: 'The starter mold is sometimes called "mốc tương" locally, distinct from the more generic "men" used in other fermentation contexts.',
        createdAt: '2026-04-13',
      },
      {
        id: 'c8',
        authorId: 'co-huong',
        type: 'correction',
        text: 'Worth noting the brine ratio varies significantly by household — this draft should probably say "a typical ratio" rather than stating one fixed measurement.',
        createdAt: '2026-04-14',
      },
    ],
  },
]

export function getScaffoldById(id) {
  return scaffolds.find((s) => s.id === id)
}
