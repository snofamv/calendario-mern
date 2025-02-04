import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useApi<T, R>(
  baseURL: string,
  queryKey: string,
  enabled: boolean = true // Nuevo parámetro para controlar la ejecución automática
) {
  // 📌 GET (Obtener eventos)
  const fetchQuery = useQuery<T>({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await axios.get(baseURL);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled, // Se ejecutará solo si `enabled` es `true`
  });
  // 📌 POST (Crear evento)
  const validateLogin = useMutation<R, Error, T>({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseURL}`, data);
      return response.data;
    },
    onError: () => {
      console.error("Error en la autenticación");
    },
  });

  // 📌 POST (Crear evento)
  const createEvent = useMutation<R, Error, T>({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseURL}/new`, data);
      return response.data;
    },
  });

  // 📌 PATCH (Actualizar evento)
  const updateEvent = useMutation<R, Error, T>({
    mutationFn: async (data: any) => {
      const response = await axios.patch(`${baseURL}/update/${data._id}`, data);
      return response.data;
    },
  });

  return {
    fetchQuery: {
      ...fetchQuery,
      isLoading: fetchQuery.isLoading,
      isError: fetchQuery.isError,
      error: fetchQuery.error,
    },
    createEvent,
    updateEvent,
    validateLogin,
  };
}
