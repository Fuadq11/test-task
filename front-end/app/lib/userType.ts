
export type UserType = {
  id: number    
  name: string
  email: string
  roles: (string | { id: number; name: string; [key: string]: any })[]
  permissions: (string | { id: number; name: string; [key: string]: any })[]
}
