// src/pages/DashboardAdmin/DashboardAdmin.jsx
import { Box, Flex, Heading } from '@chakra-ui/react';
import Navbar from '../components/common/Navbar';
import ReportesSection from '../components/DashboarAdminPage/ReportesSection';
import CasesSection from '../components/DashboarAdminPage/CasesSection';
import LogsSection from '../components/DashboarAdminPage/LogsSection'
const DashboardAdmin = () => {
  return (
    <Box height="100vh">
      <Navbar />

      <Flex height="calc(100vh - 60px) "mt="60px">
        {/* Panel izquierdo */}
        <Box flex="3" p={4}>
          <Box mb={4} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
            <Heading size="md" mb={2}>Reportes recientes</Heading>
            <ReportesSection />
          </Box>

          {/* Casos irá luego */}
          <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md">
            <Heading size="md" mb={2}>Casos recientes</Heading>
            <CasesSection />
          </Box>
        </Box>

        {/* Panel derecho: Logs (vacío por ahora) */}
        <Box flex="1" p={4} bg="gray.50" borderLeft="1px solid lightgray">
          <Heading size="md">Logs</Heading>
          <LogsSection />
        </Box>
      </Flex>
    </Box>
  );
}
export default DashboardAdmin;
