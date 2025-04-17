import { AxiosError } from 'axios'
import { ErrorResponse } from '../apiService';
import { toast } from 'sonner';

// Tipo para manejar respuestas de error de Axios
export interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
      error?: string;
      detail?: string;
      title?: string;
    };
    status?: number;
  };
  message?: string;
  code?: string;
}

// Función para formatear errores de Axios
export const formatAxiosError = (error: AxiosError | AxiosErrorResponse): ErrorResponse => {
  console.log('error en formatAxiosError', error)

  if (error.response) {
    const { data } = error.response as any;

    if (typeof data.error === 'string') {
      return {
        code: 0,
        messages: [data.error]
      };
    }

    if (data.error) {
      return data.error;
    }

    if (data?.error && (data.error.messages || data.error.message)) {
      return data.error;
    }

  }

  return {
    code: 0,
    messages: ['Ha ocurrido un error desconocido']
  };
};


export const showErrorToasts = (error: ErrorResponse | null, defaultMessage = 'Ocurrió un error inesperado'): void => {
  console.log('error en errorHandling', error)

  if (!error) {
    toast.error(error);
    return;
  }

  if (error.messages && error.messages.length > 0) {
    error.messages.forEach(message => {
      toast.error(message);
    });
    return;
  }

  if (error.message) {
    toast.error(error.message);
    return;
  }

  toast.error(defaultMessage);
}; 