import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Text, Box, useColorModeValue } from '@chakra-ui/react';
import { useGetLogs } from '../../shared/hooks/log/useGetLogs';

const LogsSection = () => {
  const { logs, loading, error } = useGetLogs();

  const headerBg = useColorModeValue('#EDE9F7', '#6B46C1');  // Claro: lavanda súper claro, Oscuro: morado intenso (puedes cambiar si quieres)
  const hoverBg = useColorModeValue('#F5F3FF', '#553C9A');   // Claro: casi blanco lavanda, Oscuro: morado más oscuro
  const bgColor = useColorModeValue('white', 'gray.700');
  if (loading) return <Spinner size="xl" display="block" mx="auto" mt={10} />;
  if (error) return <Text color="red.500" textAlign="center" mt={4}>Error: {error}</Text>;

  return (
    <Box
      mt={8}
      p={6}
      bg={bgColor}
      borderRadius="md"
      boxShadow="md"
      overflowX="auto"
      maxW="100%"
    >
      <Table variant="striped" size="md" minW="600px">
        <Thead bg={headerBg} fontWeight="bold">
          <Tr>
            <Th>Usuario</Th>
            <Th>Acción</Th>
            <Th>Fecha</Th>
          </Tr>
        </Thead>
        <Tbody>
          {logs.map(log => (
            <Tr
              key={log._id}
              _hover={{ bg: hoverBg, cursor: 'pointer' }}
              transition="background-color 0.2s"
            >
              <Td>{log.userId?.name || 'Usuario no asignado'}</Td>
              <Td>{log.action}</Td>
              <Td>{new Date(log.createdAt).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LogsSection;
