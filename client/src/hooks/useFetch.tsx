import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

function useFetch<T>(url: string, options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any, onSuccess?: (data: T) => void) => {
    setLoading(true);
    try {
      const response = await axios({
        url,
        method,
        data: body,
        ...options,
      });
      setData(response.data);
      if (onSuccess) {
        onSuccess(response.data); // Call the callback function with the fetched data
      }
    } catch (err) {
        if (err instanceof Error)
            setError(err.message);
        else
            setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}

export default useFetch;
