import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  Spinner,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  useToast,
  Icon,
  Button,
  Flex,
  Container,
  Badge,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaDownload, FaFileImage, FaFilePdf } from 'react-icons/fa';
import { useAnalysisView } from '../../shared/hooks/analysis/useAnalysisView';
import { logout } from '../../shared/hooks';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionFlex = motion(Flex);

const AnalysisList = () => {
  const { analyses, isLoading, error, fetchAnalyses } = useAnalysisView();
  const [username, setUsername] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const { username } = JSON.parse(userData);
      setUsername(username);
    }
  }, []);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al cargar los análisis.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleCardClick = (id) => {
    setSelectedCardId((prevId) => (prevId === id ? null : id));
  };

  const handleDownloadPdf = (analysis) => {
    console.log('Descargando PDF para:', analysis._id);
  };

  if (isLoading) {
    return (
      <Box
        minH="100vh"
        bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
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
            Cargando análisis...
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Background Effects */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.1"
        bgImage="radial-gradient(circle at 25% 25%, purple.500 0%, transparent 50%), radial-gradient(circle at 75% 75%, purple.700 0%, transparent 50%)"
      />

      <Container maxW="7xl" py={40} position="relative" zIndex={1}>
        {/* Header Section */}
        <MotionFlex
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          justify="space-between"
          align="center"
          mb={12}
          flexWrap="wrap"
          gap={4}
        >
          <VStack align="start" spacing={2}>
            <HStack spacing={3}>
              <Icon as={FaDownload} boxSize={6} color="purple.400" />
              <Heading
                size="2xl"
                bgGradient="linear(to-r, purple.200, purple.400)"
                bgClip="text"
                fontWeight="bold"
              >
                Bienvenido, {username}
              </Heading>
            </HStack>
            <Text fontSize="lg" color="gray.300" maxW="md">
              Explora tus análisis de evidencia digital con tecnología de IA avanzada
            </Text>
          </VStack>

          <HStack spacing={4}>
            <Button
              leftIcon={<FaFileImage />}
              bg="linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
              color="white"
              size="lg"
              borderRadius="xl"
              px={8}
              py={6}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
              }}
              transition="all 0.3s ease"
              onClick={() => navigate('/analyze')}
            >
              Analizar IMG
            </Button>
            <Button
              leftIcon={<FaFilePdf />}
              bg="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
              color="white"
              size="lg"
              borderRadius="xl"
              px={8}
              py={6}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)"
              }}
              transition="all 0.3s ease"
              onClick={() => navigate('/analyzePdf')}
            >
              Analizar PDF
            </Button>
            <Button
              leftIcon={<FaFilePdf />}
              bg="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
              color="white"
              size="lg"
              borderRadius="xl"
              px={8}
              py={6}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)"
              }}
              transition="all 0.3s ease"
              onClick={() => navigate('/osint')}
            >
              OSINT
            </Button>
          </HStack>
        </MotionFlex>

        {/* Stats Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          mb={12}
        >
          <HStack spacing={8} justify="center">
            <VStack>
              <Text fontSize="3xl" fontWeight="bold" color="purple.400">
                {analyses.length}
              </Text>
              <Text color="gray.400" textAlign="center">
                Análisis Totales
              </Text>
            </VStack>
            <Divider orientation="vertical" h="60px" borderColor="purple.700" />
            <VStack>
              <Text fontSize="3xl" fontWeight="bold" color="purple.400">
                {analyses.filter(a => a.resultado.includes('Positivo')).length}
              </Text>
              <Text color="gray.400" textAlign="center">
                Detecciones
              </Text>
            </VStack>
          </HStack>
        </MotionBox>

              {/* Si no hay análisis, mostrar mensaje en lugar del Grid */}
{analyses.length === 0 ? (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    bg="rgba(139, 92, 246, 0.1)"
    backdropFilter="blur(10px)"
    border="1px solid"
    borderColor="purple.500"
    borderRadius="2xl"
    p={12}
    textAlign="center"
    mb={12}
  >
    <Icon as={FaRobot} boxSize={16} color="purple.400" mb={4} />
    <Text color="purple.200" fontSize="xl" fontWeight="medium">
      No hay análisis disponibles
    </Text>
    <Text color="gray.400" mt={2}>
      Comienza creando tu primer análisis
    </Text>
  </MotionBox>
) : (
  <Grid
    templateColumns={{
      base: '1fr',
      md: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)'
    }}
    gap={8}
  >
    <AnimatePresence>
      {analyses.map((analysis, i) => {
        const isSelected = selectedCardId === analysis._id;
        return (
          // 👇 Tu componente MotionCard completo aquí
          <MotionCard
            key={analysis._id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    rotateY: 5
                  }}
                  bg="rgba(30, 30, 30, 0.8)"
                  backdropFilter="blur(20px)"
                  border="1px solid"
                  borderColor={isSelected ? "purple.400" : "rgba(139, 92, 246, 0.2)"}
                  borderRadius="2xl"
                  overflow="hidden"
                  cursor="pointer"
                  onClick={() => handleCardClick(analysis._id)}
                  position="relative"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    bg: "linear-gradient(90deg, #8b5cf6, #a855f7, #c084fc)",
                    opacity: isSelected ? 1 : 0.7
                  }}
          >
            <CardHeader pb={4}>
                    <Flex align="center" justify="space-between">
                      <HStack spacing={3}>
                        <Box
                          p={2}
                          bg="linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
                          borderRadius="lg"
                        >
                          <Icon as={FaRobot} boxSize={5} color="white" />
                        </Box>
                        <VStack align="start" spacing={0}>
                          <Heading size="md" color="white" fontWeight="bold">
                            Análisis IA
                          </Heading>
                          <Text fontSize="sm" color="gray.400">
                            ID: {analysis._id.slice(-6)}
                          </Text>
                        </VStack>
                      </HStack>
                      <Badge
                        bg={analysis.resultado.includes('Positivo') ? 'red.500' : 'green.500'}
                        color="white"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        {analysis.resultado.includes('Positivo') ? 'DETECTADO' : 'LIMPIO'}
                      </Badge>
                    </Flex>
                  </CardHeader>

                  <CardBody pt={0}>
                    <Stack spacing={6}>
                      <Box>
                        <Text
                          fontWeight="bold"
                          color="purple.300"
                          fontSize="sm"
                          mb={2}
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          Resultado del Análisis
                        </Text>
                        <Box
                          bg="rgba(139, 92, 246, 0.1)"
                          p={3}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor="purple.700"
                        >
                          <Text color="white" fontSize="sm" lineHeight="tall">
                            {analysis.resultado}
                          </Text>
                        </Box>
                      </Box>

                      <Box>
                        <Text
                          fontWeight="bold"
                          color="purple.300"
                          fontSize="sm"
                          mb={2}
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          Modelos de IA
                        </Text>
                        <HStack spacing={2} flexWrap="wrap">
                          {analysis.modelosIa.split(',').map((modelo, idx) => (
                            <Badge
                              key={idx}
                              bg="rgba(99, 102, 241, 0.2)"
                              color="purple.200"
                              px={2}
                              py={1}
                              borderRadius="md"
                              fontSize="xs"
                            >
                              {modelo.trim()}
                            </Badge>
                          ))}
                        </HStack>
                      </Box>

                      <Box>
                        <Text
                          fontWeight="bold"
                          color="purple.300"
                          fontSize="sm"
                          mb={2}
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          Metadatos
                        </Text>
                        <Box
                          bg="rgba(30, 30, 30, 0.5)"
                          p={3}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor="gray.700"
                          maxH={isSelected ? "none" : "100px"}
                          overflow="hidden"
                          position="relative"
                        >
                          <Text
                            color="gray.300"
                            fontSize="xs"
                            fontFamily="mono"
                            whiteSpace="pre-wrap"
                            lineHeight="short"
                          >
                            {analysis.metadatos}
                          </Text>
                          {!isSelected && (
                            <Box
                              position="absolute"
                              bottom="0"
                              left="0"
                              right="0"
                              height="30px"
                              bg="linear-gradient(transparent, rgba(30, 30, 30, 0.9))"
                            />
                          )}
                        </Box>
                      </Box>

                      <AnimatePresence>
                        {isSelected && (
                          <MotionBox
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Button
                              leftIcon={<FaDownload />}
                              bg="linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
                              color="white"
                              size="lg"
                              width="100%"
                              borderRadius="xl"
                              py={6}
                              _hover={{
                                transform: "translateY(-2px)",
                                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)"
                              }}
                              transition="all 0.3s ease"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadPdf(analysis);
                              }}
                            >
                              Descargar Reporte PDF
                            </Button>
                          </MotionBox>
                        )}
                      </AnimatePresence>
                    </Stack>
                  </CardBody>
          </MotionCard>
        );
      })}
    </AnimatePresence>
  </Grid>
)}

      </Container>
    </Box>
  );
};

export default AnalysisList;