import { useState, useEffect } from 'react';
import { apiService } from '../apiService';

interface UseFetchByIdProps<T> {
  endpoint: string;
  id: string;
  setLoadingCallback?: (loading: boolean) => void;
  initialData?: T;
}

const useFetchById = <T>({ 
  endpoint, 
  id,
  setLoadingCallback, 
  initialData 
}: UseFetchByIdProps<T>) => {
  const [data, setData] = useState<T | null>(initialData || null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setLoadingCallback?.(true);
      const response = await apiService.getById<T>(endpoint, id);
      
      if (response.success) {
        setData(response.data);
        setError(null);
      } else {
        setError(response.error?.message || 'Error desconocido');
        console.error('Error en la petición:', response.error);
      }
      setLoadingCallback?.(false);
    };

    fetchData();
  }, [endpoint, id]);

  return { data, error };
};

export default useFetchById; 