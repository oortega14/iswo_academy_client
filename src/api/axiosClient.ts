import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/authStore'

// Constantes para los nombres de cookies
const REFRESH_TOKEN_NAME = 'refresh_token'

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Creamos una instancia de axios con configuración por defecto
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para añadir el token de autorización a las peticiones
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Obtenemos el token desde el store
    const { accessToken } = useAuthStore.getState().auth
    
    // Si existe un token, lo añadimos al header de autorización
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar respuestas y errores
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    
    // Si es un error 401 (Unauthorized) y no es un retry, intentamos refrescar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // Obtenemos el refresh_token desde las cookies
        const refreshToken = Cookies.get(REFRESH_TOKEN_NAME)
        
        if (!refreshToken) {
          // Si no hay refresh token, limpiamos la sesión y rechazamos la promesa
          useAuthStore.getState().auth.reset()
          return Promise.reject(error)
        }
        
        // Hacemos la petición para obtener un nuevo token usando el refresh token
        const response = await axios.post(
          `${API_URL}/auth/refresh`,
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        )
        
        // Si la respuesta es exitosa, actualizamos el token en el store
        if (response.data && response.data.access_token) {
          // Guardamos el nuevo access token en el store (solo en memoria)
          useAuthStore.getState().auth.setAccessToken(response.data.access_token)
          
          // Si hay un nuevo refresh token en la respuesta, actualizamos la cookie
          if (response.data.refresh_token) {
            Cookies.set(REFRESH_TOKEN_NAME, response.data.refresh_token, {
              expires: 1, // 1 día
              secure: import.meta.env.PROD,
              sameSite: 'strict',
              path: '/'
            })
          }
          
          // Actualizamos la cabecera de autorización en la petición original
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`
          
          // Reintentamos la petición original con el nuevo token
          return axiosClient(originalRequest)
        }
      } catch (refreshError) {
        // Si hay un error al refrescar el token, limpiamos la sesión
        useAuthStore.getState().auth.reset()
        
        // Podríamos redirigir a la página de login aquí si fuera necesario
        // pero normalmente el queryCache en main.tsx ya maneja esto
      }
    }
    
    // Si no es un error 401 o no se pudo refrescar el token, rechazamos la promesa
    return Promise.reject(error)
  }
)

export default axiosClient

// Exportamos funciones helper para las peticiones HTTP
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) => 
    axiosClient.get<T>(url, config).then((response) => response.data),
  
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    axiosClient.post<T>(url, data, config).then((response) => response.data),
  
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    axiosClient.put<T>(url, data, config).then((response) => response.data),
  
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    axiosClient.patch<T>(url, data, config).then((response) => response.data),
  
  delete: <T>(url: string, config?: AxiosRequestConfig) => 
    axiosClient.delete<T>(url, config).then((response) => response.data),
} 