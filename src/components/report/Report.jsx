import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Text, Button, VStack, HStack, Card, CardHeader, CardBody,
  Textarea, useColorModeValue, Alert, AlertIcon, AlertDescription,
  Spinner, useToast, Container, Flex, IconButton, Badge, Divider,
  Tooltip, Progress, Avatar, Stack
} from '@chakra-ui/react';
import { ArrowBackIcon, EditIcon, DownloadIcon, ViewIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useOpenRouterChat } from '../../shared/hooks/useOpenRouterChat';
import { useCases } from '../../shared/hooks/useCases';
import { getCaseById } from '../../services/api';
import { useReport } from '../../shared/hooks/useReport';
import PdfReport from './PdfReport';

// Motion components
const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionButton = motion(Button);

const Report = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const caseId = searchParams.get('caseId');

  const { analyses, isLoading: casesLoading, fetchAnalysesByCaseId } = useCases();
  const { createReport, isLoading: reportLoading } = useReport();
  const { sendMessage, response, loading: aiLoading, error: aiError } = useOpenRouterChat();

  const [caseData, setCaseData] = useState(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [progress, setProgress] = useState(0);

  // Enhanced color scheme with purple and black theme
  const bgGradient = useColorModeValue(
    'linear(to-br, gray.50, purple.50)',
    'linear(to-br, gray.900, purple.900, black)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('purple.200', 'purple.600');
  const headerBg = useColorModeValue('purple.50', 'purple.900');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const accentColor = useColorModeValue('purple.600', 'purple.300');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  useEffect(() => {
    if (!caseId) {
      toast({
        title: 'Error',
        description: 'ID de caso no válido',
        status: 'error',
        duration: 3000,
        position: 'top-right'
      });
      navigate('/cases');
      return;
    }
    loadCaseData();
  }, [caseId]);

  useEffect(() => {
    if (response && typeof response === 'string') {
      setGeneratedContent(response);
    }
  }, [response]);

  useEffect(() => {
    if (aiLoading) {
      const interval = setInterval(() => {
        setProgress(prev => prev < 90 ? prev + 10 : prev);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [aiLoading]);

  const loadCaseData = async () => {
    try {
      setLoadingData(true);
      const caseResult = await getCaseById(caseId);
      console.log(caseResult);

      if (caseResult.error) throw new Error(caseResult.msg);
      setCaseData(caseResult.case);
      await fetchAnalysesByCaseId(caseId);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        position: 'top-right'
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleGenerateReport = async () => {
    try {
      if (!analyses || analyses.length === 0) {
        toast({
          title: 'Sin análisis',
          description: 'No hay análisis disponibles para generar el reporte.',
          status: 'warning',
          duration: 3000,
          position: 'top-right'
        });
        return;
      }

      setProgress(0);
      const prompt = `Actúa como un analista senior en una unidad de inteligencia digital especializada en vigilancia forense. Tu tarea es redactar un informe técnico confidencial que compile y analice en profundidad una serie de resultados generados por modelos de inteligencia artificial sobre evidencias digitales pertenecientes al mismo caso investigativo.

Estructura el informe en tres secciones: **Introducción**, **Análisis y Hallazgos**, y **Conclusiones y Recomendaciones**.

- En la **introducción**, contextualiza brevemente el objetivo del informe y la naturaleza de la evidencia analizada.
- En la sección de **análisis y hallazgos**, describe patrones detectados, correlaciones entre evidencias, anomalías relevantes, y cualquier posible implicación en términos de comportamiento, intención o riesgo digital. Asume que todas las evidencias están conectadas y pertenecen al mismo caso.
- En las **conclusiones y recomendaciones**, sintetiza los hallazgos, extrae inferencias, plantea hipótesis operativas sólidas, y propone acciones sugeridas desde un enfoque de inteligencia aplicada y ciberseguridad.

El tono debe ser técnico, profesional y estratégico, como si fuera elaborado por una unidad de análisis de alto nivel (ej. Palantir o la NSA). No incluyas fechas, nombres de investigadores ni referencias personales. Asegúrate de que el informe sea lógico, persuasivo, claro y altamente informativo, como si se destinara a una junta de operaciones sensibles.

A continuación se presentan los resultados de los modelos de IA, cada uno correspondiente a una evidencia del caso:

${analyses.map((a, i) => `Evidencia ${i + 1}:\n${a.resultado}`).join('\n\n')}`;

      console.log('Prompt:', prompt);
      await sendMessage(prompt);
      toast({
        title: 'Generando reporte',
        status: 'info',
        duration: 3000,
        position: 'top-right'
      });
    } catch (error) {
      toast({
        title: 'Error al generar',
        description: error.message,
        status: 'error',
        duration: 5000,
        position: 'top-right'
      });
    }
  };

  const handleSaveReport = async () => {
    try {
      if (!generatedContent) {
        toast({
          title: 'Contenido vacío',
          description: 'Genera el reporte antes de guardarlo.',
          status: 'warning',
          duration: 3000,
          position: 'top-right'
        });
        return;
      }
      const evidenceIds = analyses?.map(a => a.evidenceID).filter(Boolean) || [];

      const data = {
        caseID: caseId,
        content: generatedContent,
        evidence: evidenceIds,
        confidential: true
      };

      console.log('Datos para enviar a backend:', data);

      const response = await createReport(data);
      console.log('Respuesta backend:', response);

      if (response.success) {
        toast({
          title: 'Reporte guardado',
          status: 'success',
          duration: 3000,
          position: 'top-right'
        });
      } else {
        toast({
          title: 'Error',
          description: response.msg || 'Error desconocido',
          status: 'error',
          duration: 5000,
          position: 'top-right'
        });
      }
    } catch (error) {
      toast({
        title: 'Error al guardar',
        description: error.message || 'Ocurrió un error al guardar el reporte.',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      });
    }
  };

  if (loadingData || casesLoading) {
    return (
      <Box bgGradient={bgGradient} minH="100vh">
        <Container maxW="7xl" py={20}>
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Flex justify="center" align="center" minH="50vh">
              <VStack spacing={6}>
                <Box position="relative">
                  <Spinner
                    size="xl"
                    color="purple.500"
                    thickness="4px"
                    speed="0.65s"
                  />
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                  >
                    <Avatar
                      size="sm"
                      bg="purple.500"
                      icon={<ViewIcon color="white" />}
                    />
                  </Box>
                </Box>
                <VStack spacing={2}>
                  <Text fontSize="lg" fontWeight="medium" color={textColor}>
                    Cargando caso forense...
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Preparando análisis de evidencias
                  </Text>
                </VStack>
              </VStack>
            </Flex>
          </MotionBox>
        </Container>
      </Box>
    );
  }

  return (
    <Box bgGradient={bgGradient} minH="100vh">
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Container maxW="7xl" py={8}>
          {/* Header Section */}
          <MotionBox variants={itemVariants} mb={8}>
            <Card
              bg={cardBg}
              borderColor={cardBorder}
              borderWidth="1px"
              shadow="xl"
            >
              <CardBody p={6}>
                <HStack justify="space-between" align="center">
                  <HStack spacing={4}>
                    <Tooltip label="Volver a casos" hasArrow>
                      <MotionButton
                        as={IconButton}
                        icon={<ArrowBackIcon />}
                        onClick={() => navigate('/cases')}
                        variant="ghost"
                        colorScheme="purple"
                        size="lg"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        aria-label="Volver"
                      />
                    </Tooltip>
                    <VStack align="start" spacing={1}>
                      <HStack>
                        <Heading size="xl" color={accentColor} fontWeight="bold">
                          Reporte Forense
                        </Heading>
                        <Badge
                          colorScheme="purple"
                          variant="subtle"
                          px={3}
                          py={1}
                          borderRadius="full"
                        >
                          CONFIDENCIAL
                        </Badge>
                      </HStack>
                      <Text fontSize="lg" color="gray.500" fontWeight="medium">
                        {caseData?.title}
                      </Text>
                      <HStack spacing={4}>
                        <Text fontSize="sm" color="gray.400">
                          ID: {caseId}
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                          Evidencias: {analyses?.length || 0}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>

                  {generatedContent && (
                    <Tooltip label={isEditMode ? "Modo vista" : "Modo edición"} hasArrow>
                      <MotionButton
                        leftIcon={<EditIcon />}
                        onClick={() => setIsEditMode(!isEditMode)}
                        variant="ghost"
                        colorScheme="purple"
                        size="lg"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        {isEditMode ? 'Vista' : 'Editar'}
                      </MotionButton>
                    </Tooltip>
                  )}
                </HStack>
              </CardBody>
            </Card>
          </MotionBox>

          {/* Main Report Card */}
          <MotionCard
            bg={cardBg}
            borderColor={cardBorder}
            borderWidth="1px"
            shadow="2xl"
            variants={cardVariants}
            whileHover="hover"
            overflow="hidden"
          >
            <CardHeader bg={headerBg} borderBottomWidth="1px" borderColor={cardBorder}>
              <HStack justify="space-between" align="center">
                <VStack align="start" spacing={1}>
                  <Heading size="lg" color={accentColor}>
                    Análisis de Inteligencia Digital
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Generado por IA forense avanzada
                  </Text>
                </VStack>

                {/* Action Buttons */}
                <HStack spacing={3}>
                  <MotionButton
                    colorScheme="purple"
                    onClick={handleGenerateReport}
                    isLoading={aiLoading}
                    loadingText="Procesando..."
                    size="md"
                    leftIcon={!aiLoading ? <ViewIcon /> : undefined}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    bg="purple.600"
                    _hover={{ bg: "purple.700" }}
                  >
                    {generatedContent ? 'Regenerar' : 'Generar Reporte'}
                  </MotionButton>

                  <AnimatePresence>
                    {generatedContent && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HStack spacing={2}>
                          <MotionButton
                            colorScheme="green"
                            onClick={handleSaveReport}
                            isLoading={reportLoading}
                            loadingText="Guardando..."
                            size="md"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Guardar
                          </MotionButton>
                          <PdfReport
                            caseData={caseData}
                            generatedContent={generatedContent}
                            analyses={analyses}
                            caseId={caseId}
                          />
                        </HStack>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </HStack>
              </HStack>
            </CardHeader>

            <CardBody p={6}>
              <VStack spacing={6} align="stretch">
                {/* Progress Bar for AI Loading */}
                <AnimatePresence>
                  {aiLoading && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VStack spacing={3}>
                        <Progress
                          value={progress}
                          colorScheme="purple"
                          size="lg"
                          borderRadius="full"
                          bg="purple.100"
                          w="full"
                        />
                        <Text fontSize="sm" color="gray.500">
                          Analizando evidencias digitales...
                        </Text>
                      </VStack>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Alert */}
                <AnimatePresence>
                  {aiError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert status="error" borderRadius="lg" bg="red.50" borderColor="red.200">
                        <AlertIcon />
                        <AlertDescription color="red.700">
                          {aiError}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                  {aiLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Flex justify="center" py={20}>
                        <VStack spacing={4}>
                          <Box position="relative">
                            <Spinner size="xl" color="purple.500" thickness="4px" />
                            <Box
                              position="absolute"
                              top="50%"
                              left="50%"
                              transform="translate(-50%, -50%)"
                              w="20px"
                              h="20px"
                              bg="purple.500"
                              borderRadius="full"
                              opacity={0.8}
                            />
                          </Box>
                          <VStack spacing={2}>
                            <Text fontSize="lg" fontWeight="medium" color={textColor}>
                              Procesando análisis forense
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              La IA está compilando evidencias digitales...
                            </Text>
                          </VStack>
                        </VStack>
                      </Flex>
                    </motion.div>
                  ) : generatedContent ? (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {isEditMode ? (
                        <Textarea
                          value={generatedContent}
                          onChange={e => setGeneratedContent(e.target.value)}
                          minH="600px"
                          fontSize="sm"
                          bg={useColorModeValue('gray.50', 'gray.900')}
                          borderColor={cardBorder}
                          borderWidth="2px"
                          borderRadius="lg"
                          _focus={{
                            borderColor: 'purple.400',
                            boxShadow: '0 0 0 1px purple.400'
                          }}
                          fontFamily="mono"
                          resize="vertical"
                        />
                      ) : (
                        <Box
                          p={6}
                          border="2px solid"
                          borderColor={cardBorder}
                          borderRadius="lg"
                          bg={useColorModeValue('gray.50', 'gray.900')}
                          position="relative"
                          overflow="hidden"
                        >
                          <Box
                            position="absolute"
                            top={0}
                            left={0}
                            w="full"
                            h="4px"
                            bgGradient="linear(to-r, purple.400, purple.600, purple.400)"
                          />
                          <Text
                            whiteSpace="pre-wrap"
                            fontSize="sm"
                            lineHeight="tall"
                            color={textColor}
                            fontFamily="system-ui"
                          >
                            {generatedContent}
                          </Text>
                        </Box>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <VStack spacing={6} py={20}>
                        <Box
                          w={20}
                          h={20}
                          bg="purple.100"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <ViewIcon w={8} h={8} color="purple.500" />
                        </Box>
                        <VStack spacing={2}>
                          <Text fontSize="lg" fontWeight="medium" color={textColor}>
                            Reporte no generado
                          </Text>
                          <Text fontSize="sm" color="gray.500" textAlign="center" maxW="md">
                            Haz clic en "Generar Reporte" para crear un análisis forense detallado
                            basado en las evidencias digitales del caso.
                          </Text>
                        </VStack>
                      </VStack>
                    </motion.div>
                  )}
                </AnimatePresence>
              </VStack>
            </CardBody>
          </MotionCard>
        </Container>
      </MotionBox>
    </Box>
  );
};

export default Report;