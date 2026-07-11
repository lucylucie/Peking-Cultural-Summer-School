export const revenue = {
  'va-hanh': {
    period: 'this-quarter',
    visitFees: 4200000,
    revenueSharePercent: 60,
    revenueShareAmount: 2520000,
    brandPartnershipIncome: 500000,
    currency: 'VND',
    split: {
      village: 60,
      platform: 25,
      contributorPool: 15,
    },
  },
  'va-minh': {
    period: 'this-quarter',
    visitFees: 0,
    revenueSharePercent: 60,
    revenueShareAmount: 0,
    brandPartnershipIncome: 0,
    currency: 'VND',
    split: {
      village: 60,
      platform: 25,
      contributorPool: 15,
    },
  },
}

export function getRevenueForAuthor(authorId) {
  return revenue[authorId]
}
