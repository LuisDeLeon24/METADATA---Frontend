import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Flex, Circle, VStack, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { Image, Upload, Search, FileCheck } from 'lucide-react';

const StepCard = ({ icon, title, description, index, isInView }) => {
    return (
        <VStack
            align="start"
            p={6}
            bg="dark.800"
            borderRadius="lg"
            border="1px solid"
            borderColor="dark.700"
            boxShadow="md"
            transition="all 0.3s ease"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
            opacity={isInView ? 1 : 0}
            transform={isInView ? 'translateY(0)' : 'translateY(20px)'}
            transitionDelay={`${index * 0.1 + 0.2}s`}
            height="100%"
        >
            <Circle size="50px" bg="brand.500" color="white" mb={4}>
                <Icon as={icon} boxSize="24px" />
            </Circle>
            <Heading as="h3" size="md" mb={2}>
                {title}
            </Heading>
            <Text color="gray.400">{description}</Text>
        </VStack>
    );
};

const HowItWorks = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const steps = [
        {
            icon: Upload,
            title: 'Subir imagen',
            description: 'Simplemente subí la imagen que deseás analizar. Nuestro sistema acepta varios formatos, incluyendo JPEG, PNG y TIFF.',
        },
        {
            icon: Search,
            title: 'Análisis con IA',
            description: 'Nuestra avanzada inteligencia artificial analiza la imagen utilizando algoritmos de aprendizaje profundo especializados en aplicaciones de criminología.',
        },
        {
            icon: FileCheck,
            title: 'Obtener informe detallado',
            description: 'Recibí un informe completo con detalles sobre objetos identificados, anomalías, patrones y posibles evidencias.',
        },
        {
            icon: Image,
            title: 'Visualización mejorada',
            description: 'Accedé a visualizaciones mejoradas que resaltan las áreas clave de interés y las anomalías detectadas en la imagen.',
        },
    ];


    return (
        <Box as="section" py={20} bg="dark.900">
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
                        ¿Cómo funciona?
                    </Heading>
                    <Text
                        color="gray.400"
                        fontSize={{ base: 'md', md: 'lg' }}
                        maxW="container.md"
                        opacity={inView ? 1 : 0}
                        transform={inView ? 'translateY(0)' : 'translateY(20px)'}
                        transition="all 0.5s ease 0.1s"
                    >
                        Nuestra plataforma simplifica el complejo proceso de análisis de imágenes para criminología, proporcionando información de nivel experto en minutos en lugar de horas.
                    </Text>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                    {steps.map((step, index) => (
                        <StepCard
                            key={index}
                            icon={step.icon}
                            title={step.title}
                            description={step.description}
                            index={index}
                            isInView={inView}
                        />
                    ))}
                </SimpleGrid>

                <Flex
                    mt={16}
                    borderRadius="xl"
                    overflow="hidden"
                    flexDir={{ base: 'column', md: 'row' }}
                    bg="dark.800"
                    border="1px solid"
                    borderColor="dark.700"
                    opacity={inView ? 1 : 0}
                    transform={inView ? 'translateY(0)' : 'translateY(20px)'}
                    transition="all 0.5s ease 0.4s"
                >
                    <Box
                        flex="1"
                        backgroundImage="url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
                        backgroundSize="cover"
                        backgroundPosition="center"
                        minH={{ base: '200px', md: '400px' }}
                        position="relative"
                        _after={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bg: 'rgba(0,0,0,0.3)',
                        }}
                    />
                    <VStack
                        flex="1"
                        p={{ base: 6, md: 10 }}
                        justify="center"
                        align="flex-start"
                        spacing={5}
                    >
                        <Heading as="h3" size="lg">
                            Impulsado por IA Avanzada
                        </Heading>
                        <Text color="gray.400">
                            Nuestra plataforma utiliza modelos de visión por computadora y aprendizaje profundo de última generación, entrenados específicamente con datos forenses. El sistema puede identificar objetos, detectar anomalías, reconstruir escenarios y resaltar evidencias que podrían pasar desapercibidas para el ojo humano.
                        </Text>
                        <HStack spacing={4} color="brand.400" fontWeight="bold">
                            <Text>99.7% de precisión</Text>
                            <Text>|</Text>
                            <Text>Análisis en tiempo real</Text>
                            <Text>|</Text>
                            <Text>Seguro</Text>
                        </HStack>

                    </VStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default HowItWorks;