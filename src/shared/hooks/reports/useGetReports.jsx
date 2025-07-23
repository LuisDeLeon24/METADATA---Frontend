
import { useEffect, useState } from 'react';
import { getAllReports } from '../../../services/api';

export const useGetReports = () =>{
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getAllReports();

        const reportsData = Array.isArray(response.data) ? response.data : [];

        const sortedReports = reportsData
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

        setReports(sortedReports);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { reports, loading, error };
}
