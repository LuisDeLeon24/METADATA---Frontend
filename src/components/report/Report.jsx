import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Text, Button, VStack, HStack, Card, CardHeader, CardBody,
  Textarea, useColorModeValue, Alert, AlertIcon, AlertDescription,
  Spinner, useToast, Container, Flex, IconButton
} from '@chakra-ui/react';
import { ArrowBackIcon, DownloadIcon, EditIcon } from '@chakra-ui/icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useOpenRouterChat } from '../../shared/hooks/useOpenRouterChat';
import { useCases } from '../../shared/hooks/useCases';
import { getCaseById, createReport, getReportByCase } from '../../services/api';

const Report = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const caseId = searchParams.get('caseId');

  const { analyses, evidences, isLoading: casesLoading, fetchAnalysesByCaseId, fetchEvidencesByCase } = useCases();
  const { sendMessage, response, loading: aiLoading, error: aiError } = useOpenRouterChat();

  const [caseData, setCaseData] = useState(null);
  const [existingReport, setExistingReport] = useState(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [savingReport, setSavingReport] = useState(false);

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

  useEffect(() => { if (response) setGeneratedContent(response); }, [response]);

  const loadCaseData = async () => {
    try {
      setLoadingData(true);
      const caseResult = await getCaseById(caseId);
      if (caseResult.error) throw new Error(caseResult.msg);
      setCaseData(caseResult.case);
      await fetchAnalysesByCaseId(caseId);
      await fetchEvidencesByCase(caseId);
      const reportResult = await getReportByCase(caseId);
      if (!reportResult.error && reportResult.data) {
        setExistingReport(reportResult.data);
        setGeneratedContent(reportResult.data.content || '');
      }
    } catch (error) {
      toast({ title: 'Error', description: error.message, status: 'error', duration: 5000 });
    } finally {
      setLoadingData(false);
    }
  };

  const prompt = `Actúa como un analista de vigilancia forense especializado en perfilado de individuos mediante análisis visual avanzado. Tu misión es crear un perfil completo y detallado basado en las siguientes etiquetas extraídas por nuestro sistema de reconocimiento.\nANÁLISIS REQUERIDO:\nREPORTE Y COMPILACION DE LAS EVIDENCIAS\nANÁLISIS DE EVIDENCIAS: ${analyses.map(a => a.reportResult).join(' ')}`;
  console.log(prompt);
  const handleGenerateReport = async () => {
    try {
      await sendMessage(prompt);
      toast({ title: 'Generando reporte', status: 'info', duration: 3000 });
    } catch (error) {
      toast({ title: 'Error al generar', description: error.message, status: 'error', duration: 5000 });
    }
  };

  const handleSaveReport = async () => {
    if (!generatedContent.trim()) {
      toast({ title: 'Error', description: 'Contenido vacío', status: 'warning', duration: 3000 });
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
      if (result.error) throw new Error(result.msg);
      setExistingReport(result.report);
      setIsEditMode(false);
      toast({ title: 'Guardado', status: 'success', duration: 3000 });
    } catch (error) {
      toast({ title: 'Error al guardar', description: error.message, status: 'error', duration: 5000 });
    } finally {
      setSavingReport(false);
    }
  };

  if (loadingData || casesLoading) {
    return (
      <Container maxW="7xl" py={8}><Flex justify="center" minH="50vh"><VStack><Spinner size="xl" /><Text>Cargando caso...</Text></VStack></Flex></Container>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        <HStack mb={6} justify="space-between">
          <HStack>
            <IconButton icon={<ArrowBackIcon />} onClick={() => navigate('/cases')} variant="ghost" aria-label="Volver" />
            <VStack align="start"><Heading size="lg">Reporte Forense</Heading><Text color="gray.500">{caseData.title}</Text></VStack>
          </HStack>
          {generatedContent && (
            <HStack>
              <IconButton icon={<DownloadIcon />} aria-label="Descargar" variant="ghost" />
              <Button leftIcon={<EditIcon />} onClick={() => setIsEditMode(!isEditMode)} variant="ghost" colorScheme="purple">
                {isEditMode ? 'Ver' : 'Editar'}
              </Button>
            </HStack>
          )}
        </HStack>

        <Card bg={cardBg} borderColor={borderColor}>
          <CardHeader><Heading size="md">Reporte</Heading></CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="flex-end">
                <Button colorScheme="purple" onClick={handleGenerateReport} isLoading={aiLoading} size="sm">
                  {generatedContent ? 'Regenerar' : 'Generar'}
                </Button>
                {generatedContent && (
                  <Button colorScheme="green" onClick={handleSaveReport} isLoading={savingReport} size="sm">
                    {existingReport ? 'Actualizar' : 'Guardar'}
                  </Button>
                )}
              </HStack>

              {aiError && <Alert status="error"><AlertIcon /><AlertDescription>{aiError}</AlertDescription></Alert>}

              {aiLoading ? (
                <Flex justify="center" py={12}><VStack><Spinner size="lg" /><Text>Procesando...</Text></VStack></Flex>
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
