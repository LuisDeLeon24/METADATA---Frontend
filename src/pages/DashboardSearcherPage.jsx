import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Text,
  Center,
  Spinner,
  Flex,
  Icon,
  Container,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  MdFolder, 
  MdCameraAlt, 
  MdAnalytics,
  MdTrendingUp,
  MdAssignment,
  MdVerifiedUser,
} from "react-icons/md";
import { 
  FiActivity,
  FiClock,
  FiUser,
  FiCalendar,
} from "react-icons/fi";
import CaseList from "../components/DashboardUserPage/CaseList.jsx";
import EvidenceList from "../components/DashboardUserPage/EvidenceList";
import AnalysisList from "../components/DashboardUserPage/AnalysisList";
import Navbar from "../components/common/Navbar.jsx";
import {
  getCasesByResearcher,
  getEvidenceByUser,
  getAnalyses,
} from "../services/api.jsx";

// Componentes animados
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const DashboardUserPage = () => {
  const [caseCount, setCaseCount] = useState(null);
  const [evidenceCount, setEvidenceCount] = useState(null);
  const [analysisCount, setAnalysisCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  // Colores de la paleta negro y morado
  const bgColor = useColorModeValue('gray.900', 'gray.900');
  const cardBg = useColorModeValue('gray.800', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.700', 'gray.700');
  const textColor = useColorModeValue('white', 'white');
  const accentColor = useColorModeValue('purple.400', 'purple.400');
  const secondaryColor = useColorModeValue('purple.200', 'purple.200');
  const mutedColor = useColorModeValue('gray.400', 'gray.400');

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const [cases, evidences, analyses] = await Promise.all([
          getCasesByResearcher(),
          getEvidenceByUser(),
          getAnalyses(),
        ]);

        setCaseCount(cases.success ? cases.data.length : 0);
        setEvidenceCount(evidences.success ? evidences.data.length : 0);
        setAnalysisCount(analyses.success ? analyses.data.length : 0);
      } catch {
        setCaseCount(0);
        setEvidenceCount(0);
        setAnalysisCount(0);
      } finally {
        setLoading(false);
      }
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser?.username || "Investigador");
    }

    fetchCounts();
  }, []);

  // Datos de las tarjetas de estadísticas
  const statsCards = [
    {
      title: "Casos Activos",
      count: caseCount,
      icon: MdFolder,
      color: "blue",
      gradient: "linear(to-r, blue.400, blue.600)",
      description: "Casos asignados",
    },
    {
      title: "Evidencias",
      count: evidenceCount,
      icon: MdCameraAlt,
      color: "green",
      gradient: "linear(to-r, green.400, green.600)",
      description: "Archivos digitales",
    },
    {
      title: "Análisis",
      count: analysisCount,
      icon: MdAnalytics,
      color: "purple",
      gradient: "linear(to-r, purple.400, purple.600)",
      description: "Reportes generados",
    },
  ];

  // Configuración de tabs
  const tabsConfig = [
    {
      label: "Casos",
      icon: MdFolder,
      component: CaseList,
      color: "blue.400",
    },
    {
      label: "Evidencias",
      icon: MdCameraAlt,
      component: EvidenceList,
      color: "green.400",
    },
    {
      label: "Análisis",
      icon: MdAnalytics,
      component: AnalysisList,
      color: "purple.400",
    },
  ];

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      }
    },
    hover: {
      y: -8,
      scale: 1.03,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400,
      }
    }
  };

  if (loading) {
    return (
      <Box bg={bgColor} minH="100vh">
        <Center minH="100vh">
          <VStack spacing={6}>
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Spinner size="xl" color={accentColor} thickness="4px" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Text color={textColor} fontSize="lg" fontWeight="medium">
                Cargando dashboard...
              </Text>
            </motion.div>
          </VStack>
        </Center>
      </Box>
    );
  }

  return (
    <>
    <Navbar />
    <Box bg={bgColor} minH="100vh" position="relative" overflow="hidden" pt='100px' >
      {/* Fondo decorativo */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="400px"
        bgGradient="radial(circle at 50% 0%, purple.900 0%, transparent 70%)"
        opacity={0.3}
        zIndex={0}
      />
      
      <Container maxW="7xl" py={8} position="relative" zIndex={1}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header del Dashboard */}
          <MotionBox variants={itemVariants} mb={10}>
            <VStack spacing={6} textAlign="center">
              {/* Avatar y saludo */}
              <HStack spacing={4}>
                <Avatar
                  size="lg"
                  name={username}
                  bg="purple.500"
                  color="white"
                  border="3px solid"
                  borderColor="purple.400"
                />
                <VStack align="start" spacing={1}>
                  <Heading 
                    size="xl" 
                    color={textColor}
                    fontWeight="bold"
                  >
                    Bienvenido, {username}
                  </Heading>
                  <HStack spacing={2} color={mutedColor}>
                    <Icon as={FiUser} w={4} h={4} />
                    <Text fontSize="sm">Investigador Digital</Text>
                    <Icon as={FiCalendar} w={4} h={4} />
                    <Text fontSize="sm">
                      {new Date().toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>

              {/* Badge de estado */}
              <Badge
                colorScheme="green"
                variant="solid"
                px={4}
                py={2}
                borderRadius="full"
                fontSize="sm"
              >
                <HStack spacing={2}>
                  <Icon as={FiActivity} w={3} h={3} />
                  <Text>Sistema Activo</Text>
                </HStack>
              </Badge>
            </VStack>
          </MotionBox>

          {/* Tarjetas de estadísticas */}
          <MotionBox variants={itemVariants} mb={10}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {statsCards.map((card, index) => (
                <MotionBox
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  bg={cardBg}
                  borderRadius="2xl"
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
                    height: '4px',
                    bgGradient: card.gradient,
                  }}
                  _hover={{
                    borderColor: `${card.color}.500`,
                    boxShadow: `0 20px 40px rgba(139, 92, 246, 0.2)`,
                  }}
                >
                  <VStack spacing={4} align="start">
                    {/* Icono y título */}
                    <HStack justify="space-between" w="full">
                      <Box
                        p={3}
                        bg={`${card.color}.900`}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor={`${card.color}.700`}
                      >
                        <Icon 
                          as={card.icon} 
                          w={6} 
                          h={6} 
                          color={`${card.color}.400`} 
                        />
                      </Box>
                      <Icon as={MdTrendingUp} w={5} h={5} color={mutedColor} />
                    </HStack>

                    {/* Contador principal */}
                    <VStack align="start" spacing={1} w="full">
                      <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        color={textColor}
                        lineHeight="1"
                      >
                        {card.count !== null ? card.count : '--'}
                      </Text>
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        color={`${card.color}.300`}
                      >
                        {card.title}
                      </Text>
                      <Text fontSize="sm" color={mutedColor}>
                        {card.description}
                      </Text>
                    </VStack>

                    {/* Indicador de progreso */}
                    <Box w="full" h="2px" bg="gray.700" borderRadius="full">
                      <Box
                        h="full"
                        bg={`${card.color}.400`}
                        borderRadius="full"
                        w={`${Math.min((card.count || 0) * 10, 100)}%`}
                      />
                    </Box>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>

          {/* Tabs principales */}
          <MotionBox variants={itemVariants}>
            <Tabs 
              index={activeTab}
              onChange={setActiveTab}
              variant="unstyled"
              isLazy
            >
              {/* Tab List personalizado */}
              <Box mb={8}>
                <TabList
                  bg={cardBg}
                  p={2}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.700"
                  display="flex"
                  gap={2}
                >
                  {tabsConfig.map((tab, index) => (
                    <Tab
                      key={index}
                      flex={1}
                      borderRadius="lg"
                      py={4}
                      px={6}
                      transition="all 0.3s"
                      _selected={{
                        bg: "purple.600",
                        color: "white",
                        boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
                      }}
                      _hover={{
                        bg: activeTab === index ? "purple.600" : "gray.700",
                      }}
                    >
                      <MotionFlex
                        align="center"
                        gap={3}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: activeTab === index ? 1 : 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon 
                          as={tab.icon} 
                          boxSize={5}
                          color={activeTab === index ? "white" : tab.color}
                        />
                        <Text fontWeight="semibold" fontSize="md" color='whiteAlpha.800' >
                          {tab.label}
                        </Text>
                        {/* Indicador de cuenta */}
                        <Badge
                          size="sm"
                          borderRadius="full"
                          bg={activeTab === index ? "purple.800" : "gray.600"}
                          color="white"
                          minW="24px"
                          textAlign="center"
                        >
                          {index === 0 ? caseCount : 
                           index === 1 ? evidenceCount : 
                           analysisCount}
                        </Badge>
                      </MotionFlex>
                    </Tab>
                  ))}
                </TabList>
              </Box>

              {/* Tab Panels */}
              <TabPanels>
                <AnimatePresence mode="wait">
                  {tabsConfig.map((tab, index) => (
                    <TabPanel key={index} p={0}>
                      {activeTab === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Box
                            bg={cardBg}
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="gray.700"
                            overflow="hidden"
                          >
                            <tab.component />
                          </Box>
                        </motion.div>
                      )}
                    </TabPanel>
                  ))}
                </AnimatePresence>
              </TabPanels>
            </Tabs>
          </MotionBox>

          {/* Footer con información adicional */}
          <MotionBox variants={itemVariants} mt={12}>
            <Divider borderColor="gray.700" mb={6} />
            <HStack justify="space-between" color={mutedColor} fontSize="sm">
              <HStack spacing={4}>
                <HStack spacing={2}>
                  <Icon as={FiClock} w={4} h={4} />
                  <Text>Última actualización: {new Date().toLocaleTimeString()}</Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={MdVerifiedUser} w={4} h={4} />
                  <Text>Sistema verificado</Text>
                </HStack>
              </HStack>
              <Text>Dashboard v2.0</Text>
            </HStack>
          </MotionBox>
        </motion.div>
      </Container>
    </Box>
    </>
  );
};

export default DashboardUserPage;