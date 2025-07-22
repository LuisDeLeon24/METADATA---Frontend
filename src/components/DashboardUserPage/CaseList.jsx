import { useEffect, useState } from 'react';
import { getCasesByResearcher } from '../../services/api';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
} from '@chakra-ui/react';

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await getCasesByResearcher();
        console.log('Respuesta completa de la API:', res);

        if (res.success && Array.isArray(res.data)) {
          setCases(res.data);
          setError('');
          setAnimateKey((prev) => prev + 1);
        } else {
          setError('No se pudieron cargar los casos');
          setCases([]);
        }
      } catch (e) {
        console.error('Error al obtener los casos:', e);
        setError('Error al obtener los casos');
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const traducirEstado = (estado) => {
    switch (estado) {
      case 'RECEIVED':
        return { label: 'Recibido', color: 'green.400' };
      case 'IN_PROGRESS':
        return { label: 'En progreso', color: 'yellow.400' };
      case 'FINISHED':
        return { label: 'Finalizado', color: 'gray.400' };
      default:
        return { label: 'Desconocido', color: 'red.400' };
    }
  };

  const traducirPrioridad = (prioridad) => {
    switch (prioridad) {
      case 'LOW':
        return { label: 'Baja', color: 'green.400' };
      case 'MEDIUM':
        return { label: 'Media', color: 'orange.300' };
      case 'HIGH':
        return { label: 'Alta', color: 'red.400' };
      default:
        return { label: 'Sin prioridad', color: 'gray.400' };
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Spinner size="xl" />
        <Text ml={4}>Cargando casos...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error" mb={4}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (cases.length === 0) {
    return (
      <Box p={4}>
        <Text>No hay casos registrados.</Text>
      </Box>
    );
  }

  const bgColor = 'gray.700';
  const textColor = 'white';

  return (
    <Box p={6}>
      <Heading as="h2" size="lg" mb={6} color="gray.100" textAlign="center">
        Casos asignados
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {cases.map((c, index) => {
          const estado = traducirEstado(c.state);
          const prioridad = traducirPrioridad(c.priority);

          return (
            <Box
              key={`${c._id}-${animateKey}`}
              bg={bgColor}
              boxShadow="md"
              borderRadius="md"
              p={6}
              color={textColor}
              className="fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              _hover={{
                boxShadow: 'lg',
                transform: 'scale(1.03)',
                transition: 'all 0.15s ease-in-out',
              }}
            >
              <Text
                fontWeight="extrabold"
                fontSize="xl"
                mb={2}
                textTransform="uppercase"
              >
                {c.title}
              </Text>
              <Text fontWeight="semibold" fontSize="md" mb={1}>
                {c.description}
              </Text>
              <Text>Tipo: {c.type || 'No especificado'}</Text>
              <Text>Ubicación: {c.ubication || 'No especificada'}</Text>
              <Text color={estado.color}>Estado: {estado.label}</Text>
              <Text color={prioridad.color}>Prioridad: {prioridad.label}</Text>
            </Box>
          );
        })}
      </SimpleGrid>

      <style>
        {`
          .fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.3s ease-out forwards;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default CaseList;
