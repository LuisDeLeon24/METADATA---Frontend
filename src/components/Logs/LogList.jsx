import { useEffect, useState } from 'react';
import { getLogs } from '../../services/api.jsx';
import {
  Box,
  Text,
  Stack,
  Flex,
  Icon,
  Badge,
  VStack,
  HStack,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiActivity, 
  FiUser, 
  FiClock, 
  FiAlertCircle, 
  FiInbox,
  FiZap,
  FiShield,
  FiEdit3
} from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionStack = motion(Stack);

const LogList = ({ filters }) => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el icono basado en la acción
  const getActionIcon = (action) => {
    const actionLower = action?.toLowerCase() || '';
    if (actionLower.includes('create') || actionLower.includes('crear')) return FiZap;
    if (actionLower.includes('update') || actionLower.includes('actualizar')) return FiEdit3;
    if (actionLower.includes('delete') || actionLower.includes('eliminar')) return FiAlertCircle;
    if (actionLower.includes('login') || actionLower.includes('auth')) return FiShield;
    return FiActivity;
  };

  // Función para obtener el color del badge basado en la acción
  const getActionColor = (action) => {
    const actionLower = action?.toLowerCase() || '';
    if (actionLower.includes('create') || actionLower.includes('crear')) return 'green';
    if (actionLower.includes('update') || actionLower.includes('actualizar')) return 'blue';
    if (actionLower.includes('delete') || actionLower.includes('eliminar')) return 'red';
    if (actionLower.includes('login') || actionLower.includes('auth')) return 'purple';
    return 'gray';
  };

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await getLogs(filters);
        if (response.status && Array.isArray(response.data)) {
          setLogs(response.data);
          setError(null);
        } else {
          setError(response.msg || 'Datos inválidos');
          setLogs([]);
        }
      } catch (err) {
        setError('No se pudieron cargar los logs');
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [filters]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <VStack spacing={4}>
          <Spinner 
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.600"
            color="purple.500"
            size="xl"
          />
          <Text color="purple.300" fontSize="lg" fontWeight="medium">
            Cargando logs...
          </Text>
        </VStack>
      </Flex>
    );
  }

  if (error) {
    return (
      <MotionBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        maxW="500px"
        mx="auto"
        mt={8}
      >
        <Alert
          status="error"
          bg="rgba(254, 178, 178, 0.1)"
          borderColor="red.400"
          borderWidth="1px"
          borderRadius="xl"
          color="red.300"
        >
          <AlertIcon color="red.400" />
          <Box>
            <AlertTitle color="red.200">Error al cargar logs</AlertTitle>
            <AlertDescription color="red.300">{error}</AlertDescription>
          </Box>
        </Alert>
      </MotionBox>
    );
  }

  return (
    <Flex justify="center" mt={8}>
      <Box width="100%" maxW="container.lg" px={4}>
        <AnimatePresence mode="wait">
          {logs.length === 0 ? (
            <MotionBox
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <VStack 
                spacing={6} 
                py={16} 
                px={8}
                bg="linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(45, 27, 105, 0.3) 100%)"
                borderRadius="2xl"
                border="1px solid"
                borderColor="purple.700"
                boxShadow="0 10px 30px rgba(139, 69, 199, 0.2)"
              >
                <Icon 
                  as={FiInbox} 
                  boxSize={16} 
                  color="purple.300" 
                  opacity={0.7}
                />
                <VStack spacing={2}>
                  <Text 
                    color="purple.200" 
                    fontSize="xl" 
                    fontWeight="bold"
                  >
                    No hay logs disponibles
                  </Text>
                  <Text 
                    color="gray.400" 
                    fontSize="md" 
                    textAlign="center"
                  >
                    Ajusta los filtros para ver más resultados
                  </Text>
                </VStack>
              </VStack>
            </MotionBox>
          ) : (
            <MotionStack
              key="logs"
              spacing={4}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {logs.map((log, index) => {
                const ActionIcon = getActionIcon(log.action);
                const actionColor = getActionColor(log.action);
                
                return (
                  <MotionBox
                    key={log._id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    bg="linear-gradient(135deg, #1A1A1A 0%, #2D1B69 100%)"
                    borderRadius="xl"
                    p={6}
                    color="white"
                    cursor="pointer"
                    position="relative"
                    overflow="hidden"
                    border="1px solid"
                    borderColor="purple.700"
                    boxShadow="0 8px 25px rgba(139, 69, 199, 0.15)"
                    _hover={{
                      borderColor: 'purple.400',
                      boxShadow: '0 12px 35px rgba(139, 69, 199, 0.25)',
                    }}
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      bgGradient: `linear(to-r, ${actionColor}.400, ${actionColor}.600)`,
                    }}
                  >
                    <VStack align="stretch" spacing={4}>
                      {/* Header con icono y badge */}
                      <HStack justify="space-between" align="start">
                        <HStack spacing={3}>
                          <Box
                            p={3}
                            bg={`${actionColor}.500`}
                            borderRadius="lg"
                            boxShadow={`0 0 20px rgba(139, 69, 199, 0.3)`}
                          >
                            <Icon as={ActionIcon} boxSize={5} color="white" />
                          </Box>
                          <VStack align="start" spacing={0}>
                            <Text 
                              fontWeight="bold" 
                              fontSize="lg" 
                              color="white"
                              lineHeight="short"
                            >
                              {log.action}
                            </Text>
                            <Badge
                              colorScheme={actionColor}
                              variant="subtle"
                              borderRadius="full"
                              px={2}
                              py={1}
                              fontSize="xs"
                              fontWeight="semibold"
                            >
                              Actividad del sistema
                            </Badge>
                          </VStack>
                        </HStack>
                      </HStack>

                      <Divider borderColor="purple.700" opacity={0.3} />

                      {/* Información del usuario y fecha */}
                      <VStack spacing={3} align="stretch">
                        <HStack spacing={3}>
                          <Icon as={FiUser} color="purple.300" boxSize={4} />
                          <Text fontSize="md" color="gray.200" fontWeight="medium">
                            <Text as="span" color="purple.300" fontWeight="bold">
                              Usuario:
                            </Text>{' '}
                            {log.userId?.name || 'Usuario desconocido'}
                          </Text>
                        </HStack>

                        <HStack spacing={3}>
                          <Icon as={FiClock} color="purple.300" boxSize={4} />
                          <Text fontSize="md" color="gray.200" fontWeight="medium">
                            <Text as="span" color="purple.300" fontWeight="bold">
                              Fecha:
                            </Text>{' '}
                            {new Date(log.date).toLocaleString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>

                    {/* Efecto de brillo sutil */}
                    <Box
                      position="absolute"
                      top="-50%"
                      right="-20%"
                      width="40%"
                      height="200%"
                      bgGradient="radial(circle, rgba(139, 69, 199, 0.1) 0%, transparent 70%)"
                      pointerEvents="none"
                      opacity={0.6}
                    />
                  </MotionBox>
                );
              })}
            </MotionStack>
          )}
        </AnimatePresence>
      </Box>
    </Flex>
  );
};

export default LogList;