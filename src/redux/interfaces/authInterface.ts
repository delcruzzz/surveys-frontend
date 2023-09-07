export interface AuthState {
  isLoading: boolean
  token: string | null
  isAuthenticated: boolean
  error: string | null
  user: AuthUserResponse
}

export interface AuthUserResponse {
  id: number
  name: string
  identityCard: string
  cellPhoneNumber: string
  roles: AuthUserRoles[]
  token: string
}

export interface AuthUserRoles {
  name: string
}
