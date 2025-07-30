import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Text,
  Stack,
  Spinner,
  Flex,
  Heading,
  Container,
  VStack,
  HStack,
  Icon,
  Badge,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import {
  FiFile,
  FiFileText,
  FiImage,
  FiVideo,
  FiDownload,
  FiEye,
  FiClock,
  FiFolder,
} from "react-icons/fi";
import { getEvidenceByUser } from "../../services/api";
import { UserContext } from "../../context/UserContext";

// Componente de Box animado
const MotionBox = motion(Box);
const MotionStack = motion(Stack);

const EvidenceList = () => {
  const { user } = useContext(UserContext);
  const [evidences, setEvidences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Colores de la paleta negro y morado
  const bgColor = useColorModeValue('gray.900', 'gray.900');
  const cardBg = useColorModeValue('gray.800', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.700', 'gray.700');
  const textColor = useColorModeValue('white', 'white');
  const accentColor = useColorModeValue('purple.400', 'purple.400');
  const secondaryColor = useColorModeValue('purple.200', 'purple.200');
  const mutedColor = useColorModeValue('gray.400', 'gray.400');

  useEffect(() => {
    const fetchEvidences = async () => {
      try {
        const response = await getEvidenceByUser(user._id);
        console.log("Respuesta getEvidenceByUser:", response);
        if (response.success) {
          setEvidences(response.data);
        } else {
          setEvidences([]);
        }
      } catch (error) {
        setEvidences([]);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchEvidences();
  }, [user]);

  // Función para obtener el icono según el tipo de evidencia
  const getEvidenceIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'image':
      case 'imagen':
      case 'photo':
      case 'foto':
        return FiImage;
      case 'video':
        return FiVideo;
      case 'document':
      case 'documento':
      case 'pdf':
        return FiFileText;
      default:
        return FiFile;
    }
  };

  // Función para obtener el color del badge según el tipo
  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'image':
      case 'imagen':
      case 'photo':
      case 'foto':
        return 'green';
      case 'video':
        return 'blue';
      case 'document':
      case 'documento':
      case 'pdf':
        return 'orange';
      default:
        return 'purple';
    }
  };

  // Variantes de animación para las tarjetas
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }),
    hover: {
      y: -4,
      scale: 1.01,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400
      }
    }
  };

  // Variantes para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  // Variantes para el header
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <Box bg={bgColor} minH="100vh">
        <Container maxW="6xl" py={8}>
          <Flex justify="center" align="center" minH="60vh" direction="column">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Spinner size="xl" color={accentColor} thickness="4px" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Text mt={6} color={textColor} fontSize="lg" fontWeight="medium">
                Cargando evidencias...
              </Text>
            </motion.div>
          </Flex>
        </Container>
      </Box>
    );
  }

  if (evidences.length === 0) {
    return (
      <Box bg={bgColor} minH="100vh">
        <Container maxW="6xl" py={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={6} justify="center" align="center" minH="60vh">
              <Box
                p={8}
                bg={cardBg}
                borderRadius="2xl"
                border="2px dashed"
                borderColor="purple.600"
                textAlign="center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon as={FiFolder} w={16} h={16} color={mutedColor} mb={4} />
                </motion.div>
                <Heading size="lg" color={textColor} mb={2}>
                  No hay evidencias disponibles
                </Heading>
                <Text color={mutedColor} fontSize="md">
                  Las evidencias aparecerán aquí cuando sean agregadas al sistema
                </Text>
              </Box>
            </VStack>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="6xl" py={8}>
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
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
              Evidencias Digitales
            </Heading>
            <Text color={mutedColor} fontSize="lg" maxW="2xl">
              Archivo completo de evidencias recopiladas durante las investigaciones
            </Text>
            <HStack spacing={4}>
              <Badge
                colorScheme="purple"
                variant="subtle"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
              >
                <HStack spacing={1}>
                  <Icon as={FiFile} w={3} h={3} />
                  <Text>{evidences.length} evidencia{evidences.length !== 1 ? 's' : ''}</Text>
                </HStack>
              </Badge>
            </HStack>
            <Box w="120px" h="1" bg="purple.500" borderRadius="full" />
          </VStack>
        </motion.div>

        {/* Lista de evidencias */}
        <AnimatePresence>
          <MotionStack
            spacing={6}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {evidences.map((evidence, index) => {
              const IconComponent = getEvidenceIcon(evidence.type);
              const typeColor = getTypeColor(evidence.type);

              return (
                <MotionBox
                  key={evidence._id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  bg={cardBg}
                  borderRadius="xl"
                  p={6}
                  border="1px solid"
                  borderColor="gray.700"
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    bgGradient: 'linear(to-r, purple.400, purple.600, pink.400)',
                  }}
                  _hover={{
                    bg: cardHoverBg,
                    borderColor: "purple.500",
                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                  }}
                >
                  <HStack spacing={4} align="start">
                    {/* Icono de tipo de evidencia */}
                    <Box
                      p={3}
                      bg={`${typeColor}.900`}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor={`${typeColor}.700`}
                    >
                      <Icon as={IconComponent} w={6} h={6} color={`${typeColor}.400`} />
                    </Box>

                    {/* Contenido principal */}
                    <VStack align="start" spacing={3} flex={1}>
                      {/* Título y badge */}
                      <HStack justify="space-between" w="full" align="start">
                        <Heading
                          as="h3"
                          size="md"
                          color={textColor}
                          fontWeight="bold"
                          lineHeight="shorter"
                          flex={1}
                        >
                          {evidence.title}
                        </Heading>
                        <Badge
                          colorScheme={typeColor}
                          variant="solid"
                          borderRadius="full"
                          px={3}
                          py={1}
                          fontSize="xs"
                          fontWeight="bold"
                        >
                          {evidence.type || 'Archivo'}
                        </Badge>
                      </HStack>

                      {/* Descripción */}
                      <Text
                        color="gray.300"
                        fontSize="md"
                        lineHeight="relaxed"
                      >
                        {evidence.description}
                      </Text>

                      {/* Información adicional */}
                      <HStack spacing={6} pt={2}>
                        {evidence.size && (
                          <HStack spacing={2}>
                            <Icon as={FiFile} color={accentColor} w={4} h={4} />
                            <Text color={mutedColor} fontSize="sm">
                              {evidence.size}
                            </Text>
                          </HStack>
                        )}
                        {evidence.createdAt && (
                          <HStack spacing={2}>
                            <Icon as={FiClock} color={accentColor} w={4} h={4} />
                            <Text color={mutedColor} fontSize="sm">
                              {new Date(evidence.createdAt).toLocaleDateString()}
                            </Text>
                          </HStack>
                        )}
                      </HStack>
                    </VStack>

                    {/* Acciones */}
                    <VStack spacing={2}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Box
                          p={2}
                          bg="purple.900"
                          borderRadius="lg"
                          border="1px solid"
                          borderColor="purple.700"
                          cursor="pointer"
                          _hover={{
                            bg: "purple.800",
                            borderColor: "purple.500",
                          }}
                        >
                          <Icon as={FiEye} w={4} h={4} color="purple.300" />
                        </Box>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Box
                          p={2}
                          bg="gray.800"
                          borderRadius="lg"
                          border="1px solid"
                          borderColor="gray.600"
                          cursor="pointer"
                          _hover={{
                            bg: "gray.700",
                            borderColor: "gray.500",
                          }}
                        >
                          <Icon as={FiDownload} w={4} h={4} color="gray.300" />
                        </Box>
                      </motion.div>
                    </VStack>
                  </HStack>

                  {/* Overlay de hover */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgGradient="linear(to-br, transparent, purple.900)"
                    opacity={0}
                    transition="opacity 0.3s"
                    _groupHover={{ opacity: 0.05 }}
                    pointerEvents="none"
                  />
                </MotionBox>
              );
            })}
          </MotionStack>
        </AnimatePresence>

        {/* Estadísticas al final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Box mt={12}>
            <Divider borderColor="gray.700" mb={6} />
            <HStack justify="center" spacing={8}>
              <VStack>
                <Text color={accentColor} fontSize="2xl" fontWeight="bold">
                  {evidences.length}
                </Text>
                <Text color={mutedColor} fontSize="sm" textAlign="center">
                  Total de<br />Evidencias
                </Text>
              </VStack>
              <VStack>
                <Text color="green.400" fontSize="2xl" fontWeight="bold">
                  {evidences.filter(e => e.type?.toLowerCase().includes('image')).length}
                </Text>
                <Text color={mutedColor} fontSize="sm" textAlign="center">
                  Evidencias<br />Visuales
                </Text>
              </VStack>
              <VStack>
                <Text color="blue.400" fontSize="2xl" fontWeight="bold">
                  {evidences.filter(e => e.type?.toLowerCase().includes('document')).length}
                </Text>
                <Text color={mutedColor} fontSize="sm" textAlign="center">
                  Documentos<br />Digitales
                </Text>
              </VStack>
            </HStack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default EvidenceList;