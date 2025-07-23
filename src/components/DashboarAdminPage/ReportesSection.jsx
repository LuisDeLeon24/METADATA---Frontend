import { 
  Table, Thead, Tbody, Tr, Th, Td, Spinner, Text, Box, 
  useColorModeValue 
} from '@chakra-ui/react';
import { useGetReports } from '../../shared/hooks/reports/useGetReports';

const ReportesSection = () => {
  const { reports, loading, error } = useGetReports();

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
      borderRadius="lg"
      boxShadow="xl"
      overflowX="auto"
      maxW="100%"
    >
      <Table variant="striped" size="md" minW="700px">
        <Thead bg={headerBg} fontWeight="bold" fontSize="lg">
          <Tr>
            <Th>Título</Th>
            <Th>Generado por</Th>
            <Th>Versión</Th>
            <Th>Confidencial</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reports.map((report) => (
            <Tr
              key={report._id}
              _hover={{ bg: hoverBg, cursor: 'pointer' }}
              transition="background-color 0.2s"
            >
              <Td fontWeight="semibold">{report.title}</Td>
              <Td>{report.generatedBy?.name} {report.generatedBy?.surname}</Td>
              <Td>{report.version}</Td>
              <Td>{report.confidential ? 'Sí' : 'No'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ReportesSection;
