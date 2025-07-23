import { useState, useEffect } from "react";
import {getLogs} from '../../../services/api'

export const useGetLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getLogs();
        if (res.error) {
          setError(res.msg || "Error desconocido");
          setLogs([]);
        } else {

          const sortedLogs = (res.data || [])
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

          setLogs(sortedLogs);
        }
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return { logs, loading, error };
};