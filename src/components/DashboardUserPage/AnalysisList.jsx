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
  Flex,
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
      <Flex justify="center" align="center" minH="300px" bg="gray.900">
        <Spinner size="xl" color="purple.400" />
        <Text ml={4} color="gray.300" fontSize="lg">
          Cargando análisis...
        </Text>
      </Flex>
    );
  }

  if (analyses.length === 0) {
    return (
      <Box bg="gray.900" p={6} textAlign="center" borderRadius="md">
        <Text color="gray.400">No hay análisis disponibles</Text>
      </Box>
    );
  }

  return (
    <MotionBox
      p={6}
      bg="gray.900"
      borderRadius="md"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
        {analyses.map((analysis, i) => {
          const isSelected = selectedCardId === analysis._id;
          return (
            <MotionCard
              key={analysis._id}
              borderWidth="1px"
              borderRadius="2xl"
              borderColor="purple.700"
              bg={isSelected ? 'purple.700' : 'purple.800'}
              color="white"
              boxShadow="md"
              p={4}
              cursor="pointer"
              onClick={() => handleCardClick(analysis._id)}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <CardHeader>
                <Flex align="center" gap={3}>
                  <Icon as={FaRobot} boxSize={5} color="purple.300" />
                  <Heading size="md">Análisis de Evidencia</Heading>
                </Flex>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider borderColor="purple.600" />} spacing="4">
                  <Box>
                    <Text fontWeight="semibold" color="purple.200">Resultado:</Text>
                    <Text>{analysis.resultado}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="semibold" color="purple.200">Modelos de IA usados:</Text>
                    <Text>{analysis.modelosIa}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="semibold" color="purple.200">Metadatos:</Text>
                    <Text whiteSpace="pre-wrap" fontSize="sm" color="purple.100">
                      {analysis.metadatos}
                    </Text>
                  </Box>

                  {isSelected && (
                    <Box pt={4}>
                      <Button
                        bg="purple.500"
                        color="white"
                        _hover={{ bg: 'purple.600' }}
                        size="md"
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