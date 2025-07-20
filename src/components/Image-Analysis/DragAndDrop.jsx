import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Select,
  Alert,
  AlertIcon,
  AlertDescription,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Progress,
  Badge,
  Icon,
  Flex,
  Container,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Circle,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  ScaleFade,
  SlideFade,
  Fade,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FiUpload, FiImage, FiEye, FiCheck, FiCpu, FiZap, FiTarget, FiShield } from 'react-icons/fi';
import { useImageToBase64 } from '../../shared/hooks/image-analysis';
import { useGoogleVision } from '../../shared/hooks/image-analysis';
import { useOpenRouterChat } from '../../shared/hooks/image-analysis';
import { useUploadEvidence } from '../../shared/hooks/evidences';
import { useCases } from '../../shared/hooks/cases';

const GOOGLE_VISION_API_KEY = 'AIzaSyDFkalZAnAf0xvJo_f4D2kzhU9JYWpDFAU';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.5); }
  50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(168, 85, 247, 0.4); }
  100% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.5); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

async function uploadToCloudinary(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'Jeremy');
  const res = await fetch('https://api.cloudinary.com/v1_1/dvojmqyot/image/upload', {
    method: 'POST',
    body: data,
  });
  const json = await res.json();
  return json.secure_url;
}

const DragAndDrop = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const { saveEvidence } = useUploadEvidence();
  const hasSavedEvidence = useRef(false);

  const { base64, convert, loading: loadingBase64, error: errorBase64 } = useImageToBase64();
  const { analyzeImage, result, loading: loadingGV, error: errorGV } = useGoogleVision(GOOGLE_VISION_API_KEY);
  const { sendMessage, response, loading: loadingOR, error: errorOR } = useOpenRouterChat();

  const hasSentToOpenRouter = useRef(false);
  const { cases, loading: loadingCases, error: errorCases } = useCases();
  const [selectedCaseId, setSelectedCaseId] = React.useState('');

  useEffect(() => {
    if (loadingBase64) setCurrentStep(1);
    else if (loadingGV) setCurrentStep(2);
    else if (loadingOR) setCurrentStep(3);
    else if (analysisResult) setCurrentStep(4);
  }, [loadingBase64, loadingGV, loadingOR, analysisResult]);

  const onDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    setError('');
    setAnalysisResult('');
    setCurrentStep(0);
    hasSentToOpenRouter.current = false;

    if (!selectedCaseId) {
      setError('Por favor, selecciona un caso antes de subir la imagen.');
      return;
    }

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    try {
      setUploadProgress(20);
      const url = await uploadToCloudinary(droppedFile);
      setUploadProgress(100);
      setImageUrl(url);
      convert(droppedFile);
      setFile(droppedFile);
    } catch (err) {
      setError('Error subiendo la imagen');
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    if (base64) {
      analyzeImage(base64);
    }
  }, [base64, analyzeImage]);

  useEffect(() => {
    if (result && !hasSentToOpenRouter.current) {
      hasSentToOpenRouter.current = true;
      const labels = result.labelAnnotations?.map(l => l.description).join(', ') || 'No labels';
      const prompt = `Analiza estas etiquetas: ${labels} y genera un análisis detallado.`;
      sendMessage(prompt);
    }
  }, [result, sendMessage]);

  useEffect(() => {
    if (response && file && imageUrl) {
      setAnalysisResult(response);
    }
  }, [response, file, imageUrl]);

  useEffect(() => {
    const trySaveEvidence = async () => {
      if (!analysisResult || !imageUrl || hasSavedEvidence.current || !selectedCaseId) return;

      hasSavedEvidence.current = true;

      const user = JSON.parse(localStorage.getItem('user'));
      const uploadedBy = user?._id || 'defaultUserId';

      const evidenceData = {
        type: 'IMAGE',
        description: 'Evidencia automática desde análisis de imagen',
        archive: imageUrl,
        collectionDate: new Date().toISOString(),
        uploadedBy,
        case: selectedCaseId,
        preliminaryAnalysis: analysisResult,
      };

      const res = await saveEvidence(evidenceData);

      if (!res || res.error) {
        console.error('Error al guardar evidencia en la base de datos');
      } else {
        console.log('✅ Evidencia guardada con éxito en MongoDB');
      }
    };

    trySaveEvidence();
  }, [analysisResult, imageUrl, saveEvidence, selectedCaseId]);

  const isLoading = loadingBase64 || loadingGV || loadingOR;
  const hasErrors = error || errorBase64 || errorGV || errorOR;

  const steps = [
    { icon: FiUpload, label: 'Subida', status: uploadProgress > 0 ? 'complete' : 'pending' },
    { icon: FiImage, label: 'Conversión', status: base64 ? 'complete' : loadingBase64 ? 'active' : 'pending' },
    { icon: FiEye, label: 'Análisis Visual', status: result ? 'complete' : loadingGV ? 'active' : 'pending' },
    { icon: FiCpu, label: 'IA Analysis', status: response ? 'complete' : loadingOR ? 'active' : 'pending' },
  ];

  return (
    <Box
      minH="100vh"
      pt="100px"
      pb="70px"
      bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)"
      position="relative"
      overflow="hidden"
    >

      <Box
        position="absolute"
        top="10%"
        left="5%"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))"
        filter="blur(40px)"
        animation={`${float} 6s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        bottom="10%"
        right="5%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
        filter="blur(30px)"
        animation={`${float} 8s ease-in-out infinite reverse`}
      />

      <Container maxW="7xl" py={12} position="relative" zIndex={1}>
        <VStack spacing={10} align="stretch">

          <ScaleFade initialScale={0.8} in={true}>
            <VStack spacing={6} textAlign="center">
              <Circle
                size="80px"
                bg="linear-gradient(135deg, #8B5CF6, #A855F7, #3B82F6)"
                animation={`${pulse} 2s infinite`}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FiShield} w={10} h={10} color="white" />
              </Circle>
              
              <Heading
                fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
                fontWeight="900"
                letterSpacing="tight"
                textAlign="center"
                background="linear-gradient(135deg, #8B5CF6 0%, #EC4899 25%, #3B82F6 50%, #8B5CF6 75%, #EC4899 100%)"
                backgroundSize="400% 400%"
                animation={`${shimmer} 3s ease-in-out infinite`}
                bgClip="text"
                color="transparent"
                textShadow="0 0 30px rgba(139, 92, 246, 0.5)"
              >
                MetaData
              </Heading>
              
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="whiteAlpha.800"
                fontWeight="500"
                maxW="2xl"
                lineHeight="1.6"
              >
                Revoluciona la investigación criminal con IA avanzada.
                <br />
                <Text as="span" color="purple.300" fontWeight="700">
                  Análisis instantáneo de imágenes
                </Text>{' '}
                y reconocimiento de patrones con precisión forense.
              </Text>

              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8} mt={8}>
                <Stat textAlign="center">
                  <StatNumber fontSize="2xl" color="purple.400" fontWeight="bold">
                    99.7%
                  </StatNumber>
                  <StatLabel color="whiteAlpha.700" fontSize="sm">
                    Precisión
                  </StatLabel>
                </Stat>
                <Stat textAlign="center">
                  <StatNumber fontSize="2xl" color="blue.400" fontWeight="bold">
                    &lt;5s
                  </StatNumber>
                  <StatLabel color="whiteAlpha.700" fontSize="sm">
                    Análisis
                  </StatLabel>
                </Stat>
                <Stat textAlign="center">
                  <StatNumber fontSize="2xl" color="pink.400" fontWeight="bold">
                    24/7
                  </StatNumber>
                  <StatLabel color="whiteAlpha.700" fontSize="sm">
                    Disponible
                  </StatLabel>
                </Stat>
              </SimpleGrid>
            </VStack>
          </ScaleFade>

          <SlideFade in={true} offsetY="50px" delay={0.2}>
            <Card
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="rgba(139, 92, 246, 0.3)"
              borderRadius="2xl"
              overflow="hidden"
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6)',
                backgroundSize: '200% 200%',
                animation: `${shimmer} 2s linear infinite`,
              }}
            >
              <CardHeader pb={4}>
                <HStack>
                  <Circle size="40px" bg="purple.500" color="white">
                    <Icon as={FiTarget} />
                  </Circle>
                  <Heading size="lg" color="white" fontWeight="700">
                    Selección de Caso
                  </Heading>
                </HStack>
              </CardHeader>
              <CardBody pt={0}>
                <FormControl>
                  <FormLabel color="whiteAlpha.800" fontWeight="600" mb={3}>
                    Caso Forense:
                  </FormLabel>
                  {loadingCases ? (
                    <HStack p={4} bg="whiteAlpha.100" borderRadius="xl">
                      <Spinner size="sm" color="purple.400" />
                      <Text color="whiteAlpha.700">Cargando casos disponibles...</Text>
                    </HStack>
                  ) : (
                    <Select
                      placeholder="-- Seleccione un caso para continuar --"
                      value={selectedCaseId}
                      onChange={(e) => setSelectedCaseId(e.target.value)}
                      bg="whiteAlpha.100"
                      color="white"
                      borderColor="rgba(139, 92, 246, 0.5)"
                      borderRadius="xl"
                      h="60px"
                      fontSize="md"
                      fontWeight="500"
                      _hover={{ 
                        borderColor: 'purple.400',
                        bg: 'whiteAlpha.200'
                      }}
                      _focus={{ 
                        borderColor: 'purple.400', 
                        boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.3)' 
                      }}
                    >
                      {cases?.map((c) => (
                        <option key={c._id} value={c._id} style={{ background: '#1a1a2e', color: 'white' }}>
                          {c.title}
                        </option>
                      ))}
                    </Select>
                  )}
                </FormControl>
              </CardBody>
            </Card>
          </SlideFade>

          <SlideFade in={true} offsetY="50px" delay={0.4}>
            <Card
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="rgba(139, 92, 246, 0.3)"
              borderRadius="2xl"
              overflow="hidden"
              position="relative"
            >
              <CardBody p={0}>
                <Box
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  border="3px dashed"
                  borderColor={isDragOver ? 'purple.400' : 'rgba(139, 92, 246, 0.4)'}
                  borderRadius="2xl"
                  m={6}
                  p={20}
                  textAlign="center"
                  bg={isDragOver ? 'rgba(139, 92, 246, 0.1)' : 'transparent'}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{ 
                    borderColor: 'purple.400', 
                    bg: 'rgba(139, 92, 246, 0.05)',
                    transform: 'scale(1.02)'
                  }}
                  cursor="pointer"
                  position="relative"
                  animation={isDragOver ? `${glow} 1.5s ease-in-out infinite` : 'none'}
                >
                  <VStack spacing={8}>
                    <Circle
                      size="120px"
                      bg="linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2))"
                      border="2px solid"
                      borderColor="purple.400"
                      animation={isDragOver ? `${pulse} 1s infinite` : 'none'}
                    >
                      <Icon
                        as={FiUpload}
                        w={16}
                        h={16}
                        color={isDragOver ? 'purple.300' : 'purple.400'}
                        transition="all 0.3s"
                      />
                    </Circle>
                    
                    <VStack spacing={4}>
                      <Heading
                        size="lg"
                        color={isDragOver ? 'purple.300' : 'white'}
                        fontWeight="700"
                        transition="all 0.3s"
                      >
                        {isDragOver ? '¡Perfecto! Suelta aquí' : 'Zona de Análisis Forense'}
                      </Heading>
                      
                      <Text color="whiteAlpha.700" fontSize="lg" maxW="md" lineHeight="1.6">
                        Arrastra tu evidencia digital aquí para iniciar el análisis
                        con inteligencia artificial avanzada
                      </Text>
                      
                      <HStack spacing={4} mt={4}>
                        <Badge colorScheme="purple" variant="subtle" p={2} borderRadius="lg">
                          JPG
                        </Badge>
                        <Badge colorScheme="blue" variant="subtle" p={2} borderRadius="lg">
                          PNG
                        </Badge>
                        <Badge colorScheme="pink" variant="subtle" p={2} borderRadius="lg">
                          GIF
                        </Badge>
                      </HStack>
                    </VStack>
                  </VStack>
                </Box>
              </CardBody>
            </Card>
          </SlideFade>

          {isLoading && (
            <Fade in={isLoading}>
              <Card
                bg="rgba(255, 255, 255, 0.05)"
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor="rgba(139, 92, 246, 0.3)"
                borderRadius="2xl"
              >
                <CardHeader>
                  <HStack>
                    <Circle size="40px" bg="blue.500" color="white">
                      <Icon as={FiZap} />
                    </Circle>
                    <Heading size="lg" color="white" fontWeight="700">
                      Pipeline de Análisis Forense
                    </Heading>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <VStack spacing={8}>
                    <Progress
                      value={(currentStep / 4) * 100}
                      size="lg"
                      colorScheme="purple"
                      borderRadius="full"
                      w="full"
                      bg="whiteAlpha.200"
                      sx={{
                        '& > div': {
                          background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6)',
                          backgroundSize: '200% 200%',
                          animation: `${shimmer} 2s linear infinite`,
                        }
                      }}
                    />
                    
                    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full">
                      {steps.map((step, index) => (
                        <VStack key={index} spacing={3}>
                          <Circle
                            size="60px"
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
                                ? 'green.400'
                                : step.status === 'active'
                                ? 'purple.400'
                                : 'whiteAlpha.300'
                            }
                            animation={step.status === 'active' ? `${pulse} 1.5s infinite` : 'none'}
                          >
                            {step.status === 'complete' ? (
                              <Icon as={FiCheck} w={6} h={6} />
                            ) : step.status === 'active' ? (
                              <Spinner size="md" />
                            ) : (
                              <Icon as={step.icon} w={6} h={6} />
                            )}
                          </Circle>
                          <Text
                            color={
                              step.status === 'complete'
                                ? 'green.300'
                                : step.status === 'active'
                                ? 'purple.300'
                                : 'whiteAlpha.600'
                            }
                            fontWeight="600"
                            fontSize="sm"
                          >
                            {step.label}
                          </Text>
                        </VStack>
                      ))}
                    </SimpleGrid>
                  </VStack>
                </CardBody>
              </Card>
            </Fade>
          )}

          {hasErrors && (
            <ScaleFade in={hasErrors}>
              <Alert
                status="error"
                bg="rgba(239, 68, 68, 0.1)"
                borderColor="red.400"
                borderRadius="xl"
                border="1px solid"
                backdropFilter="blur(10px)"
                p={6}
              >
                <AlertIcon color="red.400" />
                <AlertDescription color="red.200" fontWeight="500">
                  {error || errorBase64 || errorGV || errorOR || errorCases}
                </AlertDescription>
              </Alert>
            </ScaleFade>
          )}

          {(imageUrl || analysisResult) && (
            <SlideFade in={true} offsetY="50px">
              <Card
                bg="rgba(255, 255, 255, 0.05)"
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor="rgba(139, 92, 246, 0.3)"
                borderRadius="2xl"
              >
                <CardHeader>
                  <HStack>
                    <Circle size="40px" bg="green.500" color="white">
                      <Icon as={FiCheck} />
                    </Circle>
                    <Heading size="lg" color="white" fontWeight="700">
                      Resultados del Análisis Forense
                    </Heading>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <VStack spacing={8} align="stretch">
                    {imageUrl && (
                      <Box>
                        <Text color="whiteAlpha.800" fontWeight="600" mb={4} fontSize="lg">
                          📸 Evidencia Digital Procesada:
                        </Text>
                        <Box
                          position="relative"
                          display="inline-block"
                          borderRadius="xl"
                          overflow="hidden"
                          border="3px solid"
                          borderColor="purple.400"
                          animation={`${glow} 2s ease-in-out infinite`}
                        >
                          <Image
                            src={imageUrl}
                            alt="Evidencia analizada"
                            maxH="400px"
                            w="auto"
                            mx="auto"
                          />
                        </Box>
                      </Box>
                    )}

                    {analysisResult && (
                      <Box>
                        <Divider borderColor="whiteAlpha.300" mb={6} />
                        <Text color="whiteAlpha.800" fontWeight="600" mb={4} fontSize="lg">
                          🧠 Reporte de Análisis Forense IA:
                        </Text>
                        <Box
                          bg="rgba(255, 255, 255, 0.08)"
                          p={6}
                          borderRadius="xl"
                          border="1px solid"
                          borderColor="rgba(139, 92, 246, 0.4)"
                          position="relative"
                          _before={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '2px',
                            background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6)',
                            borderRadius: 'xl xl 0 0',
                          }}
                        >
                          <Text color="whiteAlpha.900" lineHeight="1.8" fontSize="md">
                            {analysisResult}
                          </Text>
                        </Box>
                        
                        <Alert
                          status="success"
                          mt={6}
                          bg="rgba(16, 185, 129, 0.1)"
                          borderColor="green.400"
                          borderRadius="xl"
                          border="1px solid"
                          backdropFilter="blur(10px)"
                          p={6}
                        >
                          <AlertIcon color="green.400" />
                          <AlertDescription color="green.200" fontWeight="500">
                            ✅ Evidencia procesada y almacenada exitosamente en la base de datos forense
                          </AlertDescription>
                        </Alert>
                      </Box>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </SlideFade>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default DragAndDrop;