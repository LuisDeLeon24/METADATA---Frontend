import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Flex,
  Icon,
  VStack,
  Badge,
  useBreakpointValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Eye,
  Shield,
  Clock,
  FileSearch,
  Users,
  Database,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionFlex = motion(Flex);

const FeatureCard = ({ icon, title, description, index, isInView }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <MotionVStack
      bg="linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
      p={8}
      borderRadius="2xl"
      border="1px solid"
      borderColor="rgba(147, 51, 234, 0.2)"
      align="flex-start"
      position="relative"
      overflow="hidden"
      height="100%"
      cursor="pointer"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        scale: 1
      } : {
        opacity: 0,
        y: 40,
        scale: 0.95
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        y: -12,
        scale: 1.02,
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
        zIndex: 0,
      }}
      _hover={{
        borderColor: 'rgba(147, 51, 234, 0.4)',
        boxShadow: '0 25px 50px rgba(147, 51, 234, 0.15)',
        _before: {
          opacity: 1,
        }
      }}
    >
      {/* Decoración superior */}
      <Box
        position="absolute"
        top={0}
        left="0"
        right="0"
        height="3px"
        bg="linear-gradient(90deg, transparent, #a855f7, transparent)"
        opacity={0.8}
      />

      {/* Patrón de fondo sutil */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage="radial-gradient(circle at 20px 20px, rgba(255,255,255,0.02) 1px, transparent 0)"
        backgroundSize="40px 40px"
        opacity={0.5}
        zIndex={0}
      />

      {/* Contenido */}
      <Box position="relative" zIndex={1} width="100%">
        {/* Ícono con efecto de resplandor */}
        <MotionFlex
          w={16}
          h={16}
          align="center"
          justify="center"
          borderRadius="xl"
          bg="linear-gradient(135deg, #7c3aed, #a855f7)"
          mb={6}
          boxShadow="0 8px 25px rgba(147, 51, 234, 0.4)"
          position="relative"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          _after={{
            content: '""',
            position: 'absolute',
            top: '-3px',
            left: '-3px',
            right: '-3px',
            bottom: '-3px',
            borderRadius: 'xl',
            background: 'linear-gradient(45deg, #9333ea, #a855f7, #c084fc)',
            zIndex: -1,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
          _hover={{
            _after: {
              opacity: 0.6,
            }
          }}
        >
          <Icon as={icon} color="white" boxSize={7} />
        </MotionFlex>

        {/* Título con gradiente */}
        <Heading
          as="h3"
          size="lg"
          mb={4}
          bgGradient="linear(to-r, #f8fafc, #e2e8f0)"
          bgClip="text"
          fontWeight="700"
          lineHeight="1.2"
        >
          {title}
        </Heading>

        {/* Descripción */}
        <Text
          color="rgba(226, 232, 240, 0.7)"
          lineHeight="1.7"
          fontSize="sm"
          mb={4}
        >
          {description}
        </Text>

        {/* Indicador de acción */}
        <Flex
          align="center"
          mt="auto"
          color="rgba(168, 85, 247, 0.7)"
          fontSize="sm"
          fontWeight="600"
          opacity={0}
          transform="translateX(-10px)"
          transition="all 0.3s ease"
          _groupHover={{
            opacity: 1,
            transform: "translateX(0)"
          }}
        >
          <Text mr={2}>Explorar</Text>
          <Icon as={ArrowRight} boxSize={4} />
        </Flex>
      </Box>

      {/* Efecto de partícula flotante */}
      <Box
        position="absolute"
        top="20px"
        right="20px"
        width="4px"
        height="4px"
        bg="rgba(168, 85, 247, 0.6)"
        borderRadius="full"
        opacity={0}
        animation="float 3s ease-in-out infinite"
        _hover={{
          opacity: 1,
        }}
        sx={{
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0px)',
            },
            '50%': {
              transform: 'translateY(-10px)',
            },
          },
        }}
      />
    </MotionVStack>
  );
};

const FloatingElement = ({ delay = 0 }) => (
  <MotionBox
    position="absolute"
    width="6px"
    height="6px"
    bg="rgba(168, 85, 247, 0.3)"
    borderRadius="full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [0, -30, -60],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
  />
);

const Features = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: Eye,
      title: 'Reconocimiento de Patrones Avanzado',
      description: 'Identifica patrones invisibles al ojo humano usando algoritmos de deep learning especializados en análisis forense.',
    },
    {
      icon: Shield,
      title: 'Seguridad de Grado Militar',
      description: 'Encriptación end-to-end y protocolos de seguridad que garantizan la confidencialidad absoluta de evidencias sensibles.',
    },
    {
      icon: Clock,
      title: 'Análisis en Tiempo Real',
      description: 'Procesamiento instantáneo que transforma horas de análisis manual en segundos de precisión automatizada.',
    },
    {
      icon: FileSearch,
      title: 'Informes Forenses Completos',
      description: 'Documentación detallada con metadatos, cadena de custodia y validación estadística para uso legal.',
    },
    {
      icon: Users,
      title: 'Colaboración Multiusuario',
      description: 'Workspace colaborativo con permisos granulares, chat integrado y seguimiento de cambios en tiempo real.',
    },
    {
      icon: Database,
      title: 'Base de Datos Criminológica',
      description: 'Conexión con bases de datos históricas para identificar patrones recurrentes y vínculos entre casos.',
    },
  ];

  return (
    <Box
      as="section"
      py={24}
      bg="radial-gradient(ellipse at top, #0f0f23 0%, #050507 70%)"
      position="relative"
      overflow="hidden"
    >
      {/* Efectos de fondo animados */}
      <Box
        position="absolute"
        top="20%"
        left="5%"
        width="400px"
        height="400px"
        bg="radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)"
        borderRadius="full"
        filter="blur(60px)"
        animation="pulse 8s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="10%"
        right="10%"
        width="300px"
        height="300px"
        bg="radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, transparent 70%)"
        borderRadius="full"
        filter="blur(40px)"
        animation="pulse 6s ease-in-out infinite reverse"
      />

      {/* Elementos flotantes */}
      <FloatingElement delay={0} />
      <FloatingElement delay={2} />
      <FloatingElement delay={4} />

      <Container maxW="container.xl" ref={ref} position="relative" zIndex={2}>
        <MotionVStack
          spacing={8}
          mb={20}
          textAlign="center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge superior */}
          <Badge
            bg="linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(168, 85, 247, 0.2))"
            color="white"
            px={6}
            py={3}
            borderRadius="full"
            border="1px solid rgba(147, 51, 234, 0.3)"
            fontSize="sm"
            fontWeight="600"
            letterSpacing="wide"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon as={Sparkles} boxSize={4} />
            CARACTERÍSTICAS PREMIUM
          </Badge>

          {/* Título principal */}
          <Heading
            as="h2"
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            fontWeight="800"
            lineHeight="1"
            bgGradient="linear(to-r, #f8fafc, #a855f7, #f8fafc)"
            bgClip="text"
            letterSpacing="tight"
            textAlign="center"
          >
            Tecnología
            <Text
              as="span"
              display="block"
              bgGradient="linear(to-r, #9333ea, #c084fc)"
              bgClip="text"
            >
              de Vanguardia
            </Text>
          </Heading>

          {/* Subtítulo */}
          <Text
            color="rgba(226, 232, 240, 0.7)"
            fontSize={{ base: 'lg', md: 'xl' }}
            maxW="700px"
            lineHeight="1.8"
            fontWeight="400"
          >
            Potencia tu investigación con herramientas de IA forense que combinan
            precisión científica con velocidad de procesamiento industrial.
          </Text>

          {/* Línea decorativa */}
          <Box
            width="120px"
            height="4px"
            bg="linear-gradient(90deg, transparent, #a855f7, transparent)"
            borderRadius="full"
            mt={4}
          />
        </MotionVStack>

        {/* Grid de características */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
          sx={{
            '& > div': {
              role: 'group'
            }
          }}
        >
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

        {/* Sección inferior con estadísticas */}
        <MotionFlex
          mt={20}
          justify="center"
          align="center"
          flexWrap="wrap"
          gap={12}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          {[
            { number: "99.8%", label: "Precisión" },
            { number: "< 30s", label: "Tiempo Análisis" },
            { number: "24/7", label: "Disponibilidad" },
            { number: "1M+", label: "Imágenes Procesadas" }
          ].map((stat, index) => (
            <VStack
              key={index}
              spacing={2}
              textAlign="center"
              opacity={0.8}
              _hover={{ opacity: 1 }}
              transition="opacity 0.3s ease"
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                bgGradient="linear(to-r, #a855f7, #c084fc)"
                bgClip="text"
              >
                {stat.number}
              </Text>
              <Text
                fontSize="sm"
                color="rgba(226, 232, 240, 0.6)"
                fontWeight="500"
              >
                {stat.label}
              </Text>
            </VStack>
          ))}
        </MotionFlex>
      </Container>

      {/* Animación CSS personalizada */}
      <style jsx>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.4;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.1);
                    }
                }
            `}</style>
    </Box>
  );
};

export default Features;