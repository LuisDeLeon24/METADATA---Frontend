import React from 'react';
import { Box, Container, Heading, Text, Button, Stack, Flex, useColorModeValue } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { BrainCog } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Box 
      as="section" 
      position="relative" 
      minH="100vh" 
      display="flex" 
      alignItems="center"
      overflow="hidden"
    >
      <ParticleBackground />
      
      <Container maxW="container.xl" position="relative" zIndex="2">
        <Stack
          ref={ref}
          spacing={8}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'center', lg: 'flex-start' }}
          textAlign={{ base: 'center', lg: 'left' }}
          opacity={inView ? 1 : 0}
          transform={inView ? 'translateY(0)' : 'translateY(20px)'}
          transition="all 0.6s ease-out"
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Box>
              <Flex 
                mb={6} 
                align="center" 
                justify={{ base: 'center', lg: 'flex-start' }}
              >
                <Box 
                  mr={3} 
                  p={2} 
                  borderRadius="full" 
                  bg="brand.500" 
                  color="white"
                >
                  <BrainCog size={32} />
                </Box>
                <Text 
                  fontSize="2xl" 
                  fontWeight="bold" 
                  bgGradient="linear(to-r, brand.400, accent.400)" 
                  bgClip="text"
                >
                  MetaData
                </Text>
              </Flex>
              
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              >
                <Text
                  as="span"
                  position="relative"
                  bgGradient="linear(to-r, brand.400, accent.400)"
                  bgClip="text"
                >
                  Análisis de imágenes avanzado
                </Text>
                <br />
                <Text as="span" color="white">
                  para Criminología
                </Text>
              </Heading>
              
              <Text
                color="gray.300"
                maxW={{ lg: '80%' }}
                fontSize={{ base: 'md', lg: 'lg' }}
                mt={6}
              >
                Nuestra innovadora plataforma de IA revoluciona la investigación criminal al analizar imágenes con una precisión sin precedentes. Sube fotografías de la escena del crimen y recibe análisis detallados, reconocimiento de patrones e identificación de evidencia en segundos.
              </Text>
            </Box>
            
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
              justify={{ base: 'center', lg: 'flex-start' }}
            >
              <Button
                rounded="full"
                size="lg"
                fontWeight="bold"
                px={6}
                variant="primary"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.3s ease"
              >
                Explore Platform
              </Button>
              <Button
                rounded="full"
                size="lg"
                fontWeight="normal"
                px={6}
                variant="outline"
                _hover={{ transform: 'translateY(-2px)' }}
                transition="all 0.3s ease"
              >
                Learn More
              </Button>
            </Stack>
          </Stack>
          
          <Flex
            flex={1}
            justify="center"
            align="center"
            position="relative"
            opacity={inView ? 1 : 0}
            transform={inView ? 'translateX(0)' : 'translateX(50px)'}
            transition="all 0.8s ease-out 0.2s"
          >
            <Box
              position="relative"
              height={{ base: '300px', md: '400px', lg: '500px' }}
              width="full"
              overflow="hidden"
              borderRadius="xl"
              boxShadow="2xl"
              border="1px solid"
              borderColor="accent.800"
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
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(18, 22, 33, 0.9))',
                }}
              />
              
              <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                p={6}
                bg="rgba(18, 22, 33, 0.8)"
                backdropFilter="blur(8px)"
                borderTop="1px solid"
                borderColor="accent.800"
              >
                <Text color="white" fontSize="sm" fontWeight="medium">
                  AI Analyzing: Identifying objects, patterns, and anomalies...
                </Text>
                
                <Box
                  mt={2}
                  height="4px"
                  width="100%"
                  bg="gray.700"
                  borderRadius="full"
                  overflow="hidden"
                >
                  <Box
                    height="100%"
                    width="70%"
                    bg="brand.500"
                    borderRadius="full"
                    animation="pulse 1.5s infinite"
                    sx={{
                      '@keyframes pulse': {
                        '0%': { opacity: 1 },
                        '50%': { opacity: 0.7 },
                        '100%': { opacity: 1 },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;