import { createContext, useContext, useState } from 'react'

const RoleContext = createContext(null)

export const ROLES = {
  VILLAGE: 'village-author',
  CONTRIBUTOR: 'contributor',
  VISITOR: 'visitor',
}

export function RoleProvider({ children }) {
  const [role, setRole] = useState(ROLES.VILLAGE)
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within a RoleProvider')
  return ctx
}
