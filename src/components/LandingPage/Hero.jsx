import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  VStack,
  HStack,
  Badge,
  Divider,
  Progress
} from '@chakra-ui/react';
import {
  BrainCog,
  Sparkles,
  Zap,
  Shield,
  Eye,
  Target,
  ArrowRight,
  Play,
  Star,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  const features = [
    { icon: <Eye size={24} />, text: "Identificación de Objetos", color: "#9333ea" },
    { icon: <Target size={24} />, text: "Análisis de Patrones", color: "#7c3aed" },
    { icon: <Shield size={24} />, text: "Detección de Evidencia", color: "#6366f1" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 60);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Box
      as="section"
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="linear-gradient(135deg, #0f0f17 0%, #1a1a2e 50%, #16213e 100%)"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}
    >
      <ParticleBackground />

      {/* Elementos decorativos de fondo */}
      <MotionBox
        position="absolute"
        top="10%"
        right="10%"
        width="400px"
        height="400px"
        borderRadius="50%"
        bg="linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(124, 58, 237, 0.05))"
        filter="blur(100px)"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <MotionBox
        position="absolute"
        bottom="20%"
        left="5%"
        width="300px"
        height="300px"
        borderRadius="50%"
        bg="linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(147, 51, 234, 0.05))"
        filter="blur(80px)"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, 50, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container maxW="container.xl" position="relative" zIndex="2">
        <MotionFlex
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'center', lg: 'flex-start' }}
          spacing={12}
          py={{ base: 20, md: 28 }}
          gap={{ base: 12, lg: 16 }}
        >
          {/* Columna Izquierda - Contenido */}
          <MotionBox flex={1} variants={itemVariants}>
            <VStack spacing={8} align={{ base: 'center', lg: 'flex-start' }} textAlign={{ base: 'center', lg: 'left' }}>

              {/* Badge de Nuevo */}
              <MotionBox
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Badge
                  bg="linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(124, 58, 237, 0.3))"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="bold"
                  border="1px solid"
                  borderColor="rgba(147, 51, 234, 0.3)"
                  backdropFilter="blur(10px)"
                >
                  <HStack spacing={2}>
                    <Sparkles size={14} />
                    <Text>Nueva Tecnología IA</Text>
                  </HStack>
                </Badge>
              </MotionBox>

              {/* Logo y Título Principal */}
              <MotionBox variants={itemVariants}>
                <VStack spacing={6}>
                  <MotionFlex
                    align="center"
                    justify={{ base: 'center', lg: 'flex-start' }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <MotionBox
                      mr={4}
                      p={3}
                      borderRadius="2xl"
                      bg="linear-gradient(135deg, #9333ea, #7c3aed)"
                      color="white"
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        boxShadow: "0 0 40px rgba(147, 51, 234, 0.5)"
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <BrainCog size={40} />
                    </MotionBox>
                    <VStack spacing={0} align="start">
                      <Text
                        fontSize="3xl"
                        fontWeight="900"
                        bgGradient="linear(to-r, #ffffff, #e5e5e5, #9333ea)"
                        bgClip="text"
                        letterSpacing="tight"
                      >
                        MetaData
                      </Text>
                      <Text
                        fontSize="sm"
                        color="purple.300"
                        fontWeight="600"
                        letterSpacing="wider"
                      >
                        AI FORENSICS
                      </Text>
                    </VStack>
                  </MotionFlex>

                  <MotionBox
                    variants={itemVariants}
                    textAlign={{ base: 'center', lg: 'left' }}
                  >
                    <Heading
                      lineHeight={1.1}
                      fontWeight={900}
                      fontSize={{ base: '4xl', sm: '5xl', lg: '7xl' }}
                      mb={4}
                    >
                      <MotionText
                        as="span"
                        bgGradient="linear(to-r, #9333ea, #7c3aed, #6366f1)"
                        bgClip="text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        Análisis Forense
                      </MotionText>
                      <br />
                      <MotionText
                        as="span"
                        color="white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        Inteligente
                      </MotionText>
                      <MotionText
                        as="span"
                        color="purple.400"
                        fontSize={{ base: '2xl', lg: '4xl' }}
                        fontWeight={600}
                        ml={4}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        ⚡
                      </MotionText>
                    </Heading>

                    <MotionText
                      color="rgba(255, 255, 255, 0.8)"
                      maxW={{ lg: '85%' }}
                      fontSize={{ base: 'lg', lg: 'xl' }}
                      lineHeight="tall"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      Revoluciona la investigación criminal con IA avanzada.
                      <Text as="span" color="purple.300" fontWeight="semibold">
                        {" "}Análisis instantáneo de imágenes
                      </Text>, reconocimiento de patrones y detección de evidencia con precisión forense.
                    </MotionText>
                  </MotionBox>
                </VStack>
              </MotionBox>

              {/* Features Dinámicas */}
              <MotionBox variants={itemVariants} w="full">
                <VStack spacing={4} align={{ base: 'center', lg: 'flex-start' }}>
                  <Text color="purple.300" fontSize="sm" fontWeight="bold" letterSpacing="wide">
                    CAPACIDADES PRINCIPALES
                  </Text>
                  <HStack spacing={6} wrap="wrap" justify={{ base: 'center', lg: 'flex-start' }}>
                    {features.map((feature, index) => (
                      <MotionBox
                        key={index}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <HStack
                          spacing={3}
                          bg={currentFeature === index ? "rgba(147, 51, 234, 0.2)" : "rgba(255, 255, 255, 0.05)"}
                          px={4}
                          py={3}
                          borderRadius="xl"
                          border="1px solid"
                          borderColor={currentFeature === index ? "purple.500" : "rgba(255, 255, 255, 0.1)"}
                          transition="all 0.3s ease"
                          cursor="pointer"
                          onClick={() => setCurrentFeature(index)}
                        >
                          <Box color={feature.color}>{feature.icon}</Box>
                          <Text
                            color={currentFeature === index ? "white" : "rgba(255, 255, 255, 0.7)"}
                            fontSize="sm"
                            fontWeight="semibold"
                          >
                            {feature.text}
                          </Text>
                        </HStack>
                      </MotionBox>
                    ))}
                  </HStack>
                </VStack>
              </MotionBox>

              {/* Botones de Acción */}
              <MotionBox variants={itemVariants}>
                <HStack spacing={4} justify={{ base: 'center', lg: 'flex-start' }}>
                  <MotionButton
                    size="xl"
                    px={10}
                    py={8}
                    fontSize="lg"
                    fontWeight="bold"
                    borderRadius="2xl"
                    bg="linear-gradient(135deg, #9333ea, #7c3aed)"
                    color="white"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)",
                      y: -3
                    }}
                    whileTap={{ scale: 0.95 }}
                    _hover={{
                      bg: "linear-gradient(135deg, #7c3aed, #6366f1)"
                    }}
                  >
                    <HStack spacing={3}>
                      <Text>Explorar Plataforma</Text>
                      <ArrowRight size={20} />
                    </HStack>
                  </MotionButton>

                  <MotionButton
                    size="xl"
                    px={8}
                    py={8}
                    fontSize="lg"
                    fontWeight="semibold"
                    borderRadius="2xl"
                    variant="outline"
                    borderColor="purple.500"
                    color="white"
                    _hover={{
                      bg: "rgba(147, 51, 234, 0.1)",
                      borderColor: "purple.400"
                    }}
                    whileHover={{
                      scale: 1.02,
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HStack spacing={2}>
                      <Play size={18} />
                      <Text>Ver Demo</Text>
                    </HStack>
                  </MotionButton>
                </HStack>
              </MotionBox>

              {/* Estadísticas */}
              <MotionBox variants={itemVariants} w="full">
                <HStack spacing={8} justify={{ base: 'center', lg: 'flex-start' }} wrap="wrap">
                  <VStack spacing={1}>
                    <Text fontSize="2xl" fontWeight="bold" color="white">99.7%</Text>
                    <Text fontSize="sm" color="purple.300">Precisión</Text>
                  </VStack>
                  <Divider orientation="vertical" h="40px" borderColor="purple.500" />
                  <VStack spacing={1}>
                    <Text fontSize="2xl" fontWeight="bold" color="white">&lt;5s</Text>
                    <Text fontSize="sm" color="purple.300">Análisis</Text>
                  </VStack>
                  <Divider orientation="vertical" h="40px" borderColor="purple.500" />
                  <VStack spacing={1}>
                    <Text fontSize="2xl" fontWeight="bold" color="white">24/7</Text>
                    <Text fontSize="sm" color="purple.300">Disponible</Text>
                  </VStack>
                </HStack>
              </MotionBox>
            </VStack>
          </MotionBox>

          {/* Columna Derecha - Visualización */}
          <MotionFlex
            flex={1}
            justify="center"
            align="center"
            position="relative"
            variants={itemVariants}
          >
            <MotionBox
              position="relative"
              height={{ base: '400px', md: '500px', lg: '600px' }}
              width="full"
              maxW="500px"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Contenedor Principal de la Imagen */}
              <MotionBox
                position="relative"
                height="100%"
                width="100%"
                overflow="hidden"
                borderRadius="3xl"
                border="2px solid"
                borderColor="rgba(147, 51, 234, 0.3)"
                boxShadow="0 25px 50px rgba(16, 16, 23, 0.8), 0 0 0 1px rgba(147, 51, 234, 0.1)"
                bg="linear-gradient(135deg, rgba(16, 16, 23, 0.8), rgba(44, 23, 82, 0.6))"
                backdropFilter="blur(20px)"
                whileHover={{
                  boxShadow: "0 30px 60px rgba(147, 51, 234, 0.3), 0 0 0 1px rgba(147, 51, 234, 0.2)"
                }}
              >
                <Box
                  backgroundImage="url('https://images.pexels.com/photos/1553652/pexels-photo-1553652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')"
                  backgroundSize="cover"
                  backgroundPosition="center"
                  height="100%"
                  width="100%"
                  position="relative"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(16, 16, 23, 0.7))',
                  }}
                />

                {/* Overlay de Análisis */}
                <AnimatePresence mode="wait">
                  <MotionBox
                    key={currentFeature}
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    p={6}
                    bg="linear-gradient(135deg, rgba(16, 16, 23, 0.95), rgba(44, 23, 82, 0.9))"
                    backdropFilter="blur(20px)"
                    borderTop="1px solid"
                    borderColor="rgba(147, 51, 234, 0.3)"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <VStack spacing={4} align="start">
                      <HStack spacing={3}>
                        <Box color={features[currentFeature].color}>
                          {features[currentFeature].icon}
                        </Box>
                        <Text color="white" fontSize="lg" fontWeight="bold">
                          IA Analizando: {features[currentFeature].text}
                        </Text>
                        <Box
                          as={motion.div}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Zap size={16} color="#9333ea" />
                        </Box>
                      </HStack>

                      <Progress
                        value={progress}
                        size="sm"
                        colorScheme="purple"
                        bg="rgba(255, 255, 255, 0.1)"
                        borderRadius="full"
                        w="full"
                      />

                      <HStack spacing={4} w="full" justify="space-between">
                        <VStack spacing={1} align="start">
                          <Text color="purple.300" fontSize="xs" fontWeight="semibold">
                            CONFIANZA
                          </Text>
                          <Text color="white" fontSize="sm" fontWeight="bold">
                            97.3%
                          </Text>
                        </VStack>

                        <VStack spacing={1} align="center">
                          <Text color="purple.300" fontSize="xs" fontWeight="semibold">
                            ELEMENTOS DETECTADOS
                          </Text>
                          <Text color="white" fontSize="sm" fontWeight="bold">
                            {23 + currentFeature * 7}
                          </Text>
                        </VStack>

                        <VStack spacing={1} align="end">
                          <Text color="purple.300" fontSize="xs" fontWeight="semibold">
                            TIEMPO
                          </Text>
                          <Text color="white" fontSize="sm" fontWeight="bold">
                            2.1s
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </MotionBox>
                </AnimatePresence>

                {/* Puntos de Detección Animados */}
                <MotionBox
                  position="absolute"
                  top="30%"
                  left="25%"
                  w="8px"
                  h="8px"
                  bg="purple.400"
                  borderRadius="50%"
                  boxShadow="0 0 20px rgba(147, 51, 234, 0.8)"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0
                  }}
                />

                <MotionBox
                  position="absolute"
                  top="60%"
                  right="30%"
                  w="6px"
                  h="6px"
                  bg="purple.300"
                  borderRadius="50%"
                  boxShadow="0 0 15px rgba(124, 58, 237, 0.8)"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />

                <MotionBox
                  position="absolute"
                  top="45%"
                  left="70%"
                  w="10px"
                  h="10px"
                  bg="purple.500"
                  borderRadius="50%"
                  boxShadow="0 0 25px rgba(147, 51, 234, 0.9)"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: 1
                  }}
                />
              </MotionBox>

              {/* Elementos Flotantes Decorativos */}
              <MotionBox
                position="absolute"
                top="-20px"
                right="-20px"
                p={4}
                bg="linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(124, 58, 237, 0.1))"
                borderRadius="xl"
                border="1px solid"
                borderColor="rgba(147, 51, 234, 0.3)"
                backdropFilter="blur(10px)"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Star size={24} color="#9333ea" />
              </MotionBox>

              <MotionBox
                position="absolute"
                bottom="-15px"
                left="-15px"
                p={3}
                bg="linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(147, 51, 234, 0.1))"
                borderRadius="lg"
                border="1px solid"
                borderColor="rgba(99, 102, 241, 0.3)"
                backdropFilter="blur(10px)"
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <CheckCircle size={20} color="#6366f1" />
              </MotionBox>
            </MotionBox>
          </MotionFlex>
        </MotionFlex>
      </Container>
    </Box>
  );
};

export default Hero;