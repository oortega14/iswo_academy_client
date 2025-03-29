import api from '../axiosClient'

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

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/users/sign_in', credentials)
    return response.data
  },
  register: async (credentials: RegisterCredentials) => {
    const response = await api.post('/users', credentials)
    return response.data
  },
  logout: async () => {
    const response = await api.post('/users/sign_out')
    return response.data
  },
  confirmEmail: async (token: string) => {
    const response = await api.post(`/users/confirmation`, { confirmation_token: token })
    return response.data
  },
  refresh: async (refreshToken: string) => {
    const response = await api.post('/users/refresh', { refresh_token: refreshToken })
    return response.data
  },
  setActiveAcademy: async (academyId: string) => {
    const response = await api.post(`/users/set_active_academy`, { academy_id: academyId })
    return response.data
  }
}