import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Text, Button, VStack, HStack, Card, CardHeader, CardBody,
  Textarea, useColorModeValue, Alert, AlertIcon, AlertDescription,
  Spinner, useToast, Container, Flex, IconButton
} from '@chakra-ui/react';
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useOpenRouterChat } from '../../shared/hooks/useOpenRouterChat';
import { useCases } from '../../shared/hooks/useCases';
import { getCaseById } from '../../services/api';
import { useReport } from '../../shared/hooks/useReport';
import PdfReport from './PdfReport'; // ✅ Importar el nuevo componente

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

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    if (!caseId) {
      toast({ title: 'Error', description: 'ID de caso no válido', status: 'error', duration: 3000 });
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

  const loadCaseData = async () => {
    try {
      setLoadingData(true);
      const caseResult = await getCaseById(caseId);
      if (caseResult.error) throw new Error(caseResult.msg);
      setCaseData(caseResult.case);
      await fetchAnalysesByCaseId(caseId);
    } catch (error) {
      toast({ title: 'Error', description: error.message, status: 'error', duration: 5000 });
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
        });
        return;
      }

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
      toast({ title: 'Generando reporte', status: 'info', duration: 3000 });
    } catch (error) {
      toast({ title: 'Error al generar', description: error.message, status: 'error', duration: 5000 });
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
        toast({ title: 'Reporte guardado', status: 'success', duration: 3000 });
      } else {
        toast({ title: 'Error', description: response.msg || 'Error desconocido', status: 'error', duration: 5000 });
      }
    } catch (error) {
      toast({
        title: 'Error al guardar',
        description: error.message || 'Ocurrió un error al guardar el reporte.',
        status: 'error',
        duration: 5000
      });
    }
  };

  if (loadingData || casesLoading) {
    return (
      <Container maxW="7xl" py={8}>
        <Flex justify="center" minH="50vh">
          <VStack>
            <Spinner size="xl" />
            <Text>Cargando caso...</Text>
          </VStack>
        </Flex>
      </Container>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        <HStack mb={6} justify="space-between">
          <HStack>
            <IconButton icon={<ArrowBackIcon />} onClick={() => navigate('/cases')} variant="ghost" aria-label="Volver" />
            <VStack align="start">
              <Heading size="lg">Reporte Forense</Heading>
              <Text color="gray.500">{caseData?.title}</Text>
            </VStack>
          </HStack>
          {generatedContent && (
            <Button leftIcon={<EditIcon />} onClick={() => setIsEditMode(!isEditMode)} variant="ghost" colorScheme="purple">
              {isEditMode ? 'Ver' : 'Editar'}
            </Button>
          )}
        </HStack>

        <Card bg={cardBg} borderColor={borderColor}>
          <CardHeader><Heading size="md">Reporte</Heading></CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="flex-end" spacing={2}>
                <Button colorScheme="purple" onClick={handleGenerateReport} isLoading={aiLoading} size="sm">
                  {generatedContent ? 'Regenerar' : 'Generar'}
                </Button>
                {generatedContent && (
                  <>
                    <Button colorScheme="green" onClick={handleSaveReport} isLoading={reportLoading} size="sm">
                      Guardar Reporte
                    </Button>
                    {/* ✅ Agregar el botón de PDF */}
                    <PdfReport
                      caseData={caseData}
                      generatedContent={generatedContent}
                      analyses={analyses}
                      caseId={caseId}
                    />
                  </>
                )}
              </HStack>

              {aiError && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{aiError}</AlertDescription>
                </Alert>
              )}

              {aiLoading ? (
                <Flex justify="center" py={12}>
                  <VStack>
                    <Spinner size="lg" />
                    <Text>Procesando...</Text>
                  </VStack>
                </Flex>
              ) : generatedContent ? (
                isEditMode ? (
                  <Textarea value={generatedContent} onChange={e => setGeneratedContent(e.target.value)} minH="600px" fontSize="sm" />
                ) : (
                  <Box p={4} border="1px solid" borderColor={borderColor} borderRadius="md" bg={useColorModeValue('gray.50', 'gray.900')}>
                    <Text whiteSpace="pre-wrap" fontSize="sm">{generatedContent}</Text>
                  </Box>
                )
              ) : (
                <Text textAlign="center">Genera un reporte para este caso</Text>
              )}
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};

export default Report;