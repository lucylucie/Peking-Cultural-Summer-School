export const villageAuthors = [
  {
    id: 'va-hanh',
    name: 'Bà Nguyễn Thị Hạnh',
    role: 'village-author',
    bio: 'Keeper of chè lam and bánh tẻ recipes passed down through four generations.',
    specialties: ['che-lam', 'banh-te'],
    location: { x: 32, y: 40, label: "Bà Hạnh's household" },
  },
  {
    id: 'va-minh',
    name: 'Ông Trần Văn Minh',
    role: 'village-author',
    bio: 'Runs the family tương fermentation house on the edge of the old village wall.',
    specialties: ['tuong'],
    location: { x: 60, y: 65, label: "Ông Minh's fermentation house" },
  },
  {
    id: 'va-xuan',
    name: 'Bà Lê Thị Xuân',
    role: 'village-author',
    bio: 'Known across Duong Lam for her lunar new year chè lam variants.',
    specialties: ['che-lam'],
    location: { x: 45, y: 22, label: "Bà Xuân's household" },
  },
  {
    id: 'va-hung',
    name: 'Ông Phạm Đức Hùng',
    role: 'village-author',
    bio: 'Third-generation bánh tẻ maker, supplies the weekly village market.',
    specialties: ['banh-te'],
    location: { x: 70, y: 35, label: "Ông Hùng's household" },
  },
  {
    id: 'va-lan',
    name: 'Bà Đỗ Thị Lan',
    role: 'village-author',
    bio: 'Village elder and informal archivist of Duong Lam foodways.',
    specialties: ['general'],
    location: { x: 50, y: 78, label: "Bà Lan's household" },
  },
]

export const contributors = [
  {
    id: 'co-anh',
    name: 'Nguyễn Phương Anh',
    role: 'contributor',
    bio: 'Hanoi-based translator working between Vietnamese, English, and archival Nôm script.',
    contributionCount: 4,
    language: 'English',
  },
  {
    id: 'co-linh',
    name: 'Trần Thảo Linh',
    role: 'contributor',
    bio: 'Food anthropology graduate student researching Red River Delta fermentation practices.',
    contributionCount: 2,
  },
  {
    id: 'co-wei',
    name: 'Li Wei',
    role: 'contributor',
    bio: 'Diaspora contributor from Guangzhou, documents Sinosphere culinary parallels.',
    contributionCount: 3,
  },
  {
    id: 'co-mai',
    name: 'Phạm Thị Mai',
    role: 'contributor',
    bio: 'Illustrator contributing visual documentation for archive entries.',
    contributionCount: 5,
  },
  {
    id: 'co-duc',
    name: 'Vũ Minh Đức',
    role: 'contributor',
    bio: 'Independent oral historian recording elder interviews across Son Tay district.',
    contributionCount: 1,
  },
  {
    id: 'co-huong',
    name: 'Đặng Thu Hương',
    role: 'contributor',
    bio: 'Culinary school instructor contextualizing traditional methods for modern kitchens.',
    contributionCount: 2,
  },
  {
    id: 'co-jian',
    name: 'Zhang Jian',
    role: 'contributor',
    bio: 'Taiwan-based food writer tracing shared sweets traditions across the region.',
    contributionCount: 1,
  },
  {
    id: 'co-yen',
    name: 'Hoàng Thị Yến',
    role: 'contributor',
    bio: 'Diaspora contributor from Ho Chi Minh City, records family variants of village dishes.',
    contributionCount: 3,
  },
]

export const visitors = [
  {
    id: 'vi-sarah',
    name: 'Sarah Coleman',
    role: 'visitor',
    bio: 'First-time visitor, applied for a co-authoring residency in the fall season.',
    visitsCompleted: 0,
    language: 'English',
  },
  {
    id: 'vi-james',
    name: 'James Whitfield',
    role: 'visitor',
    bio: 'Returning visitor, contributed to the Chè kho entry during his spring visit.',
    visitsCompleted: 1,
  },
]

export function findUserById(id) {
  return (
    villageAuthors.find((u) => u.id === id) ||
    contributors.find((u) => u.id === id) ||
    visitors.find((u) => u.id === id)
  )
}
