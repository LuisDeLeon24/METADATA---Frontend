import { useEffect, useState } from "react";
import { getUsers, updateUsers as updateUsersRequest } from "../../services/api";
import { useToast } from "@chakra-ui/react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const toast = useToast();

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

  const updateUsers = async (id, data) => {
    setIsLoading(true);
    try {
      const response = updateUsersRequest(id, data);

      if (response.error) {
        throw new Error(response.msg);
      }

      toast({
        title: "Usuario editado",
        description: "El usuario fue editado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      await fetchUsers();

      return response;

    } catch (error) {
      setError(error.response?.data?.msg || 'Error to edit user');
      toast({
        title: "Usuario no ha podido ser editado",
        description: "El usuario no fue editado correctamente.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    total,
    isLoading,
    error,
    fetchUsers,
    updateUsers
  };
};