import { useState, useEffect } from 'react';
import { getCases } from '../../../services';

export function useCases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      const res = await getCases();
      if (!res.error) {
        setCases(res.data);
        setError(null);
      } else {
        setError(res.msg);
      }
      setLoading(false);
    };

    fetchCases();
  }, []);

  return { cases, loading, error };
}
