import { ROLES } from './RoleContext'
import { findUserById } from '../data/users'

// Prototype has no real auth — a fixed "logged in as" user per role.
export const CURRENT_VILLAGE_AUTHOR_ID = 'va-hanh'
export const CURRENT_CONTRIBUTOR_ID = 'co-anh'
export const CURRENT_VISITOR_ID = 'vi-sarah'

export function currentUserIdForRole(role) {
  if (role === ROLES.VILLAGE) return CURRENT_VILLAGE_AUTHOR_ID
  if (role === ROLES.CONTRIBUTOR) return CURRENT_CONTRIBUTOR_ID
  return CURRENT_VISITOR_ID
}

export function currentUserForRole(role) {
  return findUserById(currentUserIdForRole(role))
}
