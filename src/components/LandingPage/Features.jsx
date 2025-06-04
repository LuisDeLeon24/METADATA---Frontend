import React from 'react';
import { Box, Container, SimpleGrid, Heading, Text, Flex, Icon, VStack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { Eye, Shield, Clock, FileSearch, Users, Database } from 'lucide-react';

const FeatureCard = ({ icon, title, description, index, isInView }) => {
  return (
    <VStack
      bg="dark.800"
      p={6}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="dark.700"
      align="flex-start"
      transition="all 0.3s ease"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
      opacity={isInView ? 1 : 0}
      transform={isInView ? 'translateY(0)' : 'translateY(20px)'}
      transitionDelay={`${index * 0.1 + 0.2}s`}
      height="100%"
    >
      <Flex
        w={10}
        h={10}
        align="center"
        justify="center"
        borderRadius="md"
        bg="accent.500"
        mb={4}
      >
        <Icon as={icon} color="white" boxSize={5} />
      </Flex>
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text color="gray.400">{description}</Text>
    </VStack>
  );
};

const Features = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: Eye,
      title: 'Reconocimiento de Patrones Avanzado',
      description: 'Identificá patrones y conexiones que podrían pasar desapercibidos en un análisis humano, revelando evidencia y relaciones ocultas.',
    },
    {
      icon: Shield,
      title: 'Seguro y Confidencial',
      description: 'Seguridad de nivel empresarial que garantiza que todas las imágenes y resultados del análisis se mantengan completamente confidenciales y protegidos.',
    },
    {
      icon: Clock,
      title: 'Análisis Rápido',
      description: 'Obtené resultados completos en segundos en lugar de horas o días, acelerando significativamente los tiempos de investigación.',
    },
    {
      icon: FileSearch,
      title: 'Informes Detallados',
      description: 'Recibí informes aptos para tribunales con evidencia destacada, puntajes de confianza estadística y documentación metodológica.',
    },
    {
      icon: Users,
      title: 'Colaboración Multiusuario',
      description: 'Facilitá la colaboración en equipo con casos compartidos, anotaciones y canales de comunicación seguros para los investigadores.',
    },
    {
      icon: Database,
      title: 'Integración con Casos Históricos',
      description: 'Conectá nuevas evidencias con datos de casos anteriores para identificar patrones a lo largo de distintas investigaciones y períodos.',
    },
  ];

  return (
    <Box as="section" py={20} bg="dark.800">
      <Container maxW="container.xl" ref={ref}>
        <VStack spacing={4} mb={12} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            fontWeight="bold"
            opacity={inView ? 1 : 0}
            transform={inView ? 'translateY(0)' : 'translateY(20px)'}
            transition="all 0.5s ease"
            bgGradient="linear(to-r, brand.400, accent.400)"
            bgClip="text"
          >
            Características Clave
          </Heading>
          <Text
            color="gray.400"
            fontSize={{ base: 'md', md: 'lg' }}
            maxW="container.md"
            opacity={inView ? 1 : 0}
            transform={inView ? 'translateY(0)' : 'translateY(20px)'}
            transition="all 0.5s ease 0.1s"
          >
            Nuestra plataforma combina inteligencia artificial de última generación con conocimiento especializado en criminología para ofrecer una herramienta investigativa poderosa.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              isInView={inView}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Features;
