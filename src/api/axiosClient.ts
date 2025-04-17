import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/authStore'
import { API_URL, REFRESH_TOKEN_NAME, handleAuthFailure } from './auth/authUtils'

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
      const isAuthRoute = originalRequest.url && (
        originalRequest.url.includes('/sign_in') ||
        originalRequest.url.includes('/sign_up')
      );
      if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
        originalRequest._retry = true
        
        try {
          const refreshToken = Cookies.get(REFRESH_TOKEN_NAME)

          if (!refreshToken) {
            handleAuthFailure()
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
          } else {
            handleAuthFailure()
            return Promise.reject(error)
          }
        } catch (refreshError) {
          handleAuthFailure()
          return Promise.reject(refreshError)
        }
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosClient.get<T>(url, config),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosClient.post<T>(url, data, config),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosClient.put<T>(url, data, config),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosClient.patch<T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosClient.delete<T>(url, config),
}
