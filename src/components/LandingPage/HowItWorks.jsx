import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Flex,
    Circle,
    VStack,
    HStack,
    Icon,
    Badge,
    Divider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Image, Upload, Search, FileCheck, Sparkles, Shield, Zap } from 'lucide-react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionFlex = motion(Flex);

const StepCard = ({ icon, title, description, index, isInView }) => {
    return (
        <MotionVStack
            align="start"
            p={8}
            bg="linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="rgba(147, 51, 234, 0.2)"
            boxShadow="0 10px 30px rgba(147, 51, 234, 0.1)"
            position="relative"
            overflow="hidden"
            height="100%"
            cursor="pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut"
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
            }}
            _hover={{
                borderColor: 'rgba(147, 51, 234, 0.4)',
                boxShadow: '0 20px 40px rgba(147, 51, 234, 0.2)',
                _before: {
                    opacity: 1,
                }
            }}
        >
            {/* Número del paso */}
            <Badge
                position="absolute"
                top={4}
                right={4}
                bg="linear-gradient(135deg, #9333ea, #a855f7)"
                color="white"
                fontSize="xs"
                fontWeight="bold"
                px={2}
                py={1}
                borderRadius="full"
            >
                {String(index + 1).padStart(2, '0')}
            </Badge>

            {/* Efecto de brillo superior */}
            <Box
                position="absolute"
                top={0}
                left="50%"
                transform="translateX(-50%)"
                width="60%"
                height="2px"
                bg="linear-gradient(90deg, transparent, #a855f7, transparent)"
                opacity={0.6}
            />

            <Circle
                size="60px"
                bg="linear-gradient(135deg, #7c3aed, #a855f7)"
                color="white"
                mb={6}
                boxShadow="0 8px 20px rgba(147, 51, 234, 0.3)"
                position="relative"
                _after={{
                    content: '""',
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    right: '-2px',
                    bottom: '-2px',
                    borderRadius: 'full',
                    background: 'linear-gradient(45deg, #9333ea, #a855f7, #c084fc)',
                    zIndex: -1,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                }}
                _hover={{
                    _after: {
                        opacity: 0.7,
                    }
                }}
            >
                <Icon as={icon} boxSize="28px" />
            </Circle>

            <Heading
                as="h3"
                size="lg"
                mb={3}
                bgGradient="linear(to-r, #f8fafc, #e2e8f0)"
                bgClip="text"
                fontWeight="700"
            >
                {title}
            </Heading>

            <Text
                color="rgba(226, 232, 240, 0.8)"
                lineHeight="1.7"
                fontSize="sm"
            >
                {description}
            </Text>

            {/* Decoración inferior */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                height="4px"
                bg="linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)"
                opacity={0}
                transition="opacity 0.3s ease"
                _groupHover={{ opacity: 1 }}
            />
        </MotionVStack>
    );
};

const FeaturesBanner = ({ isInView }) => {
    const features = [
        { icon: Sparkles, text: "99.7% Precisión", color: "#10b981" },
        { icon: Zap, text: "Análisis Instantáneo", color: "#f59e0b" },
        { icon: Shield, text: "100% Seguro", color: "#ef4444" }
    ];

    return (
        <HStack
            spacing={8}
            justify="center"
            flexWrap="wrap"
            opacity={isInView ? 1 : 0}
            transform={isInView ? 'translateY(0)' : 'translateY(20px)'}
            transition="all 0.8s ease 0.6s"
        >
            {features.map((feature, index) => (
                <HStack
                    key={index}
                    spacing={2}
                    color="white"
                    fontWeight="600"
                    fontSize="sm"
                    bg="rgba(255, 255, 255, 0.05)"
                    px={4}
                    py={2}
                    borderRadius="full"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    _hover={{
                        bg: "rgba(255, 255, 255, 0.1)",
                        transform: "scale(1.05)",
                        transition: "all 0.2s ease"
                    }}
                >
                    <Icon as={feature.icon} boxSize="16px" color={feature.color} />
                    <Text>{feature.text}</Text>
                </HStack>
            ))}
        </HStack>
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
            title: 'Subir Imagen',
            description: 'Arrastra y suelta o selecciona la imagen que deseas analizar. Compatible con JPEG, PNG, TIFF y más formatos profesionales.',
        },
        {
            icon: Search,
            title: 'Análisis IA Avanzada',
            description: 'Algoritmos de deep learning especializados en criminología procesan la imagen con precisión forense de nivel profesional.',
        },
        {
            icon: FileCheck,
            title: 'Informe Detallado',
            description: 'Obtén un análisis completo con identificación de objetos, anomalías, patrones y evidencias potenciales.',
        },
        {
            icon: Image,
            title: 'Visualización Mejorada',
            description: 'Accede a mapas de calor, overlays interactivos y visualizaciones que destacan áreas críticas de interés.',
        },
    ];

    return (
        <Box
            as="section"
            py={20}
            bg="radial-gradient(ellipse at center, #0f0f23 0%, #050507 70%)"
            position="relative"
            overflow="hidden"
        >
            {/* Efectos de fondo */}
            <Box
                position="absolute"
                top="10%"
                left="10%"
                width="300px"
                height="300px"
                bg="radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)"
                borderRadius="full"
                filter="blur(40px)"
            />
            <Box
                position="absolute"
                bottom="20%"
                right="15%"
                width="200px"
                height="200px"
                bg="radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)"
                borderRadius="full"
                filter="blur(30px)"
            />

            <Container maxW="container.xl" ref={ref} position="relative" zIndex={2}>
                <MotionVStack
                    spacing={6}
                    mb={16}
                    textAlign="center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Badge
                        bg="linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(168, 85, 247, 0.2))"
                        color="white"
                        px={4}
                        py={2}
                        borderRadius="full"
                        border="1px solid rgba(147, 51, 234, 0.3)"
                        fontSize="sm"
                        fontWeight="600"
                        letterSpacing="wide"
                    >
                        PROCESO SIMPLIFICADO
                    </Badge>

                    <Heading
                        as="h2"
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                        fontWeight="800"
                        lineHeight="1.1"
                        bgGradient="linear(to-r, #f8fafc, #a855f7, #f8fafc)"
                        bgClip="text"
                        letterSpacing="tight"
                    >
                        ¿Cómo funciona?
                    </Heading>

                    <Text
                        color="rgba(226, 232, 240, 0.7)"
                        fontSize={{ base: 'lg', md: 'xl' }}
                        maxW="600px"
                        lineHeight="1.8"
                        fontWeight="400"
                    >
                        Transforma horas de análisis manual en minutos de precisión automatizada con nuestra plataforma de IA forense.
                    </Text>

                    <Divider
                        orientation="horizontal"
                        borderColor="rgba(147, 51, 234, 0.3)"
                        maxW="100px"
                        borderWidth="2px"
                        my={4}
                    />
                </MotionVStack>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={16}>
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

                <MotionFlex
                    borderRadius="3xl"
                    overflow="hidden"
                    flexDir={{ base: 'column', lg: 'row' }}
                    bg="linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
                    border="1px solid rgba(147, 51, 234, 0.2)"
                    boxShadow="0 25px 50px rgba(147, 51, 234, 0.1)"
                    position="relative"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    _hover={{
                        boxShadow: "0 35px 70px rgba(147, 51, 234, 0.15)",
                        transition: "all 0.3s ease"
                    }}
                >
                    {/* Imagen con overlay sofisticado */}
                    <Box
                        flex="1"
                        backgroundImage="url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
                        backgroundSize="cover"
                        backgroundPosition="center"
                        minH={{ base: '300px', lg: '500px' }}
                        position="relative"
                        _after={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bg: 'linear-gradient(135deg, rgba(147, 51, 234, 0.4) 0%, rgba(16, 16, 46, 0.8) 100%)',
                        }}
                    >
                        {/* Grid pattern overlay */}
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            backgroundImage="radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)"
                            backgroundSize="30px 30px"
                            opacity={0.3}
                        />
                    </Box>

                    <VStack
                        flex="1"
                        p={{ base: 8, lg: 12 }}
                        justify="center"
                        align="flex-start"
                        spacing={6}
                        bg="linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9))"
                    >
                        <Badge
                            bg="linear-gradient(135deg, #7c3aed, #a855f7)"
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="bold"
                            letterSpacing="wide"
                        >
                            TECNOLOGÍA AVANZADA
                        </Badge>

                        <Heading
                            as="h3"
                            size="xl"
                            bgGradient="linear(to-r, #f8fafc, #e2e8f0)"
                            bgClip="text"
                            fontWeight="700"
                        >
                            Impulsado por IA de Última Generación
                        </Heading>

                        <Text
                            color="rgba(226, 232, 240, 0.8)"
                            lineHeight="1.8"
                            fontSize="md"
                        >
                            Nuestros modelos de visión por computadora han sido entrenados con millones de imágenes forenses,
                            permitiendo detectar patrones imperceptibles, reconstruir escenarios y destacar evidencias críticas
                            que podrían determinar el curso de una investigación.
                        </Text>

                        <FeaturesBanner isInView={inView} />
                    </VStack>
                </MotionFlex>
            </Container>
        </Box>
    );
};

export default HowItWorks;