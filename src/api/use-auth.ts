import { AxiosError } from 'axios'
import { useRouter } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import axiosClient from './axiosClient'
import { authService, LoginCredentials, RegisterCredentials } from './services/auth-service'

export const useAuth = () => {
  const router = useRouter()
  const { setUser, setAccessToken, reset } = useAuthStore((state) => state.auth)

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials)
      const { access_token, refresh_token, user } = response.data
      localStorage.setItem('refresh_token', refresh_token)
      setAccessToken(access_token)
      setUser(user)
      return { success: true, user: user }
    } catch (error) {
      if (error instanceof AxiosError) {
        return { 
          success: false, 
          error: error.response?.data?.error || 'Error en la autenticación' 
        }
      }
      return { success: false, error: 'Error desconocido' }
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await authService.register(credentials)
      return { success: true, data: response }
    } catch (error) {
      if (error instanceof AxiosError) {
        return { success: false, error: error.response?.data?.message || 'Error en el registro' }
      }
      return { success: false, error: 'Error desconocido' }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      await axiosClient.post('/auth/logout')
    } catch (error) {
      if (error instanceof AxiosError) {
        return { success: false, error: error.response?.data?.message || 'Error en el logout' }
      }
      return { success: false, error: 'Error desconocido' }
    } finally {
      reset()
      localStorage.removeItem('refresh_token')
      router.navigate({ to: '/' })
    }
  }

  const isAuthenticated = () => {
    const { user, accessToken } = useAuthStore.getState().auth
    const refreshToken = localStorage.getItem('refresh_token')
    
    return !!(accessToken && refreshToken) || !!user
  }

  const confirmEmail = async (token: string) => {
    try {
      const response = await authService.confirmEmail(token)
      return { success: true, data: response }
    } catch (error) {
      if (error instanceof AxiosError) {
        return { success: false, error: error.response?.data?.errors || 'Error en la confirmación de email' }
      }
      return { success: false, error: 'Error desconocido' }
    }
  }

  const setActiveAcademy = async (academyId: string) => {
    try {
      const response = await authService.setActiveAcademy(academyId)
      return { success: true, data: response }
    } catch (error) {
      if (error instanceof AxiosError) {
        return { success: false, error: error.response?.data?.message || 'Error en la asignación de academia' }
      }
      return { success: false, error: 'Error desconocido' }
    }
  }

  return {
    login,
    register,
    logout,
    isAuthenticated,
    confirmEmail,
    setActiveAcademy
  }
}