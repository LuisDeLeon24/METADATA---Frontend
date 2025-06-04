import React from 'react';
import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

const SeccionCTA = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <Box
            as="section"
            py={20}
            bg="dark.900"
            position="relative"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url("https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.1,
                zIndex: 1,
            }}
        >
            <Container maxW="container.xl" position="relative" zIndex="2">
                <VStack
                    ref={ref}
                    spacing={8}
                    textAlign="center"
                    maxW="container.md"
                    mx="auto"
                    px={6}
                    py={16}
                    borderRadius="xl"
                    bg="rgba(18, 22, 33, 0.8)"
                    backdropFilter="blur(10px)"
                    borderWidth="1px"
                    borderColor="accent.800"
                    boxShadow="xl"
                    opacity={inView ? 1 : 0}
                    transform={inView ? 'translateY(0)' : 'translateY(30px)'}
                    transition="all 0.6s ease"
                >
                    <Heading
                        as="h2"
                        fontSize={{ base: '2xl', md: '4xl' }}
                        lineHeight={1.2}
                        fontWeight="bold"
                    >
                        <Text
                            as="span"
                            bgGradient="linear(to-r, brand.400, accent.400)"
                            bgClip="text"
                        >
                            ¿Listo para transformar
                        </Text>
                        <br />
                        <Text as="span" color="white">
                            tus capacidades investigativas?
                        </Text>

                        <br />
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            color="gray.300"
                            maxW="container.sm"
                        >
                            Únete a cientos de agencias de seguridad, equipos forenses y profesionales que ya están utilizando nuestra plataforma para resolver casos más rápido.
                        </Text>

                    </Heading>



                    <Button
                        size="lg"
                        height="60px"
                        width={{ base: "full", md: "320px" }}
                        fontSize="xl"
                        fontWeight="bold"
                        rightIcon={<ArrowRight />}
                        variant="primary"
                        _hover={{
                            transform: 'translateY(-3px)',
                            boxShadow: 'xl',
                        }}
                        transition="all 0.3s ease"
                    >
                        PROBAR AHORA
                    </Button>

                    <Text fontSize="sm" color="gray.400">
                        No se requiere tarjeta. Prueba gratuita por 14 días.
                    </Text>
                </VStack>
            </Container>
        </Box>
    );
};

export default SeccionCTA;
