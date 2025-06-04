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
    Divider,
    Button,
    Input,
    FormControl,
    Badge,
    Avatar,
    Flex,
    Image,
    Spacer
} from '@chakra-ui/react';
import { BrainCog } from 'lucide-react';
const ListHeader = ({ children }) => {
    return (
        <Box position="relative" mb={6}>
            <Text
                fontWeight="bold"
                fontSize="lg"
                mb={2}
                color="white"
                textTransform="uppercase"
                letterSpacing="wider"
            >
                {children}
            </Text>
            <Box
                width="50px"
                height="3px"
                bgGradient="linear(to-r, #667eea, #764ba2)"
                borderRadius="full"
                position="relative"
                _after={{
                    content: '""',
                    position: 'absolute',
                    right: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '6px',
                    height: '6px',
                    bg: '#764ba2',
                    borderRadius: 'full'
                }}
            />
        </Box>
    );
};

const Footer = () => {
    return (
        <Box
            bg="linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)"
            color="gray.300"
            position="relative"
            overflow="hidden"
        >
            {/* Decorative elements */}
            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                height="1px"
                bgGradient="linear(to-r, transparent, #667eea, #764ba2, transparent)"
            />

            <Box
                position="absolute"
                top="20px"
                right="20px"
                width="200px"
                height="200px"
                bgGradient="radial(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)"
                borderRadius="full"
                pointerEvents="none"
            />

            <Box
                position="absolute"
                bottom="20px"
                left="20px"
                width="150px"
                height="150px"
                bgGradient="radial(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)"
                borderRadius="full"
                pointerEvents="none"
            />

            <Container as={Stack} maxW="container.xl" py={20} position="relative">
                <SimpleGrid
                    templateColumns={{ sm: '1fr', md: '2fr 1fr 1fr 1fr' }}
                    spacing={12}
                    mb={12}
                >
                    {/* Company Info - Mejorada */}
                    <Stack spacing={8}>
                        <HStack spacing={4}>
                            <Box
                                position="relative"
                            >
                                <Box
                                    w={14}
                                    h={14}
                                    bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                    borderRadius="2xl"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    boxShadow="0 15px 35px rgba(102, 126, 234, 0.4)"
                                    position="relative"
                                    _before={{
                                        content: '""',
                                        position: 'absolute',
                                        top: '-3px',
                                        left: '-3px',
                                        right: '-3px',
                                        bottom: '-3px',
                                        background: 'linear-gradient(45deg, #667eea, #764ba2, #667eea)',
                                        borderRadius: '2xl',
                                        zIndex: -1,
                                        backgroundSize: '200% 200%',
                                        animation: 'gradient 4s ease infinite'
                                    }}
                                >
                                    <BrainCog size={24} />

                                </Box>
                                <Badge
                                    position="absolute"
                                    top="-2"
                                    right="-2"
                                    bg="green.400"
                                    color="white"
                                    fontSize="10px"
                                    px="2"
                                    borderRadius="full"
                                    fontWeight="bold"
                                >
                                    AI
                                </Badge>
                            </Box>

                            <VStack align="flex-start" spacing={0}>
                                <Text
                                    fontWeight="black"
                                    fontSize="2xl"
                                    color="white"
                                    bgGradient="linear(to-r, #667eea, #764ba2, #f093fb)"
                                    bgClip="text"
                                    letterSpacing="tight"
                                >
                                    MetaData
                                </Text>
                                <Text
                                    fontSize="sm"
                                    color="gray.400"
                                    fontWeight="medium"
                                    letterSpacing="wider"
                                    textTransform="uppercase"
                                >
                                    Inteligencia Artificial Avanzada
                                </Text>
                            </VStack>
                        </HStack>

                        <Text fontSize="md" lineHeight="1.8" color="gray.400" maxW="400px">
                            Revolucionando las investigaciones criminales con tecnología de vanguardia en análisis de imágenes y procesamiento inteligente de evidencias.
                        </Text>

                        <VStack align="flex-start" spacing={4} mt={6}>
                            <ContactItem
                                icon="📍"
                                text="MIXCO"
                                color="#667eea"
                            />
                            <ContactItem
                                icon="📞"
                                text="+502 4711 7893"
                                color="#764ba2"
                            />
                            <ContactItem
                                icon="✉️"
                                text="Jajcu-2023378@kinal.edu.gt"
                                color="#667eea"
                            />
                        </VStack>
                    </Stack>

                    <Stack align="flex-start">
                        <ListHeader>Desarrolladores</ListHeader>
                        <FooterLink>Lisandro Jimenez</FooterLink>
                        <FooterLink>Y los demas cerotes</FooterLink>

                    </Stack>


                    <Stack align="flex-start">
                        <ListHeader>Mantente Conectado</ListHeader>
                        <Text mb={4} fontSize="sm" color="gray.400">
                            Recibe las últimas actualizaciones, características y noticias directamente en tu email.
                        </Text>

                        <FormControl>
                            <Input
                                placeholder="tu@email.com"
                                bg="rgba(45, 55, 72, 0.6)"
                                border="2px solid"
                                borderColor="rgba(102, 126, 234, 0.3)"
                                color="white"
                                borderRadius="xl"
                                py={6}
                                fontSize="md"
                                _placeholder={{ color: 'gray.500' }}
                                _hover={{
                                    borderColor: 'rgba(102, 126, 234, 0.6)',
                                    bg: 'rgba(45, 55, 72, 0.8)'
                                }}
                                _focus={{
                                    borderColor: '#667eea',
                                    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                                    bg: 'rgba(45, 55, 72, 0.9)'
                                }}
                                transition="all 0.3s ease"
                            />
                            <Button
                                mt={4}
                                w="full"
                                size="lg"
                                bgGradient="linear(to-r, #667eea, #764ba2)"
                                color="white"
                                fontWeight="bold"
                                borderRadius="xl"
                                py={6}
                                _hover={{
                                    bgGradient: "linear(to-r, #764ba2, #667eea)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 10px 25px rgba(102, 126, 234, 0.4)"
                                }}
                                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                            >
                                Suscribirse 🚀
                            </Button>
                        </FormControl>

                        <Box mt={6} p={4} bg="rgba(102, 126, 234, 0.1)" borderRadius="xl" border="1px solid" borderColor="rgba(102, 126, 234, 0.2)">
                            <Text fontSize="xs" color="gray.400">
                                ✨ Únete a más de 10,000 profesionales que confían en nosotros
                            </Text>
                        </Box>
                    </Stack>
                </SimpleGrid>


            </Container>

            <Box bg="rgba(0, 0, 0, 0.3)" borderTop="1px solid" borderColor="rgba(102, 126, 234, 0.2)">
                <Container maxW="container.xl" py={8}>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        spacing={{ base: 6, md: 8 }}
                        justify="space-between"
                        align="center"
                    >
                        <Text fontSize="sm" color="gray.400">
                            © {new Date().getFullYear()} MetaData. Todos los derechos reservados.
                        </Text>
                        <HStack spacing={8} fontSize="sm">
                            <FooterLink>Política de Privacidad</FooterLink>
                            <FooterLink>Términos de Servicio</FooterLink>
                            <FooterLink>Cookies</FooterLink>
                        </HStack>
                    </Stack>
                </Container>
            </Box>

            <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </Box>
    );
};

const ContactItem = ({ icon, text, color }) => (
    <HStack spacing={3} align="center">
        <Box
            w={10}
            h={10}
            bg={`${color}20`}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid"
            borderColor={`${color}40`}
        >
            <Text fontSize="lg">{icon}</Text>
        </Box>
        <Text fontSize="sm" color="gray.400">
            {text}
        </Text>
    </HStack>
);

const SocialButton = ({ icon, label }) => (
    <Button
        size="lg"
        variant="ghost"
        w={12}
        h={12}
        bg="rgba(45, 55, 72, 0.6)"
        color="gray.400"
        borderRadius="xl"
        border="1px solid"
        borderColor="rgba(102, 126, 234, 0.2)"
        _hover={{
            transform: 'translateY(-3px)',
            color: 'white',
            bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderColor: 'transparent',
            boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
        }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        aria-label={label}
    >
        <Text fontSize="xl">{icon}</Text>
    </Button>
);

const FooterLink = ({ children }) => (
    <Link
        href="#"
        color="gray.400"
        fontSize="sm"
        fontWeight="medium"
        _hover={{
            color: 'white',
            textDecoration: 'none',
            transform: 'translateX(8px)',
            _before: {
                opacity: 1,
                transform: 'translateX(0)'
            }
        }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        display="inline-block"
        position="relative"
        _before={{
            content: '"→"',
            position: 'absolute',
            left: '-20px',
            opacity: 0,
            transform: 'translateX(-10px)',
            transition: 'all 0.3s ease',
            color: '#667eea'
        }}
        py={1}
    >
        {children}
    </Link>
);

const StatItem = ({ number, label }) => (
    <VStack spacing={2} align="center">
        <Text
            fontSize="2xl"
            fontWeight="black"
            bgGradient="linear(to-r, #667eea, #764ba2)"
            bgClip="text"
        >
            {number}
        </Text>
        <Text fontSize="sm" color="gray.400" textAlign="center">
            {label}
        </Text>
    </VStack>
);

export default Footer;