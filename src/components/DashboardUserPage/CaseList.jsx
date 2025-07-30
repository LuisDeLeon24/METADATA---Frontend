import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCasesByResearcher } from '../../services/api';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
  Badge,
  Icon,
  VStack,
  HStack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FiClock, 
  FiMapPin, 
  FiFile, 
  FiAlertCircle,
  FiCheckCircle,
  FiPlay,
  FiFlag
} from 'react-icons/fi';

// Componente de tarjeta animada
const MotionBox = motion(Box);

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Colores de la paleta negro y morado
  const bgColor = useColorModeValue('gray.900', 'gray.900');
  const cardBg = useColorModeValue('gray.800', 'gray.800');
  const textColor = useColorModeValue('white', 'white');
  const accentColor = useColorModeValue('purple.400', 'purple.400');
  const secondaryColor = useColorModeValue('purple.200', 'purple.200');

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await getCasesByResearcher();
        console.log('Respuesta completa de la API:', res);

        if (res.success && Array.isArray(res.data)) {
          setCases(res.data);
          setError('');
        } else {
          setError('No se pudieron cargar los casos');
          setCases([]);
        }
      } catch (e) {
        console.error('Error al obtener los casos:', e);
        setError('Error al obtener los casos');
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const getEstadoConfig = (estado) => {
    switch (estado) {
      case 'RECEIVED':
        return { 
          label: 'Recibido', 
          color: 'green', 
          icon: FiCheckCircle,
          gradient: 'linear(to-r, green.400, green.600)'
        };
      case 'IN_PROGRESS':
        return { 
          label: 'En Progreso', 
          color: 'yellow', 
          icon: FiPlay,
          gradient: 'linear(to-r, yellow.400, orange.500)'
        };
      case 'FINISHED':
        return { 
          label: 'Finalizado', 
          color: 'purple', 
          icon: FiCheckCircle,
          gradient: 'linear(to-r, purple.400, purple.600)'
        };
      default:
        return { 
          label: 'Desconocido', 
          color: 'gray', 
          icon: FiAlertCircle,
          gradient: 'linear(to-r, gray.400, gray.600)'
        };
    }
  };

  const getPrioridadConfig = (prioridad) => {
    switch (prioridad) {
      case 'LOW':
        return { 
          label: 'Baja', 
          color: 'green',
          intensity: 1
        };
      case 'MEDIUM':
        return { 
          label: 'Media', 
          color: 'yellow',
          intensity: 2
        };
      case 'HIGH':
        return { 
          label: 'Alta', 
          color: 'red',
          intensity: 3
        };
      default:
        return { 
          label: 'Sin Prioridad', 
          color: 'gray',
          intensity: 0
        };
    }
  };

  // Variantes de animación para las tarjetas
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300
      }
    }
  };

  // Variantes para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <Box bg={bgColor} minH="100vh">
        <Container maxW="7xl" py={8}>
          <Flex justify="center" align="center" minH="60vh" direction="column">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Spinner size="xl" color={accentColor} thickness="4px" />
            </motion.div>
            <Text mt={6} color={textColor} fontSize="lg" fontWeight="medium">
              Cargando casos...
            </Text>
          </Flex>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg={bgColor} minH="100vh">
        <Container maxW="7xl" py={8}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert 
              status="error" 
              bg="red.900" 
              border="1px solid" 
              borderColor="red.600"
              borderRadius="lg"
            >
              <AlertIcon color="red.400" />
              <Text color="red.100">{error}</Text>
            </Alert>
          </motion.div>
        </Container>
      </Box>
    );
  }

  if (cases.length === 0) {
    return (
      <Box bg={bgColor} minH="100vh">
        <Container maxW="7xl" py={8}>
          <Flex justify="center" align="center" minH="60vh" direction="column">
            <Icon as={FiFile} w={16} h={16} color="gray.500" mb={4} />
            <Text color={textColor} fontSize="xl" fontWeight="medium">
              No hay casos registrados
            </Text>
            <Text color="gray.400" mt={2}>
              Los casos aparecerán aquí cuando sean asignados
            </Text>
          </Flex>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="7xl" py={8}>
        {/* Header con gradiente */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={4} mb={10} textAlign="center">
            <Heading 
              as="h1" 
              size="2xl" 
              bgGradient="linear(to-r, purple.400, purple.600, pink.400)"
              bgClip="text"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Casos Asignados
            </Heading>
            <Text color="gray.300" fontSize="lg" maxW="2xl">
              Gestiona y monitorea todos los casos de investigación asignados
            </Text>
            <Box w="100px" h="1" bg="purple.500" borderRadius="full" />
          </VStack>
        </motion.div>

        {/* Grid de casos */}
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {cases.map((caso, index) => {
                const estadoConfig = getEstadoConfig(caso.state);
                const prioridadConfig = getPrioridadConfig(caso.priority);

                return (
                  <MotionBox
                    key={caso._id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    bg={cardBg}
                    borderRadius="xl"
                    p={6}
                    position="relative"
                    overflow="hidden"
                    border="1px solid"
                    borderColor="gray.700"
                    cursor="pointer"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      bgGradient: estadoConfig.gradient,
                    }}
                  >
                    {/* Badge de prioridad */}
                    <Box position="absolute" top={4} right={4}>
                      <Badge
                        colorScheme={prioridadConfig.color}
                        variant="solid"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        <HStack spacing={1}>
                          <Icon as={FiFlag} w={3} h={3} />
                          <Text>{prioridadConfig.label}</Text>
                        </HStack>
                      </Badge>
                    </Box>

                    {/* Contenido principal */}
                    <VStack align="start" spacing={4} mt={4}>
                      {/* Título */}
                      <Heading
                        as="h3"
                        size="md"
                        color={textColor}
                        fontWeight="bold"
                        lineHeight="shorter"
                        pr={20} // Espacio para el badge
                      >
                        {caso.title}
                      </Heading>

                      {/* Descripción */}
                      <Text
                        color="gray.300"
                        fontSize="sm"
                        lineHeight="relaxed"
                        noOfLines={3}
                      >
                        {caso.description}
                      </Text>

                      {/* Información adicional */}
                      <VStack align="start" spacing={2} w="full">
                        <HStack spacing={3}>
                          <Icon as={FiFile} color={accentColor} w={4} h={4} />
                          <Text color="gray.400" fontSize="sm">
                            <Text as="span" color={secondaryColor} fontWeight="medium">
                              Tipo:
                            </Text>{' '}
                            {caso.type || 'No especificado'}
                          </Text>
                        </HStack>

                        <HStack spacing={3}>
                          <Icon as={FiMapPin} color={accentColor} w={4} h={4} />
                          <Text color="gray.400" fontSize="sm">
                            <Text as="span" color={secondaryColor} fontWeight="medium">
                              Ubicación:
                            </Text>{' '}
                            {caso.ubication || 'No especificada'}
                          </Text>
                        </HStack>
                      </VStack>

                      {/* Estado */}
                      <HStack spacing={3} mt={4}>
                        <Icon as={estadoConfig.icon} color={`${estadoConfig.color}.400`} w={4} h={4} />
                        <Badge
                          colorScheme={estadoConfig.color}
                          variant="subtle"
                          borderRadius="md"
                          px={3}
                          py={1}
                        >
                          {estadoConfig.label}
                        </Badge>
                      </HStack>
                    </VStack>

                    {/* Efecto de hover - overlay sutil */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bgGradient="linear(to-br, transparent, purple.900)"
                      opacity={0}
                      transition="opacity 0.3s"
                      _groupHover={{ opacity: 0.1 }}
                      pointerEvents="none"
                    />
                  </MotionBox>
                );
              })}
            </SimpleGrid>
          </motion.div>
        </AnimatePresence>

        {/* Footer con estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box mt={16} p={6} bg={cardBg} borderRadius="xl" border="1px solid" borderColor="gray.700">
            <HStack justify="space-around" spacing={8}>
              <VStack>
                <Text color={accentColor} fontSize="2xl" fontWeight="bold">
                  {cases.length}
                </Text>
                <Text color="gray.400" fontSize="sm">Total de Casos</Text>
              </VStack>
              <VStack>
                <Text color="green.400" fontSize="2xl" fontWeight="bold">
                  {cases.filter(c => c.state === 'FINISHED').length}
                </Text>
                <Text color="gray.400" fontSize="sm">Finalizados</Text>
              </VStack>
              <VStack>
                <Text color="yellow.400" fontSize="2xl" fontWeight="bold">
                  {cases.filter(c => c.state === 'IN_PROGRESS').length}
                </Text>
                <Text color="gray.400" fontSize="sm">En Progreso</Text>
              </VStack>
              <VStack>
                <Text color="red.400" fontSize="2xl" fontWeight="bold">
                  {cases.filter(c => c.priority === 'HIGH').length}
                </Text>
                <Text color="gray.400" fontSize="sm">Alta Prioridad</Text>
              </VStack>
            </HStack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CaseList;