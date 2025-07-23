import { useEffect, useState } from "react";
import { getUsers } from "../../services/api";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getUsers();
      if (response.success) {
        setUsers(response.users);
        setTotal(response.total);
      } else {
        setError(response.msg || "Error al obtener usuarios");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    total,
    isLoading,
    error,
    fetchUsers,
  };
};