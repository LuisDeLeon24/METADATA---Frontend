import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  Box,
  HStack,
  VStack,
  Icon,
  Badge,
  Avatar,
  Flex,
  Heading,
  Container,
  TableContainer,
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  Divider
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFileAlt,
  FaUser,
  FaEye,
  FaShieldAlt,
  FaLock,
  FaUnlock,
  FaDownload,
  FaCalendarAlt,
  FaTag,
  FaUserShield
} from 'react-icons/fa';
import { useGetReports } from '../../shared/hooks/reports/useGetReports';

const MotionBox = motion(Box);
const MotionTr = motion(Tr);
const MotionFlex = motion(Flex);

const ReportesSection = () => {
  const { reports, loading, error } = useGetReports();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedReport, setSelectedReport] = useState(null);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    onOpen();
  };

  if (loading) {
    return (
      <Box
        minH="400px"
        bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2xl"
        border="1px solid"
        borderColor="rgba(139, 92, 246, 0.2)"
      >
        <VStack spacing={6}>
          <MotionBox
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Icon as={FaDownload} boxSize={12} color="purple.400" />
          </MotionBox>
          <Spinner size="xl" color="purple.400" thickness="4px" />
          <Text color="purple.200" fontSize="lg" fontWeight="medium">
            Cargando reportes...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        bg="rgba(239, 68, 68, 0.1)"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="red.500"
        borderRadius="2xl"
        p={12}
        textAlign="center"
      >
        <Icon as={FaFileAlt} boxSize={16} color="red.400" mb={4} />
        <Text color="red.300" fontSize="xl" fontWeight="medium" mb={2}>
          Error al cargar reportes
        </Text>
        <Text color="gray.400">
          {error}
        </Text>
      </MotionBox>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        bg="rgba(30, 30, 30, 0.8)"
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor="purple.500"
        borderRadius="2xl"
        p={12}
        textAlign="center"
      >
        <Icon as={FaFileAlt} boxSize={16} color="purple.400" mb={4} />
        <Text color="purple.200" fontSize="xl" fontWeight="medium" mb={2}>
          No hay reportes disponibles
        </Text>
        <Text color="gray.400">
          Los reportes aparecerán aquí cuando estén disponibles.
        </Text>
      </MotionBox>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      {/* Header Section */}
      <MotionFlex
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        align="center"
        mb={8}
        gap={4}
      >
        <HStack spacing={3}>
          <Box
            p={3}
            bg="linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
            borderRadius="xl"
          >
            <Icon as={FaFileAlt} boxSize={6} color="white" />
          </Box>
          <VStack align="start" spacing={0}>
            <Heading
              size="xl"
              bgGradient="linear(to-r, purple.200, purple.400)"
              bgClip="text"
              fontWeight="bold"
            >
              Reportes del Sistema
            </Heading>
            <Text color="gray.400" fontSize="md">
              {reports.length} reporte{reports.length !== 1 ? 's' : ''} disponible{reports.length !== 1 ? 's' : ''}
            </Text>
          </VStack>
        </HStack>
      </MotionFlex>

      {/* Stats Cards */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        mb={8}
      >
        <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6}>
          <GridItem>
            <Box
              bg="rgba(30, 30, 30, 0.8)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="purple.500"
              borderRadius="xl"
              p={6}
              textAlign="center"
            >
              <Icon as={FaFileAlt} boxSize={8} color="purple.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {reports.length}
              </Text>
              <Text color="gray.400" fontSize="sm">Total Reportes</Text>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              bg="rgba(30, 30, 30, 0.8)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="red.500"
              borderRadius="xl"
              p={6}
              textAlign="center"
            >
              <Icon as={FaLock} boxSize={8} color="red.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {reports.filter(r => r.confidential).length}
              </Text>
              <Text color="gray.400" fontSize="sm">Confidenciales</Text>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              bg="rgba(30, 30, 30, 0.8)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="green.500"
              borderRadius="xl"
              p={6}
              textAlign="center"
            >
              <Icon as={FaUnlock} boxSize={8} color="green.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {reports.filter(r => !r.confidential).length}
              </Text>
              <Text color="gray.400" fontSize="sm">Públicos</Text>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              bg="rgba(30, 30, 30, 0.8)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="blue.500"
              borderRadius="xl"
              p={6}
              textAlign="center"
            >
              <Icon as={FaUserShield} boxSize={8} color="blue.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {new Set(reports.map(r => r.generatedBy?._id)).size}
              </Text>
              <Text color="gray.400" fontSize="sm">Autores</Text>
            </Box>
          </GridItem>
        </Grid>
      </MotionBox>

      {/* Reports Table */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        bg="rgba(30, 30, 30, 0.8)"
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor="rgba(139, 92, 246, 0.2)"
        borderRadius="2xl"
        overflow="hidden"
      >
        <TableContainer>
          <Table variant="simple" size="md">
            <Thead>
              <Tr bg="rgba(139, 92, 246, 0.1)">
                <Th
                  color="purple.300"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  py={6}
                >
                  <HStack spacing={2}>
                    <Icon as={FaFileAlt} boxSize={4} />
                    <Text>Reporte</Text>
                  </HStack>
                </Th>
                <Th
                  color="purple.300"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  py={6}
                >
                  <HStack spacing={2}>
                    <Icon as={FaUser} boxSize={4} />
                    <Text>Autor</Text>
                  </HStack>
                </Th>
                <Th
                  color="purple.300"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  py={6}
                >
                  <HStack spacing={2}>
                    <Icon as={FaTag} boxSize={4} />
                    <Text>Versión</Text>
                  </HStack>
                </Th>
                <Th
                  color="purple.300"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  py={6}
                >
                  <HStack spacing={2}>
                    <Icon as={FaShieldAlt} boxSize={4} />
                    <Text>Privacidad</Text>
                  </HStack>
                </Th>
                <Th
                  color="purple.300"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  py={6}
                >
                  Acciones
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <AnimatePresence>
                {reports.map((report, i) => (
                  <MotionTr
                    key={report._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.1 }}
                    _hover={{
                      bg: "rgba(139, 92, 246, 0.1)",
                      transform: "translateX(4px)"
                    }}
                    borderBottom="1px solid"
                    borderColor="rgba(139, 92, 246, 0.1)"
                    cursor="pointer"
                    onClick={() => handleViewReport(report)}
                  >
                    <Td py={6}>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" color="white" fontSize="md">
                          {report.title}
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          ID: {report._id.slice(-8)}
                        </Text>
                      </VStack>
                    </Td>
                    <Td py={6}>
                      <HStack spacing={3}>
                        <Avatar
                          size="sm"
                          name={`${report.generatedBy?.name} ${report.generatedBy?.surname}`}
                          bg="purple.500"
                        />
                        <VStack align="start" spacing={0}>
                          <Text color="white" fontSize="sm" fontWeight="medium">
                            {report.generatedBy?.name} {report.generatedBy?.surname}
                          </Text>
                          <Text color="gray.400" fontSize="xs">
                            Autor
                          </Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td py={6}>
                      <Badge
                        bg="rgba(99, 102, 241, 0.2)"
                        color="purple.200"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        v{report.version}
                      </Badge>
                    </Td>
                    <Td py={6}>
                      <HStack spacing={2}>
                        <Icon
                          as={report.confidential ? FaLock : FaUnlock}
                          color={report.confidential ? "red.400" : "green.400"}
                          boxSize={4}
                        />
                        <Badge
                          bg={report.confidential ? "rgba(239, 68, 68, 0.2)" : "rgba(34, 197, 94, 0.2)"}
                          color={report.confidential ? "red.200" : "green.200"}
                          borderRadius="full"
                          px={3}
                          py={1}
                          fontSize="sm"
                        >
                          {report.confidential ? 'Confidencial' : 'Público'}
                        </Badge>
                      </HStack>
                    </Td>
                    <Td py={6}>
                      <HStack spacing={2}>
                        <Tooltip label="Ver detalles" hasArrow>
                          <IconButton
                            icon={<FaEye />}
                            size="sm"
                            bg="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                            color="white"
                            borderRadius="lg"
                            _hover={{
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)"
                            }}
                            transition="all 0.3s ease"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewReport(report);
                            }}
                            aria-label="Ver reporte"
                          />
                        </Tooltip>
                        <Tooltip label="Descargar" hasArrow>
                          <IconButton
                            icon={<FaDownload />}
                            size="sm"
                            bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                            color="white"
                            borderRadius="lg"
                            _hover={{
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)"
                            }}
                            transition="all 0.3s ease"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Lógica de descarga aquí
                            }}
                            aria-label="Descargar reporte"
                          />
                        </Tooltip>
                      </HStack>
                    </Td>
                  </MotionTr>
                ))}
              </AnimatePresence>
            </Tbody>
          </Table>
        </TableContainer>
      </MotionBox>

      {/* Modal de detalles del reporte */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <MotionContent
          as={ModalContent}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          bg="rgba(30, 30, 30, 0.95)"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor="purple.500"
          borderRadius="2xl"
          color="white"
        >
          <ModalHeader>
            <HStack spacing={3}>
              <Icon as={FaFileAlt} color="purple.400" boxSize={6} />
              <Text bgGradient="linear(to-r, purple.200, purple.400)" bgClip="text">
                Detalles del Reporte
              </Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="gray.400" />
          <ModalBody pb={6}>
            {selectedReport && (
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem colSpan={2}>
                  <Box
                    bg="rgba(139, 92, 246, 0.1)"
                    p={4}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="purple.700"
                  >
                    <Text fontSize="xl" fontWeight="bold" color="white" mb={2}>
                      {selectedReport.title}
                    </Text>
                    <Text color="gray.300" fontSize="sm">
                      Reporte ID: {selectedReport._id}
                    </Text>
                  </Box>
                </GridItem>

                <GridItem>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        AUTOR
                      </Text>
                      <HStack spacing={3}>
                        <Avatar
                          size="md"
                          name={`${selectedReport.generatedBy?.name} ${selectedReport.generatedBy?.surname}`}
                          bg="purple.500"
                        />
                        <VStack align="start" spacing={0}>
                          <Text color="white" fontWeight="medium">
                            {selectedReport.generatedBy?.name} {selectedReport.generatedBy?.surname}
                          </Text>
                          <Text color="gray.400" fontSize="sm">
                            Generador del reporte
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>

                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        VERSIÓN
                      </Text>
                      <Badge
                        bg="rgba(99, 102, 241, 0.2)"
                        color="purple.200"
                        borderRadius="full"
                        px={4}
                        py={2}
                        fontSize="md"
                        fontWeight="bold"
                      >
                        Versión {selectedReport.version}
                      </Badge>
                    </Box>
                  </VStack>
                </GridItem>

                <GridItem>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        NIVEL DE PRIVACIDAD
                      </Text>
                      <HStack spacing={3}>
                        <Icon
                          as={selectedReport.confidential ? FaLock : FaUnlock}
                          color={selectedReport.confidential ? "red.400" : "green.400"}
                          boxSize={6}
                        />
                        <VStack align="start" spacing={0}>
                          <Badge
                            bg={selectedReport.confidential ? "rgba(239, 68, 68, 0.2)" : "rgba(34, 197, 94, 0.2)"}
                            color={selectedReport.confidential ? "red.200" : "green.200"}
                            borderRadius="full"
                            px={4}
                            py={2}
                            fontSize="md"
                          >
                            {selectedReport.confidential ? 'Confidencial' : 'Público'}
                          </Badge>
                          <Text color="gray.400" fontSize="sm">
                            {selectedReport.confidential ?
                              'Acceso restringido' :
                              'Acceso general'
                            }
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>

                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        FECHA DE CREACIÓN
                      </Text>
                      <HStack spacing={2}>
                        <Icon as={FaCalendarAlt} color="gray.400" boxSize={4} />
                        <Text color="gray.300">
                          {selectedReport.createdAt ?
                            new Date(selectedReport.createdAt).toLocaleDateString() :
                            'No disponible'
                          }
                        </Text>
                      </HStack>
                    </Box>
                  </VStack>
                </GridItem>

                <GridItem colSpan={2}>
                  <Divider borderColor="purple.700" my={4} />
                  <HStack spacing={4} justify="center">
                    <IconButton
                      icon={<FaEye />}
                      bg="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                      color="white"
                      size="lg"
                      borderRadius="xl"
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)"
                      }}
                      transition="all 0.3s ease"
                      aria-label="Ver reporte completo"
                    />
                    <IconButton
                      icon={<FaDownload />}
                      bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                      color="white"
                      size="lg"
                      borderRadius="xl"
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)"
                      }}
                      transition="all 0.3s ease"
                      aria-label="Descargar reporte"
                    />
                  </HStack>
                </GridItem>
              </Grid>
            )}
          </ModalBody>
        </MotionContent>
      </Modal>
    </Container>
  );
};

// Componente Motion para ModalContent
const MotionContent = motion(ModalContent);

export default ReportesSection;