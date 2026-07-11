export const entries = [
  {
    id: 'entry-che-lam',
    title: {
      vi: 'Chè lam Đường Lâm',
      en: 'Duong Lam Chè Lam',
      zh: '梁林糯米糖',
    },
    dishSlug: 'che-lam',
    primaryAuthor: 'va-hanh',
    coAuthors: [
      { id: 'co-anh', contribution: 'translation' },
      { id: 'co-mai', contribution: 'illustration' },
    ],
    status: 'published',
    sections: {
      origin:
        'Made in Bà Hạnh\'s family kitchen every lunar new year since her grandmother\'s time, chè lam was traditionally offered to guests as a sign of a well-kept household.',
      ingredients:
        'Glutinous rice flour, roasted rice, ginger, peanuts, sugarcane syrup, ginger juice.',
      method:
        'Roasted sticky rice is ground fine, folded into hot ginger syrup, pressed flat while warm, then cut into bars and dusted with roasted rice flour.',
      seasonalNotes:
        'Made primarily in the weeks before Tết; the ginger ratio increases in colder years, by Bà Hạnh\'s account.',
      variants: [
        { author: 'co-jian', note: 'A close cousin to Taiwanese peanut nougat, though the ginger note is distinctly Duong Lam.' },
      ],
    },
    audioUrl: '/mock-audio/che-lam-hanh.mp3',
    heroImage: '/mock-images/che-lam.jpg',
    createdAt: '2026-01-14',
    contributionCount: 3,
  },
  {
    id: 'entry-tuong',
    title: {
      vi: 'Tương Đường Lâm',
      en: 'Duong Lam Fermented Soy Sauce',
      zh: '梁林豆酱',
    },
    dishSlug: 'tuong',
    primaryAuthor: 'va-minh',
    coAuthors: [{ id: 'co-linh', contribution: 'context' }],
    status: 'published',
    sections: {
      origin:
        'Ông Minh\'s household has fermented tương in the same clay jars, positioned along the south-facing wall for maximum sun, for three generations.',
      ingredients: 'Glutinous rice, soybeans, salt, well water.',
      method:
        'Rice is fermented into mold starter, mixed with boiled soybeans and brine, then left to mature in sunlight for 3 to 6 months, stirred weekly.',
      seasonalNotes:
        'Started only in the fourth or fifth lunar month, when sun exposure is reliable enough for consistent fermentation.',
      variants: [],
    },
    audioUrl: '/mock-audio/tuong-minh.mp3',
    heroImage: '/mock-images/tuong.jpg',
    createdAt: '2025-11-02',
    contributionCount: 1,
  },
  {
    id: 'entry-banh-te',
    title: {
      vi: 'Bánh tẻ',
      en: 'Rice Flour Cake',
      zh: '米粉糕',
    },
    dishSlug: 'banh-te',
    primaryAuthor: 'va-hung',
    coAuthors: [
      { id: 'co-anh', contribution: 'translation' },
      { id: 'co-huong', contribution: 'context' },
    ],
    status: 'published',
    sections: {
      origin:
        'Ông Hùng supplies bánh tẻ to the village market every week; the recipe is his father\'s, adjusted slightly for a firmer filling.',
      ingredients: 'Rice flour, pork shoulder, wood ear mushroom, shallot, dong leaves.',
      method:
        'Rice flour batter is cooked into a paste, filled with seasoned pork and mushroom, wrapped in dong leaves, and steamed.',
      seasonalNotes: 'Made year-round, though dong leaves are freshest in early summer.',
      variants: [
        { author: 'co-huong', note: 'Some Son Tay households substitute banana leaf for dong leaf when out of season.' },
      ],
    },
    audioUrl: '/mock-audio/banh-te-hung.mp3',
    heroImage: '/mock-images/banh-te.jpg',
    createdAt: '2025-09-20',
    contributionCount: 2,
  },
  {
    id: 'entry-keo-doi',
    title: {
      vi: 'Kẹo dồi',
      en: 'Peanut Candy',
      zh: '花生糖卷',
    },
    dishSlug: 'keo-doi',
    primaryAuthor: 'va-xuan',
    coAuthors: [],
    status: 'awaiting-approval',
    sections: {
      origin:
        'Bà Xuân recalls kẹo dồi being made in batches for children during the autumn festival.',
      ingredients: 'Sugarcane syrup, roasted peanuts, rice paper.',
      method:
        'Syrup is pulled and folded repeatedly until aerated and pale, then wrapped around crushed peanuts and cut into rounds.',
      seasonalNotes: '',
      variants: [],
    },
    audioUrl: '/mock-audio/keo-doi-xuan.mp3',
    heroImage: '/mock-images/keo-doi.jpg',
    createdAt: '2026-03-01',
    contributionCount: 0,
  },
  {
    id: 'entry-ga-mia',
    title: {
      vi: 'Gà Mía',
      en: 'Mía Chicken',
      zh: '𤅶鸡',
    },
    dishSlug: 'ga-mia',
    primaryAuthor: 'va-lan',
    coAuthors: [{ id: 'co-duc', contribution: 'context' }],
    status: 'draft',
    sections: {
      origin:
        'Bà Lan is documenting the raising and preparation of the local Mía chicken breed, historically reserved for ceremonial meals.',
      ingredients: '',
      method: '',
      seasonalNotes: '',
      variants: [],
    },
    audioUrl: '/mock-audio/ga-mia-lan.mp3',
    heroImage: '/mock-images/ga-mia.jpg',
    createdAt: '2026-05-18',
    contributionCount: 1,
  },
  {
    id: 'entry-che-kho',
    title: {
      vi: 'Chè kho',
      en: 'Dense Mung Bean Sweet',
      zh: '绿豆糕',
    },
    dishSlug: 'che-kho',
    primaryAuthor: 'va-hanh',
    coAuthors: [
      { id: 'co-wei', contribution: 'context' },
      { id: 'co-yen', contribution: 'translation' },
    ],
    status: 'published',
    sections: {
      origin:
        'A second specialty of Bà Hạnh\'s household, chè kho is prepared for ancestor altars during Tết.',
      ingredients: 'Mung beans, sugar, a trace of vanilla or jasmine essence.',
      method:
        'Steamed mung beans are mashed fine, cooked slowly with sugar until dense enough to hold a knife-cut shape, then pressed into molds.',
      seasonalNotes: 'Almost exclusively a Tết-season dish; rarely made outside the two weeks before the new year.',
      variants: [
        { author: 'co-wei', note: 'Similar in texture to Cantonese mung bean cake, though unsweetened jasmine tea is sometimes used in Guangzhou versions.' },
      ],
    },
    audioUrl: '/mock-audio/che-kho-hanh.mp3',
    heroImage: '/mock-images/che-kho.jpg',
    createdAt: '2025-12-28',
    contributionCount: 2,
  },
]

export function getEntryById(id) {
  return entries.find((e) => e.id === id)
}

export function getPublishedEntries() {
  return entries.filter((e) => e.status === 'published')
}
