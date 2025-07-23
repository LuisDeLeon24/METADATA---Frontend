import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Text, Box, useColorModeValue } from '@chakra-ui/react';
import { useGetCases } from '../../shared/hooks/cases/useGetCases';

const CasesSection = () => {
  const { cases, loading, error } = useGetCases();

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
            <Th>Título</Th>
            <Th>Investigador</Th>
            <Th>Fecha de creación</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cases.map(caseItem => (
            <Tr
              key={caseItem._id}
              _hover={{ bg: hoverBg, cursor: 'pointer' }}
              transition="background-color 0.2s"
            >
              <Td fontWeight="semibold">{caseItem.title}</Td>
              <Td>{caseItem.researcher ? caseItem.researcher.name : 'No asignado'}</Td>
              <Td>{new Date(caseItem.initDate).toLocaleDateString()}</Td>
              <Td>{caseItem.state}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CasesSection;
