import React from 'react';
import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    VStack,
    HStack,
    Button,
    Input,
    FormControl,
    Badge,
    Flex,
    useColorModeValue
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { BrainCog, Mail, MapPin, Phone, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { useRef } from 'react';

const MotionBox = motion(Box);
const MotionStack = motion(Stack);
const MotionButton = motion(Button);
const MotionText = motion(Text);

// Variantes de animación
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            duration: 0.6
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const iconHoverVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
        scale: 1.1,
        rotate: 10,
        transition: { duration: 0.3 }
    }
};

const ListHeader = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <MotionBox
            ref={ref}
            position="relative"
            mb={8}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={itemVariants}
        >
            <Text
                fontWeight="900"
                fontSize="xl"
                mb={4}
                color="white"
                textTransform="uppercase"
                letterSpacing="wider"
                position="relative"
                _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #8B5CF6, #A855F7, #C084FC)',
                    borderRadius: 'full',
                }}
            >
                {children}
            </Text>
            <MotionBox
                position="absolute"
                bottom="-8px"
                left="65px"
                w="8px"
                h="8px"
                bg="purple.400"
                borderRadius="full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
            />
        </MotionBox>
    );
};

const Footer = () => {
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: "-100px" });

    return (
        <MotionBox
            ref={footerRef}
            bg="linear-gradient(180deg, #000000 0%, #1a0b2e 30%, #16213e 60%, #0f0f0f 100%)"
            color="gray.300"
            position="relative"
            overflow="hidden"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            {/* Elementos decorativos animados */}
            <MotionBox
                position="absolute"
                top="0"
                left="0"
                right="0"
                height="2px"
                background="linear-gradient(90deg, transparent, #8B5CF6, #A855F7, #C084FC, transparent)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Partículas flotantes */}
            {[...Array(6)].map((_, i) => (
                <MotionBox
                    key={i}
                    position="absolute"
                    width="4px"
                    height="4px"
                    bg="purple.400"
                    borderRadius="full"
                    opacity={0.6}
                    top={`${20 + i * 15}%`}
                    left={`${10 + i * 15}%`}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            <MotionBox
                position="absolute"
                top="10%"
                right="5%"
                width="300px"
                height="300px"
                background="radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)"
                borderRadius="full"
                pointerEvents="none"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <MotionBox
                position="absolute"
                bottom="10%"
                left="5%"
                width="250px"
                height="250px"
                background="radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)"
                borderRadius="full"
                pointerEvents="none"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <Container as={MotionStack} maxW="container.xl" py={20} position="relative">
                <SimpleGrid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                    spacing={12}
                    mb={16}
                >
                    {/* Company Info - Mejorada */}
                    <MotionStack
                        spacing={8}
                        variants={itemVariants}
                    >
                        <MotionBox
                            initial="rest"
                            whileHover="hover"
                            variants={iconHoverVariants}
                        >
                            <HStack spacing={4} align="center">
                                <Box position="relative">
                                    <MotionBox
                                        w={16}
                                        h={16}
                                        background="linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%)"
                                        borderRadius="2xl"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        boxShadow="0 20px 40px rgba(139, 92, 246, 0.4)"
                                        position="relative"
                                        _before={{
                                            content: '""',
                                            position: 'absolute',
                                            top: '-2px',
                                            left: '-2px',
                                            right: '-2px',
                                            bottom: '-2px',
                                            background: 'linear-gradient(45deg, #8B5CF6, #A855F7, #C084FC, #8B5CF6)',
                                            borderRadius: '2xl',
                                            zIndex: -1,
                                            backgroundSize: '400% 400%',
                                        }}
                                        animate={{
                                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <BrainCog size={28} color="white" />
                                    </MotionBox>

                                    <MotionBox
                                        as={Badge}
                                        position="absolute"
                                        top="-1"
                                        right="-1"
                                        bg="linear-gradient(45deg, #10B981, #059669)"
                                        color="white"
                                        fontSize="10px"
                                        px="3"
                                        py="1"
                                        borderRadius="full"
                                        fontWeight="bold"
                                        boxShadow="0 4px 12px rgba(16, 185, 129, 0.3)"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        AI
                                    </MotionBox>
                                </Box>

                                <VStack align="flex-start" spacing={1}>
                                    <MotionText
                                        fontWeight="black"
                                        fontSize="3xl"
                                        color="white"
                                        background="linear-gradient(45deg, #8B5CF6, #A855F7, #C084FC)"
                                        backgroundClip="text"
                                        letterSpacing="tight"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        MetaData
                                    </MotionText>
                                    <MotionText
                                        fontSize="sm"
                                        color="purple.300"
                                        fontWeight="semibold"
                                        letterSpacing="wider"
                                        textTransform="uppercase"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                    >
                                        Inteligencia Artificial
                                    </MotionText>
                                </VStack>
                            </HStack>
                        </MotionBox>

                        <MotionText
                            fontSize="md"
                            lineHeight="1.8"
                            color="gray.400"
                            maxW="350px"
                            variants={itemVariants}
                        >
                            Revolucionando las investigaciones criminales con tecnología de vanguardia en análisis de imágenes y procesamiento inteligente de evidencias.
                        </MotionText>

                        <MotionStack spacing={4} variants={itemVariants}>
                            <ContactItem
                                icon={<MapPin size={16} />}
                                text="MIXCO, Guatemala"
                                color="purple.400"
                            />
                            <ContactItem
                                icon={<Phone size={16} />}
                                text="+502 4711 7893"
                                color="purple.500"
                            />
                            <ContactItem
                                icon={<Mail size={16} />}
                                text="contact@metadata.gt"
                                color="purple.300"
                            />
                        </MotionStack>
                    </MotionStack>

                    {/* Enlaces rápidos */}
                    <MotionStack align="flex-start" variants={itemVariants}>
                        <ListHeader>Enlaces</ListHeader>
                        <VStack align="flex-start" spacing={3}>
                            <FooterLink href="#about">Acerca de</FooterLink>
                            <FooterLink href="#services">Servicios</FooterLink>
                            <FooterLink href="#technology">Tecnología</FooterLink>
                            <FooterLink href="#contact">Contacto</FooterLink>
                            <FooterLink href="#careers">Carreras</FooterLink>
                        </VStack>
                    </MotionStack>

                    {/* Newsletter */}
                    <MotionStack align="flex-start" variants={itemVariants}>
                        <ListHeader>Mantente Conectado</ListHeader>
                        <Text mb={6} fontSize="sm" color="gray.400" lineHeight="1.6">
                            Recibe las últimas actualizaciones sobre IA, nuevas características y noticias del sector.
                        </Text>

                        <FormControl>
                            <Input
                                placeholder="tu@email.com"
                                bg="rgba(0, 0, 0, 0.6)"
                                border="2px solid"
                                borderColor="rgba(139, 92, 246, 0.3)"
                                color="white"
                                borderRadius="xl"
                                py={6}
                                fontSize="md"
                                _placeholder={{ color: 'gray.500' }}
                                _hover={{
                                    borderColor: 'rgba(139, 92, 246, 0.6)',
                                    bg: 'rgba(0, 0, 0, 0.8)'
                                }}
                                _focus={{
                                    borderColor: 'purple.400',
                                    boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.1)',
                                    bg: 'rgba(0, 0, 0, 0.9)'
                                }}
                                transition="all 0.3s ease"
                            />
                            <MotionButton
                                as={motion.button}
                                mt={4}
                                w="full"
                                size="lg"
                                background="linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)"
                                color="white"
                                fontWeight="bold"
                                borderRadius="xl"
                                py={6}
                                rightIcon={<ArrowRight size={16} />}
                                whileHover={{
                                    background: "linear-gradient(135deg, #A855F7 0%, #C084FC 100%)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 15px 35px rgba(139, 92, 246, 0.4)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                            >
                                Suscribirse
                            </MotionButton>
                        </FormControl>

                        <MotionBox
                            mt={6}
                            p={4}
                            bg="rgba(139, 92, 246, 0.1)"
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="rgba(139, 92, 246, 0.2)"
                            backdropFilter="blur(10px)"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <Text fontSize="xs" color="purple.200" textAlign="center">
                                ✨ Únete a más de 15,000+ profesionales que confían en MetaData
                            </Text>
                        </MotionBox>

                        {/* Redes sociales */}
                        <HStack spacing={4} mt={6}>
                            <SocialButton icon={<Github size={20} />} label="GitHub" />
                            <SocialButton icon={<Twitter size={20} />} label="Twitter" />
                            <SocialButton icon={<Linkedin size={20} />} label="LinkedIn" />
                        </HStack>
                    </MotionStack>
                </SimpleGrid>
            </Container>

            {/* Footer bottom */}
            <MotionBox
                bg="rgba(0, 0, 0, 0.8)"
                borderTop="1px solid"
                borderColor="rgba(139, 92, 246, 0.2)"
                backdropFilter="blur(20px)"
                variants={itemVariants}
            >
                <Container maxW="container.xl" py={8}>
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        justify="space-between"
                        align="center"
                        gap={6}
                    >
                        <MotionText
                            fontSize="sm"
                            color="gray.500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            © {new Date().getFullYear()} MetaData AI. Todos los derechos reservados. Desarrollado con ❤️ en Guatemala.
                        </MotionText>
                        <HStack spacing={8} fontSize="sm">
                            <FooterLink href="#privacy">Política de Privacidad</FooterLink>
                            <FooterLink href="#terms">Términos de Servicio</FooterLink>
                            <FooterLink href="#cookies">Cookies</FooterLink>
                        </HStack>
                    </Flex>
                </Container>
            </MotionBox>
        </MotionBox>
    );
};

const ContactItem = ({ icon, text, color }) => (
    <MotionBox
        as={motion.div}
        whileHover={{ x: 5, scale: 1.02 }}
        transition={{ duration: 0.2 }}
    >
        <HStack spacing={4} align="center">
            <Box
                w={12}
                h={12}
                bg={`${color}20`}
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor={`${color}40`}
                backdropFilter="blur(10px)"
            >
                <Box color={color}>
                    {icon}
                </Box>
            </Box>
            <Text fontSize="sm" color="gray.300" fontWeight="medium">
                {text}
            </Text>
        </HStack>
    </MotionBox>
);

const DeveloperCard = ({ name, role, avatar }) => (
    <MotionBox
        as={motion.div}
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ duration: 0.2 }}
    >
        <HStack spacing={3} p={3} borderRadius="lg" bg="rgba(139, 92, 246, 0.05)" border="1px solid rgba(139, 92, 246, 0.1)">
            <Box
                w={10}
                h={10}
                borderRadius="full"
                bg={`url(${avatar})`}
                bgSize="cover"
                bgPosition="center"
                border="2px solid"
                borderColor="purple.400"
            />
            <VStack align="flex-start" spacing={0}>
                <Text fontSize="sm" fontWeight="bold" color="white">
                    {name}
                </Text>
                <Text fontSize="xs" color="purple.300">
                    {role}
                </Text>
            </VStack>
        </HStack>
    </MotionBox>
);

const SocialButton = ({ icon, label }) => (
    <MotionButton
        as={motion.button}
        size="md"
        variant="ghost"
        w={12}
        h={12}
        bg="rgba(0, 0, 0, 0.6)"
        color="gray.400"
        borderRadius="xl"
        border="1px solid"
        borderColor="rgba(139, 92, 246, 0.2)"
        whileHover={{
            transform: 'translateY(-3px)',
            color: 'white',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
            borderColor: 'transparent',
            boxShadow: '0 12px 28px rgba(139, 92, 246, 0.4)'
        }}
        whileTap={{ scale: 0.95 }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        aria-label={label}
    >
        {icon}
    </MotionButton>
);

const FooterLink = ({ children, href = "#" }) => (
    <MotionBox
        as={motion.div}
        whileHover={{ x: 8 }}
        transition={{ duration: 0.2 }}
    >
        <Link
            href={href}
            color="gray.400"
            fontSize="sm"
            fontWeight="medium"
            _hover={{
                color: 'purple.300',
                textDecoration: 'none',
            }}
            transition="all 0.3s ease"
            display="flex"
            alignItems="center"
            position="relative"
            py={2}
            _before={{
                content: '""',
                position: 'absolute',
                left: '-20px',
                width: '3px',
                height: '3px',
                bg: 'purple.400',
                borderRadius: 'full',
                opacity: 0,
                transition: 'opacity 0.3s ease'
            }}
            _hover_before={{
                opacity: 1
            }}
        >
            {children}
        </Link>
    </MotionBox>
);

export default Footer;