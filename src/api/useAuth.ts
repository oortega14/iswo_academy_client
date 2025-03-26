import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import axiosClient from './axiosClient'

// Constantes para los nombres de cookies
const REFRESH_TOKEN_NAME = 'refresh_token'

// Tipos para los datos de autenticación
interface LoginCredentials {
  email: string
  password: string
}

interface AuthResponse {
  access_token: string
  refresh_token: string
  user: {
    accountNo: string
    email: string
    role: string[]
    exp: number
  }
}

export const useAuth = () => {
  const router = useRouter()
  const { setUser, setAccessToken, reset } = useAuthStore((state) => state.auth)

  // Función para iniciar sesión
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axiosClient.post<AuthResponse>('/auth/login', credentials)
      
      const { access_token, refresh_token, user } = response.data
      
      // Guardamos el access_token en el store (solo en memoria)
      setAccessToken(access_token)
      
      // Guardamos el refresh_token en una cookie
      Cookies.set(REFRESH_TOKEN_NAME, refresh_token, {
        expires: 1, // 1 día
        secure: import.meta.env.PROD,
        sameSite: 'strict',
        path: '/'
      })
      
      // Guardamos la información del usuario en el store
      setUser(user)
      
      return { success: true, user }
    } catch (error) {
      if (error instanceof AxiosError) {
        return { 
          success: false, 
          error: error.response?.data?.message || 'Error en la autenticación' 
        }
      }
      return { success: false, error: 'Error desconocido' }
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    try {
      // Opcionalmente, podemos hacer una petición al backend para invalidar el token
      await axiosClient.post('/auth/logout')
    } catch (error) {
      // Si hay error en la petición, no hacemos nada especial
    } finally {
      // Limpiamos los tokens y la información de usuario
      reset()
      
      // Eliminamos la cookie del refresh token
      Cookies.remove(REFRESH_TOKEN_NAME)
      
      // Redirigimos al usuario a la página de login
      router.navigate({ to: '/sign-in' })
    }
  }

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    const { user, accessToken } = useAuthStore.getState().auth
    const refreshToken = Cookies.get(REFRESH_TOKEN_NAME)
    
    // Consideramos que el usuario está autenticado si tiene un token de acceso
    // y un refresh token, o si tiene información de usuario
    return !!(accessToken && refreshToken) || !!user
  }

  return {
    login,
    logout,
    isAuthenticated
  }
} 