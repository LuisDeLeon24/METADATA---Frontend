import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Textarea,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
  Container,
  Flex,
  IconButton
} from '@chakra-ui/react';
import { ArrowBackIcon, DownloadIcon, EditIcon } from '@chakra-ui/icons';
import { useOpenRouterChat } from '../../shared/hooks/useOpenRouterChat';
import { useCases } from '../../shared/hooks/useCases'; // Importar el hook
import { 
  getCaseById,
  createReport, 
  getReportByCase,
} from '../../services/api';

const Report = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  // Hook personalizado para casos
  const { 
    analyses, 
    evidences, 
    isLoading: casesLoading, 
    fetchAnalysesByCaseId, 
    fetchEvidencesByCase 
  } = useCases();
  
  const caseId = searchParams.get('caseId');
  
  // Estados para los datos
  const [caseData, setCaseData] = useState(null);
  const [existingReport, setExistingReport] = useState(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Estados de carga
  const [loadingData, setLoadingData] = useState(true);
  const [savingReport, setSavingReport] = useState(false);
  
  // Hook de IA
  const { sendMessage, response, loading: aiLoading, error: aiError } = useOpenRouterChat();
  
  // Colores del tema
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mapeo de tipos para mostrar en español
  const typeLabels = {
    HOMICIDE: "Homicidio",
    ASSAULT: "Asalto", 
    TERRORISM: "Terrorismo",
    SCAM: "Estafa",
    VANDALISM: "Vandalismo",
    CYBERBULLYING: "Ciberacoso"
  };

  const stateLabels = {
    RECEIVED: "Recibido",
    IN_PROGRESS: "En Progreso",
    FINISHED: "Terminado"
  };

  const priorityLabels = {
    HIGH: "Alta",
    MEDIUM: "Media",
    LOW: "Baja"
  };

  // Cargar datos iniciales
  useEffect(() => {
    if (!caseId) {
      toast({
        title: 'Error',
        description: 'No se proporcionó un ID de caso válido',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/cases');
      return;
    }
    
    loadCaseData();
  }, [caseId]);

  // Manejar respuesta de IA
  useEffect(() => {
    if (response) {
      setGeneratedContent(response);
    }
  }, [response]);

  const loadCaseData = async () => {
    try {
      setLoadingData(true);
      
      // Cargar información básica del caso
      const caseResult = await getCaseById(caseId);
      if (caseResult.error) {
        throw new Error(caseResult.msg);
      }
      setCaseData(caseResult.case);

      // Cargar análisis del caso usando el hook
      await fetchAnalysesByCaseId(caseId);
      
      // Cargar evidencias del caso usando el hook
      await fetchEvidencesByCase(caseId);

      // Verificar si ya existe un reporte
      const reportResult = await getReportByCase(caseId);
      if (!reportResult.error && reportResult.data) {
        setExistingReport(reportResult.data);
        setGeneratedContent(reportResult.data.content || '');
      }
      
    } catch (error) {
      console.error('Error cargando datos:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error cargando los datos del caso',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoadingData(false);
    }
  };

  // Función mejorada para crear el prompt
  const createPromptForReport = () => {
    if (!caseData) return '';

    // Si tenemos análisis, priorizarlos sobre evidencias sin analizar
    const analysisDescriptions = analyses.length > 0
      ? analyses.map((analysis, index) => {
          // Manejo más seguro de la evidencia relacionada
          const evidence = analysis.evidenciaID || analysis.evidence || {};
          return `**ANÁLISIS ${index + 1}:**
          - Evidencia analizada: ${evidence.type || 'No especificado'} (${evidence.description || 'Sin descripción'})
          - Tipo de análisis: ${analysis.analysisType || 'No especificado'}
          - Resultados técnicos: ${analysis.results || 'Sin resultados específicos'}
          - Conclusiones del análisis: ${analysis.conclusions || 'Sin conclusiones'}
          - Nivel de confianza: ${analysis.confidence || 'No especificado'}
          - Fecha del análisis: ${analysis.analysisDate ? new Date(analysis.analysisDate).toLocaleDateString('es-ES') : 'No especificada'}
          - Especialista: ${analysis.generatedBy?.name || 'No especificado'}
          - Metadata técnica: ${analysis.metadata ? JSON.stringify(analysis.metadata) : 'No disponible'}
          - Archivo original: ${evidence.archive || 'No especificado'}
          - Fecha de recolección: ${evidence.collectionDate ? new Date(evidence.collectionDate).toLocaleDateString('es-ES') : 'No especificada'}`;
        }).join('\n\n')
      : 'No se han completado análisis forenses específicos para este caso.';

    // Evidencias adicionales sin análisis (si las hay)
    const evidencesWithoutAnalysis = evidences.filter(evidence => {
      return !analyses.some(analysis => {
        const analysisEvidenceId = analysis.evidenciaID?._id || analysis.evidenciaID || analysis.evidence?._id;
        return analysisEvidenceId === evidence._id;
      });
    });
    
    const additionalEvidenceDescriptions = evidencesWithoutAnalysis.length > 0
      ? evidencesWithoutAnalysis.map((evidence, index) =>
          `**EVIDENCIA PENDIENTE ${index + 1}:**
          - Tipo: ${evidence.type || 'No especificado'}
          - Descripción: ${evidence.description || 'Sin descripción'}
          - Archivo: ${evidence.archive || 'No especificado'}
          - Fecha de recolección: ${evidence.collectionDate ? new Date(evidence.collectionDate).toLocaleDateString('es-ES') : 'No especificada'}
          - Análisis preliminar: ${evidence.preliminaryAnalysis || 'Pendiente de análisis forense completo'}`
        ).join('\n\n')
      : '';

    return `
Eres un investigador forense senior especializado en análisis criminal y elaboración de reportes técnicos. Genera un reporte profesional basado en los análisis forenses completados:

**INFORMACIÓN DEL CASO:**
- Título: ${caseData.title}
- Tipo de Caso: ${typeLabels[caseData.type] || caseData.type}
- Descripción inicial: ${caseData.description || 'Sin descripción adicional'}
- Fecha de apertura: ${caseData.initDate ? new Date(caseData.initDate).toLocaleDateString('es-ES') : 'No especificada'}
- Ubicación del incidente: ${caseData.ubication || 'No especificada'}
- Estado actual: ${stateLabels[caseData.state] || caseData.state}
- Prioridad: ${priorityLabels[caseData.priority] || caseData.priority}
- Investigador principal: ${caseData.researcher?.name ? `${caseData.researcher.name} ${caseData.researcher.surname || ''}` : 'Sin asignar'}

**ANÁLISIS FORENSES COMPLETADOS:**
${analysisDescriptions}

${additionalEvidenceDescriptions ? `**EVIDENCIAS PENDIENTES DE ANÁLISIS:**\n${additionalEvidenceDescriptions}` : ''}

**INSTRUCCIONES ESPECÍFICAS:**
Genera ÚNICAMENTE el contenido del reporte profesional con estas secciones obligatorias:

1. **RESUMEN EJECUTIVO**
2. **METODOLOGÍA DE ANÁLISIS**
3. **RESULTADOS DE ANÁLISIS FORENSES**
4. **CORRELACIONES Y PATRONES IDENTIFICADOS**
5. **LÍNEA TEMPORAL RECONSTRUIDA**
6. **EVALUACIÓN DE CONFIABILIDAD**
7. **CONCLUSIONES TÉCNICAS**
8. **RECOMENDACIONES INVESTIGATIVAS**

**CRITERIOS TÉCNICOS:**
- PRIORIZA los resultados de análisis forenses por encima de observaciones preliminares
- Incluye niveles de confianza específicos cuando estén disponibles
- Correlaciona hallazgos entre diferentes análisis
- Mantén objetividad científica y evita especulaciones no fundamentadas
- Usa terminología técnica forense apropiada
- Estructura cronológicamente cuando sea posible
- Identifica gaps o análisis pendientes
- Proporciona recomendaciones específicas y accionables

**FORMATO:**
- Escribe en español profesional
- Usa formato claro con subtítulos
- NO incluyas títulos generales como "Reporte de Caso"
- Comienza directamente con "**RESUMEN EJECUTIVO**"
- Longitud aproximada: 800-1200 palabras

Genera el reporte basándote primordialmente en los análisis forenses completados.
    `.trim();
  };

  const handleGenerateReport = async () => {
    if (!caseData) return;
    
    try {
      const prompt = createPromptForReport();
      await sendMessage(prompt);
      
      toast({
        title: 'Generando Reporte',
        description: 'La IA está procesando los análisis forenses del caso...',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      
    } catch (error) {
      console.error('Error generando reporte:', error);
      toast({
        title: 'Error',
        description: 'Error generando el reporte con IA',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSaveReport = async () => {
    if (!generatedContent.trim()) {
      toast({
        title: 'Error',
        description: 'No hay contenido para guardar',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setSavingReport(true);
      
      const reportData = {
        content: generatedContent,
        caseID: caseId,
        evidence: evidences.map(e => e._id),
        confidential: true
      };

      const result = await createReport(reportData);
      
      if (result.error) {
        throw new Error(result.msg);
      }

      setExistingReport(result.report);
      setIsEditMode(false);
      
      toast({
        title: 'Éxito',
        description: existingReport ? 'Reporte actualizado correctamente' : 'Reporte guardado correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
    } catch (error) {
      console.error('Error guardando reporte:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error guardando el reporte',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSavingReport(false);
    }
  };

  const handleDownloadReport = () => {
    if (!generatedContent) return;
    
    const reportTitle = `REPORTE DE ANÁLISIS FORENSE\n${caseData?.title || 'Caso sin título'}\n${new Date().toLocaleDateString('es-ES')}\n${'='.repeat(50)}\n\n`;
    const fullContent = reportTitle + generatedContent;
    
    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte_forense_${caseData?.title?.replace(/\s+/g, '_') || 'caso'}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Combinar estados de carga
  const isLoadingData = loadingData || casesLoading;

  if (isLoadingData) {
    return (
      <Container maxW="7xl" py={8}>
        <Flex justify="center" align="center" minH="50vh">
          <VStack>
            <Spinner size="xl" color="purple.500" />
            <Text>Cargando análisis forenses del caso...</Text>
          </VStack>
        </Flex>
      </Container>
    );
  }

  if (!caseData) {
    return (
      <Container maxW="7xl" py={8}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>No se pudieron cargar los datos del caso.</AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        {/* Header */}
        <Flex justify="space-between" align="center" mb={6}>
          <HStack>
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={() => navigate('/cases')}
              variant="ghost"
              aria-label="Volver a casos"
            />
            <VStack align="start" spacing={0}>
              <Heading size="lg">Reporte de Análisis Forense</Heading>
              <Text color="gray.500">{caseData.title}</Text>
            </VStack>
          </HStack>
          
          <HStack>
            {generatedContent && (
              <>
                <IconButton
                  icon={<DownloadIcon />}
                  onClick={handleDownloadReport}
                  colorScheme="blue"
                  variant="ghost"
                  aria-label="Descargar reporte"
                />
                <Button
                  leftIcon={<EditIcon />}
                  onClick={() => setIsEditMode(!isEditMode)}
                  variant="ghost"
                  colorScheme="purple"
                >
                  {isEditMode ? 'Ver' : 'Editar'}
                </Button>
              </>
            )}
          </HStack>
        </Flex>

        <Grid templateColumns="1fr 2fr" gap={6}>
          {/* Panel Izquierdo - Información del Caso */}
          <GridItem>
            <VStack spacing={4} align="stretch">
              {/* Información del Caso */}
              <Card bg={cardBg} borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">Información del Caso</Heading>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={3}>
                    <Box>
                      <Text fontWeight="bold">Título:</Text>
                      <Text>{caseData.title}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Tipo:</Text>
                      <Badge colorScheme="purple">{typeLabels[caseData.type] || caseData.type}</Badge>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Estado:</Text>
                      <Badge colorScheme="orange">{stateLabels[caseData.state] || caseData.state}</Badge>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Prioridad:</Text>
                      <Badge colorScheme="red">{priorityLabels[caseData.priority] || caseData.priority}</Badge>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Fecha de Inicio:</Text>
                      <Text>{caseData.initDate ? new Date(caseData.initDate).toLocaleDateString('es-ES') : 'N/A'}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Ubicación:</Text>
                      <Text>{caseData.ubication || 'No especificada'}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Investigador:</Text>
                      <Text>{caseData.researcher?.name ? `${caseData.researcher.name} ${caseData.researcher.surname || ''}` : 'Sin asignar'}</Text>
                    </Box>
                    
                    {caseData.description && (
                      <Box>
                        <Text fontWeight="bold">Descripción:</Text>
                        <Text fontSize="sm" color="gray.600">{caseData.description}</Text>
                      </Box>
                    )}
                  </VStack>
                </CardBody>
              </Card>

              {/* Análisis Realizados */}
              <Card bg={cardBg} borderColor={borderColor}>
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <Heading size="md">Análisis Forenses</Heading>
                    <Badge colorScheme="green" variant="solid">
                      {analyses.length} completados
                    </Badge>
                  </Flex>
                </CardHeader>
                <CardBody>
                  {analyses.length > 0 ? (
                    <Accordion allowMultiple>
                      {analyses.map((analysis, index) => {
                        // Manejo más seguro de la evidencia relacionada
                        const evidence = analysis.evidenciaID || analysis.evidence || {};
                        
                        return (
                          <AccordionItem key={analysis._id || index}>
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                <Text fontWeight="medium">
                                  Análisis {index + 1}: {analysis.analysisType || 'Tipo no especificado'}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                  {evidence.type || 'Evidencia no especificada'}
                                  {analysis.confidence && ` • Confianza: ${analysis.confidence}`}
                                </Text>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                              <VStack align="start" spacing={2}>
                                <Text fontSize="sm">
                                  <strong>Evidencia:</strong> {evidence.description || 'N/A'}
                                </Text>
                                <Text fontSize="sm">
                                  <strong>Resultados:</strong> {analysis.results || 'N/A'}
                                </Text>
                                <Text fontSize="sm">
                                  <strong>Conclusiones:</strong> {analysis.conclusions || 'N/A'}
                                </Text>
                                <Text fontSize="sm">
                                  <strong>Fecha:</strong> {analysis.analysisDate ? new Date(analysis.analysisDate).toLocaleDateString('es-ES') : 'N/A'}
                                </Text>
                                <Text fontSize="sm">
                                  <strong>Especialista:</strong> {analysis.generatedBy?.name || 'N/A'}
                                </Text>
                              </VStack>
                            </AccordionPanel>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  ) : (
                    <Alert status="warning">
                      <AlertIcon />
                      <AlertDescription>
                        No hay análisis forenses completados para este caso. 
                        Se requieren análisis para generar un reporte técnico completo.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardBody>
              </Card>

              {/* Evidencias */}
              {evidences.length > 0 && (
                <Card bg={cardBg} borderColor={borderColor}>
                  <CardHeader>
                    <Heading size="md">Evidencias Relacionadas ({evidences.length})</Heading>
                  </CardHeader>
                  <CardBody>
                    <Accordion allowMultiple>
                      {evidences.map((evidence, index) => (
                        <AccordionItem key={evidence._id || index}>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              <Text fontWeight="medium">Evidencia {index + 1}</Text>
                              <Text fontSize="sm" color="gray.500">{evidence.type}</Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4}>
                            <VStack align="start" spacing={2}>
                              <Text fontSize="sm"><strong>Tipo:</strong> {evidence.type || 'N/A'}</Text>
                              <Text fontSize="sm"><strong>Descripción:</strong> {evidence.description || 'N/A'}</Text>
                              <Text fontSize="sm"><strong>Archivo:</strong> {evidence.archive || 'N/A'}</Text>
                              <Text fontSize="sm"><strong>Fecha:</strong> {evidence.collectionDate ? new Date(evidence.collectionDate).toLocaleDateString('es-ES') : 'N/A'}</Text>
                            </VStack>
                          </AccordionPanel>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardBody>
                </Card>
              )}
            </VStack>
          </GridItem>

          {/* Panel Derecho - Reporte */}
          <GridItem>
            <Card bg={cardBg} borderColor={borderColor} h="fit-content">
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md">Reporte de Análisis</Heading>
                  {existingReport && (
                    <VStack align="end" spacing={1}>
                      <Badge colorScheme="green">Guardado</Badge>
                      <Text fontSize="xs" color="gray.500">
                        v{existingReport.version}
                      </Text>
                    </VStack>
                  )}
                </Flex>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {/* Botones de Acción */}
                  <HStack justify="flex-end" flexWrap="wrap">
                    <Button
                      colorScheme="purple"
                      onClick={handleGenerateReport}
                      isLoading={aiLoading}
                      loadingText="Analizando..."
                      isDisabled={!caseData || analyses.length === 0}
                      size="sm"
                    >
                      {generatedContent ? 'Regenerar Reporte' : 'Generar Reporte Forense'}
                    </Button>
                    
                    {generatedContent && (
                      <Button
                        colorScheme="green"
                        onClick={handleSaveReport}
                        isLoading={savingReport}
                        loadingText="Guardando..."
                        size="sm"
                      >
                        {existingReport ? 'Actualizar' : 'Guardar'}
                      </Button>
                    )}
                  </HStack>

                  {/* Advertencia si no hay análisis */}
                  {analyses.length === 0 && (
                    <Alert status="info">
                      <AlertIcon />
                      <AlertDescription>
                        Se requieren análisis forenses completados para generar un reporte técnico. 
                        Asegúrate de que las evidencias hayan sido procesadas primero.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Error de IA */}
                  {aiError && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>{aiError}</AlertDescription>
                    </Alert>
                  )}

                  {/* Contenido del Reporte */}
                  {aiLoading ? (
                    <Flex justify="center" py={12}>
                      <VStack>
                        <Spinner size="lg" color="purple.500" />
                        <Text>Procesando análisis forenses...</Text>
                        <Text fontSize="sm" color="gray.500">
                          Generando reporte basado en {analyses.length} análisis completados
                        </Text>
                      </VStack>
                    </Flex>
                  ) : generatedContent ? (
                    <Box>
                      {isEditMode ? (
                        <Textarea
                          value={generatedContent}
                          onChange={(e) => setGeneratedContent(e.target.value)}
                          minH="600px"
                          resize="vertical"
                          fontFamily="mono"
                          fontSize="sm"
                        />
                      ) : (
                        <Box
                          p={4}
                          border="1px solid"
                          borderColor={borderColor}
                          borderRadius="md"
                          bg={useColorModeValue('gray.50', 'gray.900')}
                          maxH="700px"
                          overflowY="auto"
                        >
                          <Text whiteSpace="pre-wrap" fontSize="sm" lineHeight="1.6">
                            {generatedContent}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Box textAlign="center" py={12} color="gray.500">
                      <VStack spacing={4}>
                        <Text fontSize="lg">Reporte de Análisis Forense</Text>
                        <Text>
                          El reporte se generará basado en los análisis forenses completados. 
                        </Text>
                        <Text fontSize="sm">
                          {analyses.length > 0 
                            ? `Se utilizarán ${analyses.length} análisis disponibles para crear el reporte técnico.`
                            : 'Se requieren análisis forenses para generar el reporte.'}
                        </Text>
                      </VStack>
                    </Box>
                  )}
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Report;