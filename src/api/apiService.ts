import { AxiosError } from 'axios'
import axiosClient, { api } from './axiosClient'
import { AxiosErrorResponse, formatAxiosError } from './utils/errorHandling'

// Interfaz para respuestas de la API
export interface ApiResponse<T> {
  data: T | null;
  error: ErrorResponse | null;
  status: number;
  success: boolean;
}

export interface ErrorResponse {
  code?: number;
  messages?: string[];
  message?: string;
}

export class ApiService {
  private handleResponse<T>(response: any): ApiResponse<T> {
    return {
      data: response.data,
      error: null,
      status: response.status,
      success: true
    };
  }

  // Método genérico para manejar los errores
  private handleError(error: any): ApiResponse<any> {
    const errorResponse = formatAxiosError(error as AxiosError | AxiosErrorResponse);
    return {
      data: null,
      error: errorResponse,
      status: error.response?.status || 0,
      success: false
    };
  }

  // GET: Obtener todos los registros
  async getAll<T>(endpoint: string): Promise<ApiResponse<T[]>> {
    try {
      const response = await api.get<T[]>(endpoint);
      return this.handleResponse<T[]>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // GET: Obtener un registro por ID
  async getById<T>(endpoint: string, id: string): Promise<ApiResponse<T>> {
    try {
      const response = await api.get<T>(`${endpoint}/${id}`);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // POST: Crear un nuevo registro
  async create<T, B = Partial<T>>(endpoint: string, data: B): Promise<ApiResponse<T>> {
    try {
      const response = await api.post<T>(endpoint, data);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PUT: Actualizar un registro completo
  async update<T, B = Partial<T>>(endpoint: string, id: string, data: B): Promise<ApiResponse<T>> {
    try {
      const response = await api.put<T>(`${endpoint}/${id}`, data);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PATCH: Actualizar parcialmente un registro
  async patch<T, B = Partial<T>>(endpoint: string, id: string, data: B): Promise<ApiResponse<T>> {
    try {
      const response = await api.patch<T>(`${endpoint}/${id}`, data);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // DELETE: Eliminar un registro
  async delete<T>(endpoint: string, id: string): Promise<ApiResponse<T>> {
    try {
      const response = await api.delete<T>(`${endpoint}/${id}`);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Método para peticiones personalizadas
  async custom<T, B = any>(
    endpoint: string,
    method: string,
    body?: B
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosClient({
        method,
        url: endpoint,
        data: body
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

// Exportar una instancia única del servicio
export const apiService = new ApiService(); 