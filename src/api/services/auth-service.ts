import { apiService, type ApiResponse } from '@/api'
import { AuthUser } from '@/stores/authStore'

export interface LoginCredentials {
  user: {
    email: string
    password: string
  }
}

export interface RegisterCredentials {
  user: {
    email: string
    user_detail_attributes: {
      first_name: string
      last_name: string
    }
  }
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  user: AuthUser
}

export const authService = {
  register: (credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> => {
    return apiService.create<AuthResponse, RegisterCredentials>('/users', credentials)
  },

  login: (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    return apiService.create<AuthResponse, LoginCredentials>('/users/sign_in', credentials)
  },

  logout: (): Promise<ApiResponse<any>> => {
    return apiService.create<any>('/users/sign_out', {})
  },

  confirmEmail: (token: string): Promise<ApiResponse<any>> => {
    return apiService.create<any>('/users/confirmation', { confirmation_token: token })
  },

  refresh: (refreshToken: string): Promise<ApiResponse<AuthResponse>> => {
    return apiService.create<AuthResponse>('/users/refresh', { refresh_token: refreshToken })
  },

  setActiveAcademy: (academyId: string): Promise<ApiResponse<any>> => {
    return apiService.create<any>('/users/set_active_academy', { academy_id: academyId })
  }
}
