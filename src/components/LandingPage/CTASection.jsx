import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Icon,
    Badge,
    Flex,
    Circle
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    ArrowRight,
    Shield,
    Clock,
    Users,
    Sparkles,
    CheckCircle,
    Star
} from 'lucide-react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const FloatingParticle = ({ delay = 0, size = 4, top = "20%", left = "10%" }) => (
    <MotionBox
        position="absolute"
        top={top}
        left={left}
        width={`${size}px`}
        height={`${size}px`}
        bg="rgba(168, 85, 247, 0.4)"
        borderRadius="full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -20, 0],
        }}
        transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
);

const StatsCard = ({ icon, number, label, delay = 0 }) => (
    <MotionVStack
        bg="rgba(26, 26, 46, 0.6)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(147, 51, 234, 0.2)"
        borderRadius="xl"
        p={4}
        spacing={2}
        minW="120px"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        _hover={{
            transform: "scale(1.05)",
            borderColor: "rgba(147, 51, 234, 0.4)",
            bg: "rgba(26, 26, 46, 0.8)"
        }}
    >
        <Circle size="40px" bg="linear-gradient(135deg, #7c3aed, #a855f7)" color="white">
            <Icon as={icon} boxSize={5} />
        </Circle>
        <Text
            fontSize="xl"
            fontWeight="bold"
            bgGradient="linear(to-r, #a855f7, #c084fc)"
            bgClip="text"
        >
            {number}
        </Text>
        <Text fontSize="xs" color="rgba(226, 232, 240, 0.6)" textAlign="center">
            {label}
        </Text>
    </MotionVStack>
);

const FeatureBadge = ({ icon, text, delay = 0 }) => (
    <MotionBox
        bg="rgba(147, 51, 234, 0.1)"
        border="1px solid rgba(147, 51, 234, 0.3)"
        borderRadius="full"
        px={4}
        py={2}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
        _hover={{
            bg: "rgba(147, 51, 234, 0.2)",
            borderColor: "rgba(147, 51, 234, 0.5)"
        }}
    >
        <HStack spacing={2}>
            <Icon as={icon} boxSize={4} color="#a855f7" />
            <Text fontSize="sm" color="white" fontWeight="500">
                {text}
            </Text>
        </HStack>
    </MotionBox>
);

const SeccionCTA = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const stats = [
        { icon: Users, number: "500+", label: "Agencias Activas" },
        { icon: Clock, number: "< 30s", label: "Tiempo Análisis" },
        { icon: Shield, number: "99.8%", label: "Precisión" }
    ];

    const features = [
        { icon: CheckCircle, text: "Prueba Gratuita" },
        { icon: Shield, text: "100% Seguro" },
        { icon: Star, text: "Soporte 24/7" }
    ];

    return (
        <Box
            as="section"
            py={32}
            bg="radial-gradient(ellipse at center, #0f0f23 0%, #050507 70%)"
            position="relative"
            overflow="hidden"
        >
            {/* Efectos de fondo animados */}
            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                backgroundImage='url("https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
                backgroundSize="cover"
                backgroundPosition="center"
                opacity={0.03}
                zIndex={0}
            />

            {/* Gradientes de fondo */}
            <Box
                position="absolute"
                top="10%"
                left="10%"
                width="600px"
                height="600px"
                bg="radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)"
                borderRadius="full"
                filter="blur(80px)"
                animation="pulse 8s ease-in-out infinite"
            />
            <Box
                position="absolute"
                bottom="10%"
                right="10%"
                width="400px"
                height="400px"
                bg="radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)"
                borderRadius="full"
                filter="blur(60px)"
                animation="pulse 6s ease-in-out infinite reverse"
            />

            {/* Partículas flotantes */}
            <FloatingParticle delay={0} top="15%" left="15%" size={6} />
            <FloatingParticle delay={1} top="25%" left="85%" size={4} />
            <FloatingParticle delay={2} top="70%" left="20%" size={5} />
            <FloatingParticle delay={1.5} top="80%" left="80%" size={3} />

            <Container maxW="container.xl" position="relative" zIndex={2}>
                <MotionVStack
                    ref={ref}
                    spacing={12}
                    textAlign="center"
                    maxW="container.lg"
                    mx="auto"
                    px={8}
                    py={20}
                    borderRadius="3xl"
                    bg="linear-gradient(145deg, rgba(26, 26, 46, 0.4), rgba(22, 33, 62, 0.4))"
                    backdropFilter="blur(30px)"
                    border="1px solid rgba(147, 51, 234, 0.2)"
                    boxShadow="0 40px 80px rgba(147, 51, 234, 0.1)"
                    position="relative"
                    overflow="hidden"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={inView ? {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    } : {
                        opacity: 0,
                        y: 50,
                        scale: 0.95
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80%',
                        height: '3px',
                        bg: 'linear-gradient(90deg, transparent, #a855f7, transparent)',
                        opacity: 0.8,
                    }}
                >
                    {/* Badge superior */}
                    <MotionBox
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Badge
                            bg="linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(168, 85, 247, 0.3))"
                            color="white"
                            px={6}
                            py={3}
                            borderRadius="full"
                            border="1px solid rgba(147, 51, 234, 0.4)"
                            fontSize="sm"
                            fontWeight="700"
                            letterSpacing="wide"
                            display="flex"
                            alignItems="center"
                            gap={2}
                        >
                            <Icon as={Sparkles} boxSize={4} />
                            ÚNETE A LA REVOLUCIÓN FORENSE
                        </Badge>
                    </MotionBox>

                    {/* Título principal */}
                    <MotionBox
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Heading
                            as="h2"
                            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
                            lineHeight="1.1"
                            fontWeight="800"
                            letterSpacing="tight"
                        >
                            <Text
                                as="span"
                                bgGradient="linear(to-r, #f8fafc, #a855f7)"
                                bgClip="text"
                            >
                                ¿Listo para
                            </Text>
                            <br />
                            <Text
                                as="span"
                                bgGradient="linear(to-r, #9333ea, #c084fc)"
                                bgClip="text"
                            >
                                Revolucionar
                            </Text>
                            <br />
                            <Text as="span" color="white">
                                tus Investigaciones?
                            </Text>
                        </Heading>
                    </MotionBox>

                    {/* Descripción */}
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Text
                            fontSize={{ base: 'lg', md: 'xl' }}
                            color="rgba(226, 232, 240, 0.8)"
                            maxW="600px"
                            lineHeight="1.7"
                            fontWeight="400"
                        >
                            Únete a <Text as="span" color="#a855f7" fontWeight="600">500+ agencias</Text> que
                            ya están utilizando nuestra IA forense para resolver casos
                            <Text as="span" color="#c084fc" fontWeight="600"> 10x más rápido</Text>.
                        </Text>
                    </MotionBox>

                    {/* Estadísticas */}
                    <MotionBox
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <HStack
                            spacing={6}
                            justify="center"
                            flexWrap="wrap"
                            mb={8}
                        >
                            {stats.map((stat, index) => (
                                <StatsCard
                                    key={index}
                                    icon={stat.icon}
                                    number={stat.number}
                                    label={stat.label}
                                    delay={0.6 + index * 0.1}
                                />
                            ))}
                        </HStack>
                    </MotionBox>

                    {/* Botón CTA principal */}
                    <MotionBox
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <MotionButton
                            size="lg"
                            height="70px"
                            width={{ base: "full", md: "400px" }}
                            fontSize="xl"
                            fontWeight="bold"
                            rightIcon={<ArrowRight />}
                            bg="linear-gradient(135deg, #7c3aed, #a855f7)"
                            color="white"
                            border="2px solid transparent"
                            borderRadius="xl"
                            boxShadow="0 15px 35px rgba(147, 51, 234, 0.4)"
                            position="relative"
                            overflow="hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            _hover={{
                                bg: "linear-gradient(135deg, #6d28d9, #9333ea)",
                                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.5)",
                                _before: {
                                    opacity: 1,
                                }
                            }}
                            _before={{
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                bg: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                opacity: 0,
                                transition: 'all 0.5s ease',
                            }}
                        >
                            COMENZAR PRUEBA GRATUITA
                        </MotionButton>
                    </MotionBox>

                    {/* Features badges */}
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <HStack
                            spacing={4}
                            justify="center"
                            flexWrap="wrap"
                            mb={4}
                        >
                            {features.map((feature, index) => (
                                <FeatureBadge
                                    key={index}
                                    icon={feature.icon}
                                    text={feature.text}
                                    delay={0.9 + index * 0.1}
                                />
                            ))}
                        </HStack>
                    </MotionBox>

                    {/* Texto de garantía */}
                    <MotionBox
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                    >
                        <Text
                            fontSize="sm"
                            color="rgba(226, 232, 240, 0.6)"
                            fontWeight="500"
                        >
                            ✨ Sin tarjeta de crédito • 14 días completamente gratis • Cancelación instantánea
                        </Text>
                    </MotionBox>

                    {/* Efecto de brillo inferior */}
                    <Box
                        position="absolute"
                        bottom={0}
                        left="50%"
                        transform="translateX(-50%)"
                        width="60%"
                        height="2px"
                        bg="linear-gradient(90deg, transparent, #a855f7, transparent)"
                        opacity={0.6}
                    />
                </MotionVStack>
            </Container>

            {/* Animación CSS personalizada */}
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.3;
                        transform: scale(1.05);
                    }
                }
            `}</style>
        </Box>
    );
};

export default SeccionCTA;