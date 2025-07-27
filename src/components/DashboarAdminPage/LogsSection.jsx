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
  Input,
  InputGroup,
  InputLeftElement,
  Select
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHistory,
  FaUser,
  FaEye,
  FaClock,
  FaPlay,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaUserCog,
  FaChartBar,
  FaExclamationTriangle,
  FaDownload
} from 'react-icons/fa';
import { useGetLogs } from '../../shared/hooks/log/useGetLogs';

const MotionBox = motion(Box);
const MotionTr = motion(Tr);
const MotionFlex = motion(Flex);

const LogsSection = () => {
  const { logs, loading, error } = useGetLogs();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLog, setSelectedLog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const handleViewLog = (log) => {
    setSelectedLog(log);
    onOpen();
  };

  const getActionIcon = (action) => {
    const actionMap = {
      'create': FaPlus,
      'update': FaEdit,
      'delete': FaTrash,
      'login': FaUser,
      'logout': FaUser,
      'view': FaEye,
      'search': FaSearch,
      'export': FaPlay
    };

    const actionKey = action.toLowerCase();
    for (const key in actionMap) {
      if (actionKey.includes(key)) {
        return actionMap[key];
      }
    }
    return FaPlay;
  };

  const getActionColor = (action) => {
    const actionKey = action.toLowerCase();
    if (actionKey.includes('create') || actionKey.includes('add')) return 'green';
    if (actionKey.includes('update') || actionKey.includes('edit')) return 'blue';
    if (actionKey.includes('delete') || actionKey.includes('remove')) return 'red';
    if (actionKey.includes('login') || actionKey.includes('logout')) return 'purple';
    if (actionKey.includes('view') || actionKey.includes('search')) return 'cyan';
    return 'gray';
  };

  // Filtrar logs
  const filteredLogs = logs?.filter(log => {
    const matchesSearch = log.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action.toLowerCase().includes(actionFilter.toLowerCase());
    return matchesSearch && matchesAction;
  }) || [];

  // Obtener acciones únicas para el filtro
  const uniqueActions = [...new Set(logs?.map(log => log.action) || [])];

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
            Cargando logs del sistema...
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
          Error al cargar logs
        </Text>
        <Text color="gray.400">
          {error}
        </Text>
      </MotionBox>
    );
  }

  if (!logs || logs.length === 0) {
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
        <Icon as={FaHistory} boxSize={16} color="purple.400" mb={4} />
        <Text color="purple.200" fontSize="xl" fontWeight="medium" mb={2}>
          No hay logs disponibles
        </Text>
        <Text color="gray.400">
          Los registros de actividad aparecerán aquí cuando haya actividad en el sistema.
        </Text>
      </MotionBox>
    );
  }

  // Estadísticas de logs
  const stats = {
    total: logs.length,
    today: logs.filter(log => {
      const today = new Date();
      const logDate = new Date(log.createdAt);
      return logDate.toDateString() === today.toDateString();
    }).length,
    uniqueUsers: new Set(logs.map(log => log.userId?._id).filter(Boolean)).size,
    actions: new Set(logs.map(log => log.action)).size
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
            <Icon as={FaHistory} boxSize={6} color="white" />
          </Box>
          <VStack align="start" spacing={0}>
            <Heading
              size="xl"
              bgGradient="linear(to-r, purple.200, purple.400)"
              bgClip="text"
              fontWeight="bold"
            >
              Logs del Sistema
            </Heading>
            <Text color="gray.400" fontSize="md">
              {filteredLogs.length} registro{filteredLogs.length !== 1 ? 's' : ''} de actividad
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
              <Icon as={FaHistory} boxSize={8} color="purple.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {stats.total}
              </Text>
              <Text color="gray.400" fontSize="sm">Total Logs</Text>
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
              <Icon as={FaClock} boxSize={8} color="green.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {stats.today}
              </Text>
              <Text color="gray.400" fontSize="sm">Hoy</Text>
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
              <Icon as={FaUserCog} boxSize={8} color="blue.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {stats.uniqueUsers}
              </Text>
              <Text color="gray.400" fontSize="sm">Usuarios Activos</Text>
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
              <Icon as={FaChartBar} boxSize={8} color="orange.400" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {stats.actions}
              </Text>
              <Text color="gray.400" fontSize="sm">Tipos de Acción</Text>
            </Box>
          </GridItem>
        </Grid>
      </MotionBox>

      {/* Filters Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        mb={6}
      >
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={4}>
          <GridItem>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="purple.400" />
              </InputLeftElement>
              <Input
                placeholder="Buscar por usuario o acción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="rgba(30, 30, 30, 0.8)"
                border="1px solid"
                borderColor="purple.500"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _focus={{
                  borderColor: "purple.400",
                  boxShadow: "0 0 0 1px purple.400"
                }}
              />
            </InputGroup>
          </GridItem>
          <GridItem>
            <Select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              bg="rgba(30, 30, 30, 0.8)"
              border="1px solid"
              borderColor="purple.500"
              color="white"
              icon={<FaFilter />}
              _focus={{
                borderColor: "purple.400",
                boxShadow: "0 0 0 1px purple.400"
              }}
            >
              <option value="all" style={{ background: '#1a1a2e', color: 'white' }}>
                Todas las acciones
              </option>
              {uniqueActions.map(action => (
                <option
                  key={action}
                  value={action}
                  style={{ background: '#1a1a2e', color: 'white' }}
                >
                  {action}
                </option>
              ))}
            </Select>
          </GridItem>
        </Grid>
      </MotionBox>

      {/* Logs Table */}
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
                    <Icon as={FaUser} boxSize={4} />
                    <Text>Usuario</Text>
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
                    <Icon as={FaPlay} boxSize={4} />
                    <Text>Acción</Text>
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
                    <Text>Fecha y Hora</Text>
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
                {filteredLogs.map((log, i) => (
                  <MotionTr
                    key={log._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                    _hover={{
                      bg: "rgba(139, 92, 246, 0.1)",
                      transform: "translateX(4px)"
                    }}
                    borderBottom="1px solid"
                    borderColor="rgba(139, 92, 246, 0.1)"
                    cursor="pointer"
                    onClick={() => handleViewLog(log)}
                  >
                    <Td py={6}>
                      <HStack spacing={3}>
                        <Avatar
                          size="sm"
                          name={log.userId?.name || 'Usuario no asignado'}
                          bg="purple.500"
                        />
                        <VStack align="start" spacing={0}>
                          <Text color="white" fontSize="sm" fontWeight="medium">
                            {log.userId?.name || 'Usuario no asignado'}
                          </Text>
                          <Text color="gray.400" fontSize="xs">
                            ID: {log.userId?._id?.slice(-6) || 'N/A'}
                          </Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td py={6}>
                      <HStack spacing={2}>
                        <Icon
                          as={getActionIcon(log.action)}
                          color={`${getActionColor(log.action)}.400`}
                          boxSize={4}
                        />
                        <Badge
                          bg={`rgba(${getActionColor(log.action) === 'green' ? '34, 197, 94' :
                            getActionColor(log.action) === 'blue' ? '59, 130, 246' :
                              getActionColor(log.action) === 'red' ? '239, 68, 68' :
                                getActionColor(log.action) === 'purple' ? '139, 92, 246' :
                                  getActionColor(log.action) === 'cyan' ? '6, 182, 212' :
                                    '107, 114, 128'}, 0.2)`}
                          color={`${getActionColor(log.action)}.200`}
                          borderRadius="full"
                          px={3}
                          py={1}
                          fontSize="xs"
                          fontWeight="bold"
                        >
                          {log.action}
                        </Badge>
                      </HStack>
                    </Td>
                    <Td py={6}>
                      <VStack align="start" spacing={1}>
                        <Text color="white" fontSize="sm">
                          {new Date(log.createdAt).toLocaleDateString()}
                        </Text>
                        <Text color="gray.400" fontSize="xs">
                          {new Date(log.createdAt).toLocaleTimeString()}
                        </Text>
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
                            handleViewLog(log);
                          }}
                          aria-label="Ver log"
                        />
                      </Tooltip>
                    </Td>
                  </MotionTr>
                ))}
              </AnimatePresence>
            </Tbody>
          </Table>
        </TableContainer>

        {filteredLogs.length === 0 && searchTerm && (
          <Box textAlign="center" py={8}>
            <Icon as={FaSearch} boxSize={12} color="gray.500" mb={3} />
            <Text color="gray.400" fontSize="lg">
              No se encontraron logs que coincidan con tu búsqueda
            </Text>
            <Text color="gray.500" fontSize="sm">
              Intenta con términos diferentes
            </Text>
          </Box>
        )}
      </MotionBox>

      {/* Modal de detalles del log */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
              <Icon as={FaHistory} color="purple.400" boxSize={6} />
              <Text bgGradient="linear(to-r, purple.200, purple.400)" bgClip="text">
                Detalles del Log
              </Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="gray.400" />
          <ModalBody pb={6}>
            {selectedLog && (
              <VStack spacing={4} align="stretch">
                <Box
                  bg="rgba(139, 92, 246, 0.1)"
                  p={4}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="purple.700"
                >
                  <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                    Actividad Registrada
                  </Text>
                  <Text color="gray.300" fontSize="sm">
                    Log ID: {selectedLog._id}
                  </Text>
                </Box>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        USUARIO
                      </Text>
                      <HStack spacing={3}>
                        <Avatar
                          size="md"
                          name={selectedLog.userId?.name || 'Usuario no asignado'}
                          bg="purple.500"
                        />
                        <VStack align="start" spacing={0}>
                          <Text color="white" fontWeight="medium">
                            {selectedLog.userId?.name || 'Usuario no asignado'}
                          </Text>
                          <Text color="gray.400" fontSize="sm">
                            ID: {selectedLog.userId?._id || 'N/A'}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </GridItem>

                  <GridItem>
                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        ACCIÓN REALIZADA
                      </Text>
                      <HStack spacing={3}>
                        <Icon
                          as={getActionIcon(selectedLog.action)}
                          color={`${getActionColor(selectedLog.action)}.400`}
                          boxSize={6}
                        />
                        <VStack align="start" spacing={0}>
                          <Badge
                            bg={`rgba(${getActionColor(selectedLog.action) === 'green' ? '34, 197, 94' :
                              getActionColor(selectedLog.action) === 'blue' ? '59, 130, 246' :
                                getActionColor(selectedLog.action) === 'red' ? '239, 68, 68' :
                                  getActionColor(selectedLog.action) === 'purple' ? '139, 92, 246' :
                                    getActionColor(selectedLog.action) === 'cyan' ? '6, 182, 212' :
                                      '107, 114, 128'}, 0.2)`}
                            color={`${getActionColor(selectedLog.action)}.200`}
                            borderRadius="full"
                            px={4}
                            py={2}
                            fontSize="md"
                          >
                            {selectedLog.action}
                          </Badge>
                          <Text color="gray.400" fontSize="sm">
                            Tipo de actividad
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </GridItem>
                </Grid>

                <Box>
                  <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                    FECHA Y HORA
                  </Text>
                  <HStack spacing={4}>
                    <HStack spacing={2}>
                      <Icon as={FaCalendarAlt} color="gray.400" boxSize={4} />
                      <Text color="white">
                        {new Date(selectedLog.createdAt).toLocaleDateString()}
                      </Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaClock} color="gray.400" boxSize={4} />
                      <Text color="white">
                        {new Date(selectedLog.createdAt).toLocaleTimeString()}
                      </Text>
                    </HStack>
                  </HStack>
                </Box>

                {selectedLog.details && (
                  <Box>
                    <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                      DETALLES ADICIONALES
                    </Text>
                    <Box
                      bg="rgba(30, 30, 30, 0.5)"
                      p={4}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="gray.700"
                    >
                      <Text color="gray.300" fontSize="sm" fontFamily="mono">
                        {selectedLog.details}
                      </Text>
                    </Box>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
        </MotionContent>
      </Modal>
    </Container>
  );
};

// Componente Motion para ModalContent
const MotionContent = motion(ModalContent);

export default LogsSection;