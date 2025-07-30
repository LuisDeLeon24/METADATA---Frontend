import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  Container,
  Text,
  HStack,
  Icon,
  Spinner,
  useBreakpointValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FiDatabase,
  FiActivity,
  FiLayers,
  FiTrendingUp
} from 'react-icons/fi';
import LogForm from '../components/Logs/LogForm';
import LogList from '../components/Logs/LogList';
import LogFilter from '../components/Logs/LogFilter';
import { getUsers } from '../services/api.jsx';
import Navbar from '../components/common/Navbar';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHStack = motion(HStack);

const LogsPage = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Responsive values
  const containerMaxW = useBreakpointValue({
    base: "95%",
    md: "900px",
    lg: "1200px"
  });

  const headerSize = useBreakpointValue({
    base: "2xl",
    md: "3xl",
    lg: "4xl"
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        if (res.success && Array.isArray(res.data)) {
          setUsers(res.data);
        }
      } catch (error) {
        console.error('Error cargando usuarios:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
    <Navbar />
    <Box
      bg="radial-gradient(ellipse at top, #2D1B69 0%, #1A1A1A 50%, #000000 100%)"
      minH="100vh"
      w="100%"
      position="relative"
      overflow="hidden"
      pt={12}
    >
      {/* Elementos de fondo decorativos */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width="300px"
        height="300px"
        bgGradient="radial(circle, rgba(139, 69, 199, 0.1) 0%, transparent 70%)"
        borderRadius="full"
        pointerEvents="none"
        animation="float 6s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="20%"
        right="10%"
        width="200px"
        height="200px"
        bgGradient="radial(circle, rgba(139, 69, 199, 0.08) 0%, transparent 70%)"
        borderRadius="full"
        pointerEvents="none"
        animation="float 8s ease-in-out infinite reverse"
      />

      {/* Grid pattern de fondo */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        backgroundImage="linear-gradient(rgba(139, 69, 199, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 69, 199, 0.1) 1px, transparent 1px)"
        backgroundSize="50px 50px"
        pointerEvents="none"
      />

      <Container maxW={containerMaxW} py={8} position="relative" zIndex={1}>
        <MotionVStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          spacing={8}
          align="stretch"
        >
          {/* Header Section */}
          <MotionBox
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            textAlign="center"
            mb={4}
          >
            <VStack spacing={4}>
              {/* Icono principal con efecto glow */}
              <Box
                p={4}
                bg="linear-gradient(135deg, rgba(139, 69, 199, 0.2) 0%, rgba(139, 69, 199, 0.05) 100%)"
                borderRadius="full"
                border="2px solid"
                borderColor="purple.500"
                boxShadow="0 0 30px rgba(139, 69, 199, 0.4)"
                position="relative"
              >
                <Icon
                  as={FiDatabase}
                  boxSize={12}
                  color="purple.300"
                />
                {/* Anillo de pulso */}
                <Box
                  position="absolute"
                  top="-2px"
                  left="-2px"
                  right="-2px"
                  bottom="-2px"
                  borderRadius="full"
                  border="2px solid"
                  borderColor="purple.400"
                  opacity={0.6}
                  animation="pulse 2s infinite"
                />
              </Box>

              {/* Título principal */}
              <VStack spacing={2}>
                <Heading
                  size={headerSize}
                  bgGradient="linear(to-r, purple.200, white, purple.200)"
                  bgClip="text"
                  fontWeight="black"
                  letterSpacing="tight"
                  textShadow="0 0 20px rgba(139, 69, 199, 0.3)"
                >
                  Gestión de Logs
                </Heading>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.300"
                  maxW="600px"
                  lineHeight="tall"
                >
                  Sistema avanzado de monitoreo y registro de actividades.
                  Controla, filtra y gestiona todos los eventos del sistema en tiempo real.
                </Text>
              </VStack>

              {/* Stats decorativos */}
              <HStack
                spacing={8}
                mt={6}
                flexWrap="wrap"
                justify="center"
              >
                {[
                  { icon: FiActivity, label: "Monitoreo", color: "green.400" },
                  { icon: FiLayers, label: "Gestión", color: "blue.400" },
                  { icon: FiTrendingUp, label: "Análisis", color: "purple.400" }
                ].map((item, index) => (
                  <MotionBox
                    key={item.label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  >
                    <HStack
                      spacing={2}
                      bg="rgba(0, 0, 0, 0.3)"
                      px={4}
                      py={2}
                      borderRadius="full"
                      border="1px solid"
                      borderColor={item.color}
                      boxShadow={`0 0 15px rgba(${item.color === 'green.400' ? '72, 187, 120' : item.color === 'blue.400' ? '66, 153, 225' : '139, 69, 199'}, 0.2)`}
                    >
                      <Icon as={item.icon} color={item.color} boxSize={4} />
                      <Text fontSize="sm" color="gray.200" fontWeight="medium">
                        {item.label}
                      </Text>
                    </HStack>
                  </MotionBox>
                ))}
              </HStack>
            </VStack>
          </MotionBox>

          {/* Loading State */}
          {isLoading && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={12}
            >
              <VStack spacing={4}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.600"
                  color="purple.500"
                  size="xl"
                />
                <Text color="purple.300" fontSize="lg" fontWeight="medium">
                  Cargando sistema de logs...
                </Text>
              </VStack>
            </MotionBox>
          )}

          {/* Main Content */}
          {!isLoading && (
            <VStack spacing={8} align="stretch">
              {/* Filtros y Formulario en horizontal */}
              <MotionHStack
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                spacing={8}
                align="flex-start"
                flexDirection={{ base: "column", lg: "row" }}
                w="full"
              >
                {/* Filtros - Lado Izquierdo */}
                <MotionBox
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  flex="1"
                  minW={{ base: "100%", lg: "45%" }}
                >
                  <LogFilter users={users} onFilter={setFilters} />
                </MotionBox>

                {/* Formulario - Lado Derecho */}
                {/* <MotionBox
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  flex="1"
                  minW={{ base: "100%", lg: "45%" }}
                >
                  <LogForm filters={filters} />
                </MotionBox> */}
              </MotionHStack>

              {/* Lista de Logs - Centrada debajo */}
              <MotionBox
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                w="full"
                display="flex"
                justifyContent="center"
              >
                <Box w="full" maxW="1000px">
                  <LogList filters={filters} />
                </Box>
              </MotionBox>
            </VStack>
          )}
        </MotionVStack>
      </Container>

      {/* Keyframes CSS para animaciones */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
          }
        `}
      </style>
    </Box>
    </>
  );
};

export default LogsPage;