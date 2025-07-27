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
  Divider,
  Progress
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGavel,
  FaUser,
  FaEye,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlay,
  FaUserShield,
  FaMapMarkerAlt,
  FaFileAlt,
  FaChartLine,
  FaTasks,
  FaDownload
} from 'react-icons/fa';
import { useGetCases } from '../../shared/hooks/cases/useGetCases';

const MotionBox = motion(Box);
const MotionTr = motion(Tr);
const MotionFlex = motion(Flex);

const CasesSection = () => {
  const { cases, loading, error } = useGetCases();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCase, setSelectedCase] = useState(null);

  const handleViewCase = (caseItem) => {
    setSelectedCase(caseItem);
    onOpen();
  };

  const getStateColor = (state) => {
    switch (state) {
      case 'RECEIVED': return 'gray';
      case 'IN_PROGRESS': return 'orange';
      case 'FINISHED': return 'green';
      default: return 'gray';
    }
  };

  const getStateIcon = (state) => {
    switch (state) {
      case 'RECEIVED': return FaClock;
      case 'IN_PROGRESS': return FaPlay;
      case 'FINISHED': return FaCheckCircle;
      default: return FaExclamationTriangle;
    }
  };

  const getStateLabel = (state) => {
    switch (state) {
      case 'RECEIVED': return 'Recibido';
      case 'IN_PROGRESS': return 'En Proceso';
      case 'FINISHED': return 'Finalizado';
      default: return state;
    }
  };

  const getProgressValue = (state) => {
    switch (state) {
      case 'RECEIVED': return 25;
      case 'IN_PROGRESS': return 60;
      case 'FINISHED': return 100;
      default: return 0;
    }
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
            Cargando casos...
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
        <Icon as={FaExclamationTriangle} boxSize={16} color="red.400" mb={4} />
        <Text color="red.300" fontSize="xl" fontWeight="medium" mb={2}>
          Error al cargar casos
        </Text>
        <Text color="gray.400">
          {error}
        </Text>
      </MotionBox>
    );
  }

  if (!cases || cases.length === 0) {
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
        <Icon as={FaGavel} boxSize={16} color="purple.400" mb={4} />
        <Text color="purple.200" fontSize="xl" fontWeight="medium" mb={2}>
          No hay casos disponibles
        </Text>
        <Text color="gray.400">
          Los casos aparecerán aquí cuando estén disponibles.
        </Text>
      </MotionBox>
    );
  }

  // Estadísticas de casos
  const stats = {
    total: cases.length,
    received: cases.filter(c => c.state === 'RECEIVED').length,
    inProgress: cases.filter(c => c.state === 'IN_PROGRESS').length,
    finished: cases.filter(c => c.state === 'FINISHED').length,
    assigned: cases.filter(c => c.researcher).length
  };

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
            <Icon as={FaGavel} boxSize={6} color="white" />
          </Box>
          <VStack align="start" spacing={0}>
            <Heading
              size="xl"
              bgGradient="linear(to-r, purple.200, purple.400)"
              bgClip="text"
              fontWeight="bold"
            >
              Casos del Sistema
            </Heading>
            <Text color="gray.400" fontSize="md">
              {cases.length} caso{cases.length !== 1 ? 's' : ''} en seguimiento
            </Text>
          </VStack>
        </HStack>
      </MotionFlex>

      {/* Stats Dashboard */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        mb={8}
      >
        <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }} gap={6}>
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
              <Icon as={FaTasks} boxSize={8} color="purple.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {stats.total}
              </Text>
              <Text color="gray.400" fontSize="sm">Total Casos</Text>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              bg="rgba(30, 30, 30, 0.8)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="gray.500"
              borderRadius="xl"
              p={6}
              textAlign="center"
            >
              <Icon as={FaClock} boxSize={8} color="gray.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {stats.received}
              </Text>
              <Text color="gray.400" fontSize="sm">Recibidos</Text>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              bg="rgba(30, 30, 30, 0.8)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="orange.500"
              borderRadius="xl"
              p={6}
              textAlign="center"
            >
              <Icon as={FaPlay} boxSize={8} color="orange.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {stats.inProgress}
              </Text>
              <Text color="gray.400" fontSize="sm">En Proceso</Text>
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
              <Icon as={FaCheckCircle} boxSize={8} color="green.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {stats.finished}
              </Text>
              <Text color="gray.400" fontSize="sm">Finalizados</Text>
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
                {stats.assigned}
              </Text>
              <Text color="gray.400" fontSize="sm">Asignados</Text>
            </Box>
          </GridItem>
        </Grid>
      </MotionBox>

      {/* Cases Table */}
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
                    <Text>Caso</Text>
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
                    <Text>Investigador</Text>
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
                    <Icon as={FaCalendarAlt} boxSize={4} />
                    <Text>Fecha Inicio</Text>
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
                    <Icon as={FaChartLine} boxSize={4} />
                    <Text>Estado</Text>
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
                {cases.map((caseItem, i) => (
                  <MotionTr
                    key={caseItem._id}
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
                    onClick={() => handleViewCase(caseItem)}
                  >
                    <Td py={6}>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" color="white" fontSize="md">
                          {caseItem.title}
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          ID: {caseItem._id.slice(-8)}
                        </Text>
                      </VStack>
                    </Td>
                    <Td py={6}>
                      {caseItem.researcher ? (
                        <HStack spacing={3}>
                          <Avatar
                            size="sm"
                            name={caseItem.researcher.name}
                            bg="purple.500"
                          />
                          <VStack align="start" spacing={0}>
                            <Text color="white" fontSize="sm" fontWeight="medium">
                              {caseItem.researcher.name}
                            </Text>
                            <Text color="gray.400" fontSize="xs">
                              Investigador
                            </Text>
                          </VStack>
                        </HStack>
                      ) : (
                        <HStack spacing={2}>
                          <Icon as={FaUser} color="gray.500" boxSize={4} />
                          <Text color="gray.500" fontSize="sm">
                            No asignado
                          </Text>
                        </HStack>
                      )}
                    </Td>
                    <Td py={6}>
                      <VStack align="start" spacing={1}>
                        <Text color="white" fontSize="sm">
                          {new Date(caseItem.initDate).toLocaleDateString()}
                        </Text>
                        <Text color="gray.400" fontSize="xs">
                          {new Date(caseItem.initDate).toLocaleTimeString()}
                        </Text>
                      </VStack>
                    </Td>
                    <Td py={6}>
                      <VStack align="start" spacing={2}>
                        <HStack spacing={2}>
                          <Icon
                            as={getStateIcon(caseItem.state)}
                            color={`${getStateColor(caseItem.state)}.400`}
                            boxSize={4}
                          />
                          <Badge
                            colorScheme={getStateColor(caseItem.state)}
                            variant="solid"
                            borderRadius="full"
                            px={3}
                            py={1}
                            fontSize="xs"
                          >
                            {getStateLabel(caseItem.state)}
                          </Badge>
                        </HStack>
                        <Progress
                          value={getProgressValue(caseItem.state)}
                          size="sm"
                          colorScheme={getStateColor(caseItem.state)}
                          borderRadius="full"
                          w="100px"
                        />
                      </VStack>
                    </Td>
                    <Td py={6}>
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
                            handleViewCase(caseItem);
                          }}
                          aria-label="Ver caso"
                        />
                      </Tooltip>
                    </Td>
                  </MotionTr>
                ))}
              </AnimatePresence>
            </Tbody>
          </Table>
        </TableContainer>
      </MotionBox>

      {/* Modal de detalles del caso */}
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
              <Icon as={FaGavel} color="purple.400" boxSize={6} />
              <Text bgGradient="linear(to-r, purple.200, purple.400)" bgClip="text">
                Detalles del Caso
              </Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="gray.400" />
          <ModalBody pb={6}>
            {selectedCase && (
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
                      {selectedCase.title}
                    </Text>
                    <Text color="gray.300" fontSize="sm">
                      Caso ID: {selectedCase._id}
                    </Text>
                  </Box>
                </GridItem>

                <GridItem>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        INVESTIGADOR ASIGNADO
                      </Text>
                      {selectedCase.researcher ? (
                        <HStack spacing={3}>
                          <Avatar
                            size="md"
                            name={selectedCase.researcher.name}
                            bg="purple.500"
                          />
                          <VStack align="start" spacing={0}>
                            <Text color="white" fontWeight="medium">
                              {selectedCase.researcher.name}
                            </Text>
                            <Text color="gray.400" fontSize="sm">
                              Investigador principal
                            </Text>
                          </VStack>
                        </HStack>
                      ) : (
                        <Text color="gray.500">No asignado</Text>
                      )}
                    </Box>

                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        FECHA DE INICIO
                      </Text>
                      <HStack spacing={2}>
                        <Icon as={FaCalendarAlt} color="gray.400" boxSize={4} />
                        <VStack align="start" spacing={0}>
                          <Text color="white">
                            {new Date(selectedCase.initDate).toLocaleDateString()}
                          </Text>
                          <Text color="gray.400" fontSize="sm">
                            {new Date(selectedCase.initDate).toLocaleTimeString()}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </VStack>
                </GridItem>

                <GridItem>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        ESTADO DEL CASO
                      </Text>
                      <VStack align="start" spacing={3}>
                        <HStack spacing={3}>
                          <Icon
                            as={getStateIcon(selectedCase.state)}
                            color={`${getStateColor(selectedCase.state)}.400`}
                            boxSize={6}
                          />
                          <VStack align="start" spacing={0}>
                            <Badge
                              colorScheme={getStateColor(selectedCase.state)}
                              variant="solid"
                              borderRadius="full"
                              px={4}
                              py={2}
                              fontSize="md"
                            >
                              {getStateLabel(selectedCase.state)}
                            </Badge>
                            <Text color="gray.400" fontSize="sm">
                              Estado actual
                            </Text>
                          </VStack>
                        </HStack>
                        <Box w="full">
                          <Text color="gray.400" fontSize="sm" mb={2}>
                            Progreso: {getProgressValue(selectedCase.state)}%
                          </Text>
                          <Progress
                            value={getProgressValue(selectedCase.state)}
                            size="lg"
                            colorScheme={getStateColor(selectedCase.state)}
                            borderRadius="full"
                          />
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </GridItem>

                {selectedCase.ubication && (
                  <GridItem colSpan={2}>
                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        UBICACIÓN
                      </Text>
                      <HStack spacing={2}>
                        <Icon as={FaMapMarkerAlt} color="gray.400" boxSize={4} />
                        <Text color="gray.300">
                          {selectedCase.ubication}
                        </Text>
                      </HStack>
                    </Box>
                  </GridItem>
                )}

                {selectedCase.description && (
                  <GridItem colSpan={2}>
                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        DESCRIPCIÓN
                      </Text>
                      <Box
                        bg="rgba(30, 30, 30, 0.5)"
                        p={4}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.700"
                      >
                        <Text color="gray.300" lineHeight="tall">
                          {selectedCase.description}
                        </Text>
                      </Box>
                    </Box>
                  </GridItem>
                )}
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

export default CasesSection;