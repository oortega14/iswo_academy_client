// Re-exportamos todo lo necesario para usar fuera del módulo api
export { default as axiosClient, api } from './axiosClient'

// Servicio API con métodos estandarizados
export { apiService, type ApiResponse } from './apiService'

// Utilidades de autenticación
export { initializeAuth, handleAuthFailure, REFRESH_TOKEN_NAME } from './auth/authUtils'

// Utilidades para manejo de errores
export { formatAxiosError, type AxiosErrorResponse } from './utils/errorHandling'

export { useAuth } from './hooks/use-auth' 