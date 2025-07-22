import { useEffect, useState, useContext } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { getLogs } from '../../src/services/api';
import { getUsers } from '../services/api';

import LogForm from '../components/Logs/LogForm';
import LogList from '../components/Logs/LogList';
import LogFilter from '../components/Logs/LogFilter';
import { UserContext } from '../context/UserContext'; // importar el contexto

export default function LogsPage() {
  const { user: currentUser } = useContext(UserContext); // acceder al usuario
  const [logs, setLogs] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async (filters = {}) => {
    setLoading(true);
    const result = await getLogs(filters);
    if (!result.error) {
      setLogs(result.data);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    const result = await getUsers();
    if (!result.error) {
      setUsuarios(result.data);
    }
  };

  const handleFilterChange = (filters) => {
    fetchLogs(filters);
  };

  useEffect(() => {
  if (user?.role === 'ADMIN_ROLE') {
    fetchLogs();
    fetchUsers();
  }
}, [user]);

  const user = {
        id: '453543534534',
        name: 'Admin Test',
        role: 'ADMIN'
    };

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>Gestión de Logs</Heading>

      <LogForm userId={currentUser.id} token={currentUser.token} onLogCreated={fetchLogs} />

      <Box mt={6}>
        <LogFilter onFilter={handleFilterChange} userOptions={usuarios} />
      </Box>

      <Box mt={6}>
        <LogList logs={logs} loading={loading} />
      </Box>
    </Box>
  );
}