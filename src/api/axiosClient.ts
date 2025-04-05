import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/authStore'

const REFRESH_TOKEN_NAME = 'refresh_token'

const API_URL = import.meta.env.VITE_API_URL

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState().auth
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = Cookies.get(REFRESH_TOKEN_NAME)
        
        if (!refreshToken) {
          useAuthStore.getState().auth.reset()
          return Promise.reject(error)
        }
        
        const response = await axios.post(
          `${API_URL}/users/refresh`,
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        )
        
        if (response.data && response.data.access_token) {
          useAuthStore.getState().auth.setAccessToken(response.data.access_token)
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`
          
          return axiosClient(originalRequest)
        }
      } catch (refreshError) {
        handleAuthFailure()
        return Promise.reject(refreshError)
      }
    }
    
    return Promise.reject(error)
  }
)

const handleAuthFailure = () => {
  Cookies.remove(REFRESH_TOKEN_NAME, {
    path: '/',
    secure: import.meta.env.PROD,
    sameSite: 'strict'
  })
  useAuthStore.getState().auth.reset()
  window.location.href = '/login'
}

export default axiosClient

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