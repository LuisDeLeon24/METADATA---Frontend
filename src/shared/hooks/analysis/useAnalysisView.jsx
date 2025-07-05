import { useState } from 'react';
import { getAnalyses } from '../../../services';

export const useAnalysisView = () => {
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalyses = async () => {
    try {
      setIsLoading(true);
      const response = await getAnalyses();
      if (!response.error) {
        setAnalyses(response.data);
      } else {
        setError(response.msg || 'Error al obtener análisis');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyses,
    isLoading,
    error,
    fetchAnalyses,
  };
};
