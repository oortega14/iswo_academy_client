import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/authStore'
import axiosClient from '../axiosClient'

export const REFRESH_TOKEN_NAME = 'refresh_token'
export const API_URL = import.meta.env.VITE_API_URL

export const initializeAuth = async () => {
  try {
    const refreshToken = Cookies.get(REFRESH_TOKEN_NAME)

    if (!refreshToken) {
      return { success: false }
    }

    const response = await axiosClient.post(
      `${API_URL}/users/refresh`,
      { refresh_token: refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    )

    if (response.data && response.data.access_token) {
      useAuthStore.getState().auth.setAccessToken(response.data.access_token)
      useAuthStore.getState().auth.setUser(response.data.user)
      return { success: true }
    }

    return { success: false }
  } catch (error) {
    console.error('Error inicializando autenticación:', error)
    return { success: false }
  }
}

export const handleAuthFailure = () => {
  Cookies.remove(REFRESH_TOKEN_NAME, {
    path: '/',
    secure: import.meta.env.PROD,
    sameSite: 'strict'
  })
  useAuthStore.getState().auth.reset()

  // Guardar un mensaje en localStorage
  localStorage.setItem('auth_message', 'session_expired')

  // Redirigir
  window.location.href = '/sign-in'
} 