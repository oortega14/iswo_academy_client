import { create } from 'zustand'

export interface AuthUser {
  id: number
  email: string
  is_super_admin: boolean
  is_active: boolean
  is_profile_completed: boolean
  active_academy_id: number | null
  wizard_step: string | null
  profile_picture: string | null
  user_detail: UserDetail
  user_academies: UserAcademy[]
}

interface UserDetail {
  id: number
  first_name: string | null
  last_name: string | null
  birth_date: string | null
  phone: string | null
  dni: string | null
  gender: string | null
  username: string | null
  address: Address | null
  social_networks: SocialNetwork[]
  created_at?: string
  updated_at?: string
}

interface Address {
  id: number
  address: string | null
  city: string | null
  province: string | null
  country: string | null
  postal_code: string | null
  created_at?: string
  updated_at?: string
}

interface SocialNetwork {
  id: number
  platform: string | null
  url: string | null
  user_detail_id: number
  created_at?: string
  updated_at?: string
}

interface UserAcademy {
  id: number
  academy_id: number
  user_id: number
  role: string
  created_at?: string
  updated_at?: string
}

export interface AuthResponse {
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
}


interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  return {
    auth: {
      user: null,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: '',
      setAccessToken: (accessToken) =>
        set((state) => {
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      resetAccessToken: () =>
        set((state) => {
          return { ...state, auth: { ...state.auth, accessToken: '' } }
        }),
      reset: () =>
        set((state) => {
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '' },
          }
        }),
    },
  }
})
