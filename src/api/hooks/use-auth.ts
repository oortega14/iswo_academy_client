import { useRouter } from '@tanstack/react-router'
import { AuthResponse, useAuthStore } from '@/stores/authStore'
import { authService, LoginCredentials, RegisterCredentials } from '../services/auth-service'
import { type ApiResponse } from '@/api'
import Cookies from 'js-cookie'


export const useAuth = () => {
  const router = useRouter()
  const { setUser, setAccessToken, reset } = useAuthStore((state) => state.auth)

  const register = async (credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> => {
    return await authService.register(credentials)
  }

  const login = async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await authService.login(credentials)

    if (response.success && response.data) {
      const { access_token, refresh_token, user } = response.data

      Cookies.set('refresh_token', refresh_token, {
        expires: 1,
        secure: import.meta.env.PROD,
        sameSite: 'strict',
        path: '/'
      })

      setAccessToken(access_token)
      setUser(user)
    }

    return response
  }

  const logout = async (): Promise<ApiResponse<any>> => {
    const response = await authService.logout()

    // Independientemente del resultado, limpiamos el estado local
    reset()
    Cookies.remove('refresh_token', {
      path: '/',
      secure: import.meta.env.PROD,
      sameSite: 'strict'
    })
    router.navigate({ to: '/' })

    return {
      success: response.success,
      error: response.error
    }
  }

  const isAuthenticated = () => {
    const { user, accessToken } = useAuthStore.getState().auth
    const refreshToken = Cookies.get('refresh_token')

    return !!(accessToken && refreshToken) || !!user
  }

  const confirmEmail = async (token: string): Promise<ApiResponse<any>> => {
    const response = await authService.confirmEmail(token)
    return {
      success: response.success,
      data: response.data,
      error: response.error
    }
  }

  const setActiveAcademy = async (academyId: string): Promise<ApiResponse<any>> => {
    const response = await authService.setActiveAcademy(academyId)
    return {
      success: response.success,
      data: response.data,
      error: response.error
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