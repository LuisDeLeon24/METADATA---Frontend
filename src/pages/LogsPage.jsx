import { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import LogForm from '../components/Logs/LogForm';
import LogList from '../components/Logs/LogList';
import LogFilter from '../components/Logs/LogFilter';
import { getUsers } from '../services/api.jsx';

const LogsPage = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        if (res.success && Array.isArray(res.data)) {
          setUsers(res.data);
        }
      } catch (error) {
        console.error('Error cargando usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box bg="gray.900" minH="100vh" w="100%">
      <Box
        p={5}
        color="white"
        maxW="800px"
        mx="auto"
        w="100%"
      >
        <Heading mb={6} textAlign="center">
          Gestión de Logs
        </Heading>

        <LogFilter users={users} onFilter={setFilters} />
        <LogForm filters={filters} />
        <LogList filters={filters} />
      </Box>
    </Box>
  );
};

export default LogsPage;