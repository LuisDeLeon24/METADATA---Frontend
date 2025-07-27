import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Select,
  VStack,
  HStack,
  Container,
  Progress,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Badge,
  Divider,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShield,
  FiTarget,
  FiZap,
  FiUpload,
  FiFile,
  FiCheck,
  FiClock,
  FiAlertTriangle,
  FiRefreshCw
} from 'react-icons/fi';

import { usePdfEvidenceUpload } from '../../shared/hooks/pdf-analysis/usePdfEvidenceUpload';
import { useOpenRouterChat } from '../../shared/hooks/image-analysis';
import { useCases } from '../../shared/hooks/cases';
import { useUploadAnalysis } from '../../shared/hooks/analysis/useUploadAnalysis';

// Motion Components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);
const MotionAlert = motion(Alert);
const MotionVStack = motion(VStack);

const PdfEvidenceUploader = ({ userId }) => {
  const [selectedCaseId, setSelectedCaseId] = React.useState('');
  const [evidenceId, setEvidenceId] = React.useState(null);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const {
    file,
    text,
    uploadProgress,
    currentStep,
    error,
    success,
    pdfUrl,
    isLoading,
    steps,
    processPdfFile,
    resetStates,
    uploadToCloudinaryEffect,
    saveEvidenceEffect,
    extractingText,
    uploadingToCloud,
    savingEvidence,
    evidenceUrl,
    evidenceIdRef,
  } = usePdfEvidenceUpload(selectedCaseId, userId, setEvidenceId);

  const { cases, loading: loadingCases, error: errorCases } = useCases();
  const {
    saveAnalysis,
    isSaving: savingAnalysis,
    saveError: analysisError
  } = useUploadAnalysis();

  const { sendMessage, response: aiAnalysis, loading: aiLoading, error: aiError } = useOpenRouterChat();
  const hasSavedAnalysis = React.useRef(false);

  // Effects
  useEffect(() => {
    uploadToCloudinaryEffect();
  }, [text, extractingText]);

  useEffect(() => {
    saveEvidenceEffect();
  }, [evidenceUrl, uploadingToCloud]);

  useEffect(() => {
    if (text && !extractingText && !aiLoading && !aiAnalysis && success) {
      const prompt = `Describe el siguiente texto: \n\n${text}`;
      sendMessage(prompt);
    }
  }, [text, extractingText, success, aiLoading, aiAnalysis]);

  useEffect(() => {
    const finalId = evidenceIdRef.current;
    if (aiAnalysis && finalId && !hasSavedAnalysis.current) {
      hasSavedAnalysis.current = true;
      saveAnalysis({
        evidenciaID: finalId,
        resultado: aiAnalysis,
        modelosIa: 'OpenRouter GPT-3.5',
        metadatos: JSON.stringify({
          length: aiAnalysis.length,
          generatedAt: new Date().toISOString()
        })
      }).then(() => {
        console.log('[DEBUG] saveAnalysis terminó correctamente');
      }).catch((err) => {
        console.error('[DEBUG] saveAnalysis fallo:', err);
        hasSavedAnalysis.current = false;
      });
    }
  }, [aiAnalysis]);

  // Handlers
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      processPdfFile(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      processPdfFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-1, 1, -1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Box
      minH="100vh"
      pt="100px"
      pb="70px"
      bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Elementos flotantes de fondo */}
      <MotionBox
        position="absolute"
        top="10%"
        left="5%"
        w="300px"
        h="300px"
        borderRadius="50%"
        bg="linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))"
        filter="blur(40px)"
        variants={floatingVariants}
        animate="animate"
      />
      <MotionBox
        position="absolute"
        bottom="10%"
        right="5%"
        w="200px"
        h="200px"
        borderRadius="50%"
        bg="linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
        filter="blur(30px)"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1, duration: 8 }}
      />

      <Container maxW="6xl" px={6} position="relative" zIndex={1}>
        <MotionVStack
          spacing={10}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <MotionVStack spacing={6} textAlign="center" variants={cardVariants}>
            <MotionBox
              w="80px"
              h="80px"
              bg="linear-gradient(135deg, #8B5CF6, #A855F7, #3B82F6)"
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="40px"
              variants={pulseVariants}
              animate="animate"
            >
              <Icon as={FiShield} color="white" />
            </MotionBox>

            <Heading
              fontSize={{ base: "3xl", md: "6xl" }}
              fontWeight="900"
              letterSpacing="tight"
              bgGradient="linear(135deg, #8B5CF6 0%, #EC4899 25%, #3B82F6 50%, #8B5CF6 75%, #EC4899 100%)"
              bgClip="text"
              textShadow="0 0 30px rgba(139, 92, 246, 0.5)"
            >
              DocuForense
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="rgba(255, 255, 255, 0.8)"
              fontWeight="500"
              maxW="2xl"
              lineHeight="1.6"
            >
              Revoluciona la investigación criminal con IA avanzada.
              <br />
              <Text as="span" color="#a855f7" fontWeight="700">
                Análisis instantáneo de documentos PDF
              </Text>{' '}
              y extracción de contenido con precisión forense.
            </Text>

            <Grid templateColumns="repeat(3, 1fr)" gap={8} mt={8}>
              <GridItem textAlign="center">
                <Text fontSize="2xl" color="#a855f7" fontWeight="bold">99.9%</Text>
                <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Precisión</Text>
              </GridItem>
              <GridItem textAlign="center">
                <Text fontSize="2xl" color="#3b82f6" fontWeight="bold">&lt;10s</Text>
                <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Análisis</Text>
              </GridItem>
              <GridItem textAlign="center">
                <Text fontSize="2xl" color="#ec4899" fontWeight="bold">24/7</Text>
                <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Disponible</Text>
              </GridItem>
            </Grid>
          </MotionVStack>

          {/* Selección de Caso */}
          <MotionBox
            w="100%"
            bg="rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(139, 92, 246, 0.3)"
            borderRadius="16px"
            overflow="hidden"
            position="relative"
            variants={cardVariants}
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="2px"
              bgGradient="linear(90deg, #8B5CF6, #EC4899, #3B82F6)"
            />

            <VStack p={6} align="stretch" spacing={4}>
              <HStack spacing={4}>
                <Box
                  w="40px"
                  h="40px"
                  bg="#8b5cf6"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FiTarget} color="white" size="20px" />
                </Box>
                <Heading size="md" color="white" fontWeight="700">
                  Selección de Caso
                </Heading>
              </HStack>

              <Box>
                <Text color="rgba(255, 255, 255, 0.8)" fontWeight="600" mb={3}>
                  Caso Forense:
                </Text>
                {loadingCases ? (
                  <HStack
                    p={4}
                    bg="rgba(255, 255, 255, 0.1)"
                    borderRadius="12px"
                    spacing={3}
                  >
                    <Spinner size="sm" color="#a855f7" />
                    <Text color="rgba(255, 255, 255, 0.7)">
                      Cargando casos disponibles...
                    </Text>
                  </HStack>
                ) : (
                  <Select
                    value={selectedCaseId}
                    onChange={(e) => setSelectedCaseId(e.target.value)}
                    bg="rgba(255, 255, 255, 0.1)"
                    color="white"
                    border="1px solid rgba(139, 92, 246, 0.5)"
                    borderRadius="12px"
                    h="60px"
                    fontSize="md"
                    fontWeight="500"
                    _hover={{ borderColor: "#a855f7" }}
                    _focus={{ borderColor: "#a855f7", boxShadow: "0 0 0 1px #a855f7" }}
                  >
                    <option value="" style={{ background: '#1a1a2e', color: 'white' }}>
                      -- Seleccione un caso para continuar --
                    </option>
                    {cases?.map((c) => (
                      <option key={c._id} value={c._id} style={{ background: '#1a1a2e', color: 'white' }}>
                        {c.title}
                      </option>
                    ))}
                  </Select>
                )}
              </Box>
            </VStack>
          </MotionBox>

          {/* Upload Area */}
          <MotionBox
            w="100%"
            bg="rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(139, 92, 246, 0.3)"
            borderRadius="16px"
            overflow="hidden"
            variants={cardVariants}
          >
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              border="3px dashed"
              borderColor={isDragOver ? '#a855f7' : 'rgba(139, 92, 246, 0.4)'}
              borderRadius="16px"
              m={6}
              p={20}
              textAlign="center"
              bg={isDragOver ? 'rgba(139, 92, 246, 0.1)' : 'transparent'}
              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              cursor="pointer"
              position="relative"
              _hover={{ borderColor: '#a855f7', bg: 'rgba(139, 92, 246, 0.05)' }}
            >
              <VStack spacing={8}>
                <MotionBox
                  w="120px"
                  h="120px"
                  bg="linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2))"
                  border="2px solid #a855f7"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="64px"
                  animate={isDragOver ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 0.5, repeat: isDragOver ? Infinity : 0 }}
                >
                  <Icon as={FiFile} color="#a855f7" />
                </MotionBox>

                <VStack spacing={4}>
                  <Heading
                    size="md"
                    color={isDragOver ? '#c084fc' : 'white'}
                    fontWeight="700"
                    transition="all 0.3s"
                  >
                    {isDragOver ? '¡Perfecto! Suelta aquí' : 'Zona de Análisis Forense PDF'}
                  </Heading>

                  <Text
                    color="rgba(255, 255, 255, 0.7)"
                    fontSize="lg"
                    maxW="md"
                    lineHeight="1.6"
                  >
                    Arrastra tu documento PDF aquí para iniciar el análisis
                    con inteligencia artificial avanzada
                  </Text>

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                    id="pdf-upload"
                    disabled={isLoading}
                  />

                  <MotionButton
                    as="label"
                    htmlFor="pdf-upload"
                    bg="#8b5cf6"
                    color="white"
                    size="lg"
                    borderRadius="8px"
                    cursor="pointer"
                    isDisabled={isLoading}
                    leftIcon={<Icon as={FiUpload} />}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    _hover={{ bg: '#7c3aed' }}
                  >
                    {isLoading ? 'Procesando...' : 'Seleccionar PDF'}
                  </MotionButton>

                  <HStack spacing={4} mt={4}>
                    <Badge colorScheme="purple" variant="subtle" p={2} borderRadius="8px">
                      PDF
                    </Badge>
                    <Badge colorScheme="blue" variant="subtle" p={2} borderRadius="8px">
                      Máx 50MB
                    </Badge>
                  </HStack>
                </VStack>
              </VStack>
            </Box>
          </MotionBox>

          {/* Progress Pipeline */}
          <AnimatePresence>
            {isLoading && (
              <MotionBox
                w="100%"
                bg="rgba(255, 255, 255, 0.05)"
                backdropFilter="blur(20px)"
                border="1px solid rgba(139, 92, 246, 0.3)"
                borderRadius="16px"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <VStack p={6} align="stretch" spacing={6}>
                  <HStack spacing={4}>
                    <Box
                      w="40px"
                      h="40px"
                      bg="#3b82f6"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiZap} color="white" size="20px" />
                    </Box>
                    <Heading size="md" color="white" fontWeight="700">
                      Pipeline de Análisis Forense PDF
                    </Heading>
                  </HStack>

                  <Progress
                    value={uploadProgress}
                    bg="rgba(255, 255, 255, 0.2)"
                    borderRadius="full"
                    h="12px"
                    sx={{
                      '& > div': {
                        bgGradient: 'linear(90deg, #8B5CF6, #EC4899, #3B82F6)',
                      }
                    }}
                  />

                  <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    {steps?.map((step, index) => (
                      <GridItem key={index}>
                        <VStack spacing={3}>
                          <MotionBox
                            w="60px"
                            h="60px"
                            bg={
                              step.status === 'complete'
                                ? 'linear-gradient(135deg, #10B981, #059669)'
                                : step.status === 'active'
                                  ? 'linear-gradient(135deg, #8B5CF6, #A855F7)'
                                  : 'rgba(255, 255, 255, 0.1)'
                            }
                            color="white"
                            border="2px solid"
                            borderColor={
                              step.status === 'complete'
                                ? '#10b981'
                                : step.status === 'active'
                                  ? '#a855f7'
                                  : 'rgba(255, 255, 255, 0.3)'
                            }
                            borderRadius="50%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="24px"
                            animate={
                              step.status === 'active'
                                ? { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }
                                : {}
                            }
                            transition={{ duration: 1.5, repeat: step.status === 'active' ? Infinity : 0 }}
                          >
                            {step.status === 'complete' ? (
                              <Icon as={FiCheck} />
                            ) : step.status === 'active' ? (
                              <Icon as={FiClock} />
                            ) : (
                              step.icon
                            )}
                          </MotionBox>
                          <Text
                            color={
                              step.status === 'complete'
                                ? '#6ee7b7'
                                : step.status === 'active'
                                  ? '#c084fc'
                                  : 'rgba(255, 255, 255, 0.6)'
                            }
                            fontWeight="600"
                            fontSize="sm"
                            textAlign="center"
                          >
                            {step.label}
                          </Text>
                        </VStack>
                      </GridItem>
                    ))}
                  </Grid>
                </VStack>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <MotionAlert
                status="error"
                bg="rgba(239, 68, 68, 0.1)"
                border="1px solid #ef4444"
                borderRadius="12px"
                backdropFilter="blur(10px)"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
              >
                <AlertIcon as={FiAlertTriangle} color="#fca5a5" />
                <Box>
                  <AlertTitle color="#fca5a5">Error en el Proceso</AlertTitle>
                  <AlertDescription color="#fecaca">{error}</AlertDescription>
                  <MotionButton
                    mt={4}
                    bg="#dc2626"
                    color="white"
                    size="sm"
                    leftIcon={<Icon as={FiRefreshCw} />}
                    onClick={resetStates}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Intentar de Nuevo
                  </MotionButton>
                </Box>
              </MotionAlert>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <MotionBox
                w="100%"
                bg="rgba(16, 185, 129, 0.1)"
                border="1px solid #10b981"
                borderRadius="12px"
                backdropFilter="blur(10px)"
                p={6}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
              >
                <VStack spacing={4} align="stretch">
                  <HStack spacing={3}>
                    <Icon as={FiCheck} color="#6ee7b7" fontSize="24px" />
                    <Box>
                      <Heading size="sm" color="#6ee7b7" mb={1}>
                        ¡Análisis Completado!
                      </Heading>
                      <Text color="#a7f3d0" fontSize="sm">
                        El documento PDF ha sido procesado y guardado exitosamente como evidencia forense.
                      </Text>
                    </Box>
                  </HStack>

                  {file && (
                    <Box bg="rgba(255, 255, 255, 0.05)" borderRadius="8px" p={4}>
                      <Heading size="xs" color="white" mb={2}>
                        📄 Documento Procesado:
                      </Heading>
                      <Text color="rgba(255, 255, 255, 0.8)" mb={1}>
                        {file.name}
                      </Text>
                      <Text color="rgba(255, 255, 255, 0.6)" fontSize="sm">
                        Tamaño: {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Text>
                    </Box>
                  )}

                  {aiLoading && (
                    <HStack color="#c084fc">
                      <Spinner size="sm" />
                      <Text>🔍 Analizando con IA...</Text>
                    </HStack>
                  )}

                  {aiAnalysis && (
                    <Box bg="rgba(255, 255, 255, 0.05)" borderRadius="8px" p={4}>
                      <Heading size="xs" color="white" mb={2}>
                        🤖 Resultado del Análisis IA:
                      </Heading>
                      <Text
                        color="rgba(255, 255, 255, 0.8)"
                        fontSize="sm"
                        whiteSpace="pre-line"
                      >
                        {aiAnalysis}
                      </Text>
                    </Box>
                  )}

                  <MotionButton
                    bg="#8b5cf6"
                    color="white"
                    size="sm"
                    alignSelf="flex-start"
                    onClick={resetStates}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Procesar Otro Documento
                  </MotionButton>
                </VStack>
              </MotionBox>
            )}
          </AnimatePresence>
        </MotionVStack>
      </Container>
    </Box>
  );
};

export default PdfEvidenceUploader;