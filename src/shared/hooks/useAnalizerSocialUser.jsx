import { useState } from 'react';
import { analyzeSocialUser } from '../../services/api'; // Ajusta ruta según tu proyecto

export const useAnalyzeSocialUser = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async (username) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await analyzeSocialUser(username);

      if (res.success) {
        setData(res.data);
      } else {
        // Asegura que error sea string, si es objeto, stringify
        setError(
          typeof res.msg === 'string' ? res.msg : JSON.stringify(res.msg || 'Error desconocido')
        );
      }
    } catch (e) {
      // Manejo de errores inesperados (fallo en fetch, etc)
      setError(e.message || JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  };

  return {
    analyze,
    data,
    loading,
    error
  };
};
