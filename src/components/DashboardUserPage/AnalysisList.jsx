import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import { useAnalysisView } from '../../shared/hooks/analysis/useAnalysisView';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const AnalysisList = () => {
  const { analyses, isLoading, error, fetchAnalyses } = useAnalysisView();
  const [username, setUsername] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null);
  const toast = useToast();

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
      <Box textAlign="center" mt="24">
        <Spinner size="xl" />
        <Text mt={4} fontSize="lg">
          Cargando análisis...
        </Text>
      </Box>
    );
  }

  return (
    <MotionBox
      p={6}
      mt="100"
      mb="100"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box mb={8} textAlign="center">
        <Heading size="lg">Bienvenido, {username}</Heading>
        <Text fontSize="md" color="gray.500">
          Aquí tienes tus análisis.
        </Text>
      </Box>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={10}>
        {analyses.map((analysis, i) => {
          const isSelected = selectedCardId === analysis._id;
          return (
            <MotionCard
              key={analysis._id}
              borderWidth="3px"
              borderRadius="2xl"
              borderColor="gray.300"
              boxShadow="md"
              p={4}
              bg={isSelected ? 'gray.100' : 'white'}
              cursor="pointer"
              onClick={() => handleCardClick(analysis._id)}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <CardHeader>
                <Box display="flex" alignItems="center" gap={3}>
                  <Icon as={FaRobot} boxSize={5} color="blue.500" />
                  <Heading color="gray.600" size="md">Análisis de Evidencia</Heading>
                </Box>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Text fontWeight="semibold" color="gray.600">Resultado:</Text>
                    <Text color="gray.600">{analysis.resultado}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="semibold" color="gray.600">Modelos de IA usados:</Text>
                    <Text color="gray.600">{analysis.modelosIa}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="semibold" color="gray.600">Metadatos:</Text>
                    <Text whiteSpace="pre-wrap" fontSize="sm" color="gray.700">
                      {analysis.metadatos}
                    </Text>
                  </Box>

                  {isSelected && (
                    <Box pt={4}>
                      <Button
                        bg="#3C6888"
                        color="white"
                        _hover={{ bg: "#3C6870" }}
                        size="lg"
                        width="100%"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadPdf(analysis);
                        }}
                      >
                        Descargar PDF
                      </Button>
                    </Box>
                  )}
                </Stack>
              </CardBody>
            </MotionCard>
          );
        })}
      </Grid>
    </MotionBox>
  );
};

export default AnalysisList;
