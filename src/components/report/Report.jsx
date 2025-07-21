import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  IconButton,
  useToast,
  Divider,
  Heading,
  SimpleGrid
} from '@chakra-ui/react';
import { Search, Download, Plus, Eye, Clock, Info, Copy, Loader } from 'lucide-react';

// Hook para OpenRouter usando tu API key
function useOpenRouterChat() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const sendMessage = async (message) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://tusitio.com',
          'X-Title': 'Sistema Evidencias Criminales',
        },
        body: JSON.stringify({
          model: 'microsoft/mai-ds-r1:free',
          messages: [
            { 
              role: 'system', 
              content: 'Eres un experto forense y analista criminal. Genera reportes técnicos y profesionales basados en la evidencia proporcionada. Incluye análisis detallado, conclusiones y recomendaciones.' 
            },
            { role: 'user', content: message }
          ]
        }),
      });

      const data = await res.json();

      if (data?.choices?.length > 0) {
        setResponse(data.choices[0].message.content);
      } else {
        setError('No se recibió respuesta válida del modelo de IA.');
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el modelo de IA.');
    } finally {
      setLoading(false);
    }
  };

  const clearResponse = () => {
    setResponse(null);
    setError(null);
  };

  return { sendMessage, response, loading, error, clearResponse };
}

// Mock API functions
const getEvidence = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    data: [
      {
        id: 1,
        type: 'Evidencia Física',
        date: '2025-01-15',
        location: 'Calle 5ta #123, Zona 1',
        description: 'Arma blanca encontrada en la escena del crimen',
        status: 'Preservada',
        custody_chain: 'Oficial Pérez -> Lab Forense',
        observations: 'Huellas dactilares preservadas',
        hasReport: true
      },
      {
        id: 2,
        type: 'Evidencia Digital',
        date: '2025-01-16',
        location: 'Domicilio del sospechoso',
        description: 'Teléfono móvil con mensajes relevantes',
        status: 'En análisis',
        custody_chain: 'Detective López -> Unidad Digital',
        observations: 'Requiere análisis forense digital',
        hasReport: false
      },
      {
        id: 3,
        type: 'Testimonio',
        date: '2025-01-14',
        location: 'Estación de Policía',
        description: 'Declaración del testigo principal',
        status: 'Registrada',
        custody_chain: 'Fiscal García',
        observations: 'Testimonio coherente y detallado',
        hasReport: true
      }
    ],
    status: 200
  };
};

const getReport = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    data: [
      { 
        id: 1, 
        evidenceId: 1, 
        content: `REPORTE TÉCNICO FORENSE

Tipo de Evidencia: Arma blanca
Fecha de análisis: 15 de enero, 2025

DESCRIPCIÓN TÉCNICA:
Cuchillo de cocina de 20cm de longitud, hoja de acero inoxidable con mango de madera.

MÉTODOS DE ANÁLISIS:
- Análisis dactilar
- Pruebas de ADN
- Análisis de residuos

HALLAZGOS:
- Huellas dactilares identificables en el mango
- Restos de sangre tipo O+ en la hoja
- Fibras textiles adheridas

CONCLUSIONES:
La evidencia presenta características consistentes con uso en acto violento.

RECOMENDACIONES:
Mantener cadena de custodia para proceso judicial.`
      },
      { 
        id: 3, 
        evidenceId: 3, 
        content: `REPORTE DE TESTIMONIO

Testigo: [Nombre protegido]
Fecha de declaración: 14 de enero, 2025

DECLARACIÓN:
El testigo observó los eventos desde su ventana aproximadamente a las 22:30 hrs.

CREDIBILIDAD:
Alto nivel de consistencia en múltiples declaraciones.

RELEVANCIA PROCESAL:
Testimonio clave para establecer cronología de eventos.`
      }
    ],
    status: 200
  };
};

export default function CriminalEvidenceSystem() {
  const [evidences, setEvidences] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [loadingEvidences, setLoadingEvidences] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);
  const [newEvidenceData, setNewEvidenceData] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { sendMessage, response, loading: aiLoading, error: aiError, clearResponse } = useOpenRouterChat();

  useEffect(() => {
    loadEvidences();
    loadReports();
  }, []);

  const loadEvidences = async () => {
    setLoadingEvidences(true);
    try {
      const result = await getEvidence();
      if (result.data) {
        setEvidences(result.data);
      }
    } catch (error) {
      console.error('Error cargando evidencias:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las evidencias',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setLoadingEvidences(false);
  };

  const loadReports = async () => {
    setLoadingReports(true);
    try {
      const result = await getReport();
      if (result.data) {
        setReports(result.data);
      }
    } catch (error) {
      console.error('Error cargando reportes:', error);
    }
    setLoadingReports(false);
  };

  const generateAIReport = () => {
    if (!newEvidenceData.trim()) {
      toast({
        title: 'Advertencia',
        description: 'Por favor, ingresa la información de la evidencia',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const prompt = `Genera un reporte forense profesional y detallado para la siguiente evidencia criminal:

${newEvidenceData}

El reporte debe incluir:
1. Encabezado con tipo de evidencia y fecha
2. Descripción técnica detallada
3. Métodos de análisis utilizados
4. Hallazgos principales
5. Conclusiones
6. Recomendaciones para el proceso judicial
7. Cadena de custodia

Formato profesional y técnico apropiado para uso legal.`;

    sendMessage(prompt);
  };

  const downloadPDF = (evidence, report) => {
    const content = `
REPORTE DE EVIDENCIA CRIMINAL
================================

ID de Evidencia: ${evidence.id}
Tipo: ${evidence.type}
Fecha de Recolección: ${evidence.date}
Ubicación: ${evidence.location}

DESCRIPCIÓN:
${evidence.description}

ESTADO: ${evidence.status}
CADENA DE CUSTODIA: ${evidence.custody_chain}
OBSERVACIONES: ${evidence.observations}

REPORTE TÉCNICO:
${report ? report.content : 'Reporte no disponible'}

================================
Generado el: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reporte_Evidencia_${evidence.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'Descarga completada',
      description: `Reporte de evidencia #${evidence.id} descargado`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copiado',
        description: 'Reporte copiado al portapapeles',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'No se pudo copiar el reporte',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'preservada': return 'green';
      case 'en análisis': return 'yellow';
      case 'registrada': return 'blue';
      default: return 'gray';
    }
  };

  const filteredEvidences = evidences.filter(evidence => 
    evidence.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evidence.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evidence.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box minH="100vh" bg="gray.50">
      <Flex h="100vh">
        {/* Sidebar */}
        <Box w="400px" bg="white" borderRightWidth={1} borderColor="gray.200" overflowY="auto">
          <Box p={6} borderBottomWidth={1} borderColor="gray.200">
            <Heading size="lg" mb={4} color="gray.700">
              🔍 Evidencias Criminales
            </Heading>
            
            <Box position="relative">
              <Search 
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF',
                  width: '20px',
                  height: '20px'
                }}
              />
              <Input
                pl="40px"
                placeholder="Buscar evidencias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                focusBorderColor="blue.500"
              />
            </Box>
          </Box>

          <Box p={4}>
            <VStack spacing={4} align="stretch">
              {loadingEvidences ? (
                <Flex direction="column" align="center" justify="center" py={8}>
                  <Spinner size="xl" color="blue.500" mb={3} />
                  <Text color="gray.600">Cargando evidencias...</Text>
                </Flex>
              ) : (
                filteredEvidences.map((evidence) => {
                  const report = reports.find(r => r.evidenceId === evidence.id);
                  const isSelected = selectedEvidence?.id === evidence.id;
                  
                  return (
                    <Card
                      key={evidence.id}
                      cursor="pointer"
                      onClick={() => setSelectedEvidence(evidence)}
                      bg={isSelected ? 'blue.50' : 'white'}
                      borderColor={isSelected ? 'blue.500' : 'gray.200'}
                      borderWidth={isSelected ? 2 : 1}
                      _hover={{
                        shadow: 'md',
                        transform: 'translateY(-2px)',
                        borderColor: 'blue.300'
                      }}
                      transition="all 0.2s"
                    >
                      <CardBody p={4}>
                        <Flex justify="space-between" align="start" mb={3}>
                          <Box>
                            <Text fontWeight="semibold" color="gray.900" fontSize="sm">
                              #{evidence.id} - {evidence.type}
                            </Text>
                            <Badge colorScheme={getStatusColor(evidence.status)} size="sm" mt={1}>
                              {evidence.status}
                            </Badge>
                          </Box>
                          
                          {report && (
                            <IconButton
                              size="sm"
                              icon={<Download size={16} />}
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadPDF(evidence, report);
                              }}
                              colorScheme="green"
                              variant="ghost"
                            />
                          )}
                        </Flex>
                        
                        <VStack spacing={2} align="start">
                          <HStack fontSize="xs" color="gray.600">
                            <Clock size={12} />
                            <Text>{evidence.date}</Text>
                          </HStack>
                          <HStack fontSize="xs" color="gray.600" align="start">
                            <Info size={12} style={{ marginTop: '2px' }} />
                            <Text noOfLines={2}>{evidence.location}</Text>
                          </HStack>
                        </VStack>
                        
                        <Text fontSize="xs" color="gray.700" mt={3} noOfLines={3}>
                          {evidence.description}
                        </Text>
                        
                        <Flex justify="space-between" align="center" mt={3}>
                          <Text fontSize="xs" color="gray.500">
                            {report ? '✅ Con reporte' : '❌ Sin reporte'}
                          </Text>
                          <HStack fontSize="xs" color="blue.600">
                            <Eye size={12} />
                            <Text>Ver detalles</Text>
                          </HStack>
                        </Flex>
                      </CardBody>
                    </Card>
                  );
                })
              )}
            </VStack>
          </Box>
        </Box>

        {/* Main Content */}
        <Box flex={1} overflowY="auto">
          {/* Header */}
          <Box bg="white" borderBottomWidth={1} borderColor="gray.200" p={6}>
            <Heading size="xl" color="gray.800" mb={2}>
              🚔 Sistema de Evidencias Criminales con IA
            </Heading>
            <Text color="gray.600">
              Generación inteligente de reportes forenses
            </Text>
          </Box>

          <Container maxW="container.xl" p={6}>
            {/* Stats Cards */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
              <Card>
                <CardBody p={6}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.500">Total Evidencias</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="gray.900">{evidences.length}</Text>
                  <Text fontSize="sm" color="gray.600">En el sistema</Text>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody p={6}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.500">Con Reportes</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="gray.900">{reports.length}</Text>
                  <Text fontSize="sm" color="gray.600">Reportes generados</Text>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody p={6}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.500">En Análisis</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="gray.900">
                    {evidences.filter(e => e.status === 'En análisis').length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">Pendientes</Text>
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* Generator Section */}
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8} mb={8}>
              {/* Input Panel */}
              <Card>
                <CardHeader>
                  <Heading size="md" color="gray.700">
                    📝 Generar Nuevo Reporte con IA
                  </Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4}>
                    <Box w="full">
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                        Información de la Evidencia
                      </Text>
                      <Textarea
                        value={newEvidenceData}
                        onChange={(e) => setNewEvidenceData(e.target.value)}
                        placeholder={`Ingresa aquí toda la información relevante de la evidencia:

• Tipo de evidencia (física, digital, testimonio)
• Fecha y hora de recolección
• Ubicación exacta donde se encontró
• Descripción detallada del hallazgo
• Estado de conservación
• Personal responsable
• Cadena de custodia
• Observaciones técnicas
• Condiciones ambientales
• Método de preservación utilizado`}
                        rows={12}
                        focusBorderColor="blue.500"
                        resize="vertical"
                      />
                    </Box>
                    
                    <HStack spacing={3} w="full">
                      <Button
                        flex={1}
                        colorScheme="blue"
                        leftIcon={aiLoading ? <Spinner size="sm" /> : <Plus size={16} />}
                        onClick={generateAIReport}
                        isDisabled={aiLoading || !newEvidenceData.trim()}
                        isLoading={aiLoading}
                        loadingText="Generando..."
                      >
                        Generar Reporte con IA
                      </Button>
                      
                      <Button
                        colorScheme="gray"
                        onClick={() => {
                          setNewEvidenceData('');
                          clearResponse();
                        }}
                      >
                        Limpiar
                      </Button>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>

              {/* Output Panel */}
              <Card>
                <CardHeader>
                  <Heading size="md" color="gray.700">
                    📄 Reporte Generado
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Box 
                    border="1px solid" 
                    borderColor="gray.300" 
                    borderRadius="lg" 
                    p={4} 
                    bg="gray.50" 
                    h="400px" 
                    overflowY="auto" 
                    mb={4}
                  >
                    {aiLoading && (
                      <Flex direction="column" align="center" justify="center" h="full">
                        <Spinner size="xl" color="blue.500" mb={3} />
                        <Text color="blue.600" fontWeight="medium">Generando reporte con IA...</Text>
                        <Text color="gray.500" fontSize="sm">Esto puede tomar unos segundos</Text>
                      </Flex>
                    )}
                    
                    {aiError && (
                      <Alert status="error" borderRadius="lg">
                        <AlertIcon />
                        <Text>{aiError}</Text>
                      </Alert>
                    )}
                    
                    {response && !aiLoading && (
                      <Text as="pre" whiteSpace="pre-wrap" fontSize="sm" color="gray.800" lineHeight="relaxed">
                        {response}
                      </Text>
                    )}
                    
                    {!response && !aiLoading && !aiError && (
                      <Flex direction="column" align="center" justify="center" h="full">
                        <Text fontSize="4xl" mb={2}>📄</Text>
                        <Text color="gray.500" fontStyle="italic">
                          El reporte aparecerá aquí una vez generado
                        </Text>
                      </Flex>
                    )}
                  </Box>

                  {response && (
                    <Button
                      w="full"
                      colorScheme="green"
                      leftIcon={<Copy size={16} />}
                      onClick={() => copyToClipboard(response)}
                    >
                      Copiar Reporte
                    </Button>
                  )}
                </CardBody>
              </Card>
            </Grid>

            {/* Selected Evidence Details */}
            {selectedEvidence && (
              <Card mb={8}>
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <Heading size="lg" color="gray.800">
                      📋 Evidencia #{selectedEvidence.id} - {selectedEvidence.type}
                    </Heading>
                    <Badge colorScheme={getStatusColor(selectedEvidence.status)} fontSize="sm" p={2}>
                      {selectedEvidence.status}
                    </Badge>
                  </Flex>
                </CardHeader>
                
                <CardBody>
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
                    <VStack spacing={6} align="start">
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>
                          📅 Fecha de Recolección
                        </Text>
                        <Text fontSize="lg" color="gray.900">
                          {selectedEvidence.date}
                        </Text>
                      </Box>
                      
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>
                          📍 Ubicación
                        </Text>
                        <Text fontSize="lg" color="gray.900">
                          {selectedEvidence.location}
                        </Text>
                      </Box>
                      
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>
                          👮‍♂️ Cadena de Custodia
                        </Text>
                        <Text fontSize="lg" color="gray.900">
                          {selectedEvidence.custody_chain}
                        </Text>
                      </Box>
                    </VStack>
                    
                    <VStack spacing={6} align="start">
                      <Box w="full">
                        <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>
                          📝 Descripción
                        </Text>
                        <Box bg="gray.50" p={4} borderRadius="lg" borderWidth={1} borderColor="gray.200">
                          <Text color="gray.900">
                            {selectedEvidence.description}
                          </Text>
                        </Box>
                      </Box>
                      
                      <Box w="full">
                        <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>
                          🔍 Observaciones
                        </Text>
                        <Box bg="gray.50" p={4} borderRadius="lg" borderWidth={1} borderColor="gray.200">
                          <Text color="gray.900">
                            {selectedEvidence.observations}
                          </Text>
                        </Box>
                      </Box>
                    </VStack>
                  </Grid>

                  {(() => {
                    const report = reports.find(r => r.evidenceId === selectedEvidence.id);
                    return report && (
                      <>
                        <Divider my={6} />
                        <Box>
                          <Flex justify="space-between" align="center" mb={4}>
                            <Heading size="md" color="gray.700">
                              📊 Reporte Asociado
                            </Heading>
                            <Button
                              colorScheme="green"
                              leftIcon={<Download size={16} />}
                              onClick={() => downloadPDF(selectedEvidence, report)}
                            >
                              Descargar PDF
                            </Button>
                          </Flex>
                          <Box 
                            bg="gray.50" 
                            p={6} 
                            borderRadius="lg" 
                            borderWidth={1} 
                            borderColor="gray.200" 
                            maxH="240px" 
                            overflowY="auto"
                          >
                            <Text as="pre" whiteSpace="pre-wrap" fontSize="sm" color="gray.800" lineHeight="relaxed">
                              {report.content}
                            </Text>
                          </Box>
                        </Box>
                      </>
                    );
                  })()}
                </CardBody>
              </Card>
            )}

            {/* Warning Alert */}
            <Alert status="warning" borderRadius="lg">
              <AlertIcon />
              <Box>
                <AlertTitle>⚠️ Importante:</AlertTitle>
                <AlertDescription>
                  Este sistema utiliza inteligencia artificial para generar reportes. Siempre verifica y valida 
                  la información generada antes de usar en contextos legales reales. La precisión del reporte 
                  depende de la calidad de los datos proporcionados.
                </AlertDescription>
              </Box>
            </Alert>
          </Container>
        </Box>
      </Flex>
    </Box>
  );
}