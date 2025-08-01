import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Button, Text, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAnalyzeSocialUser } from '../shared/hooks'; 
import Footer from '../components/LandingPage/Footer';
import NavBar from '../components/common/NavBar';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const OsintPage = () => {
  const [username, setUsername] = useState('');
  const { analyze, data, loading, error } = useAnalyzeSocialUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const hoverVariants = {
    hover: {
      y: -2,
      boxShadow: '0 20px 40px rgba(139, 69, 19, 0.15)',
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      analyze(username.trim());
    }
  };

  return (
    <>
      <NavBar />
      <Box
        minHeight="100vh"
        bg="linear-gradient(135deg, #1a1a1a 0%, #2d1b3d 50%, #1a1a1a 100%)"
        pt={100}
        pb={10}
        px={4}
        position="relative"
        overflow="hidden"
      >
        {/* Fondo decorativo */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity={0.05}
          background="radial-gradient(circle at 20% 50%, #8b4590 0%, transparent 50%), radial-gradient(circle at 80% 20%, #663399 0%, transparent 50%)"
          pointerEvents="none"
          zIndex={0}
        />

        <Container maxW="container.md" position="relative" zIndex={1}>
          <Heading
            mb={6}
            color="white"
            fontWeight="700"
            letterSpacing="wide"
            textAlign="center"
            bgGradient="linear(to-r, #ffffff, #e2b5e8)"
            bgClip="text"
          >
            Analizar Usuario Social
          </Heading>

          <MotionFlex
            as="form"
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            gap={4}
            align="center"
            mb={6}
          >
            <MotionBox flex="1" variants={cardVariants}>
              <Input
                placeholder="Ingresa el username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="lg"
                bg="whiteAlpha.900"
                borderRadius="md"
                isDisabled={loading}
                autoFocus
                _placeholder={{ color: 'gray.500' }}
              />
            </MotionBox>
            <MotionBox variants={cardVariants}>
              <Button
                type="submit"
                size="lg"
                colorScheme="purple"
                isLoading={loading}
                loadingText="Analizando"
                disabled={!username.trim()}
                whileHover="hover"
                variants={hoverVariants}
                as={motion.button}
              >
                Analizar
              </Button>
            </MotionBox>
          </MotionFlex>

          {error && (
            <MotionBox
              bg="red.600"
              color="white"
              p={4}
              borderRadius="md"
              mb={6}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Text fontWeight="600">Error:</Text>
              <Text>{error}</Text>
            </MotionBox>
          )}

          {/* Aquí mostramos las cards con los resultados */}
          {data?.detected && data.detected.length > 0 && (
            <MotionBox
              bg="whiteAlpha.900"
              p={6}
              borderRadius="20px"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              maxHeight="400px"
              overflowY="auto"
            >
              <Heading size="md" mb={6} color="purple.700" fontWeight="700" textAlign="center">
                Resultado:
              </Heading>

              <Flex direction="column" gap={4}>
                {data.detected.map(({ link, text, type, country }, index) => (
                  <MotionBox
                    key={index}
                    p={4}
                    borderRadius="md"
                    bg="purple.50"
                    boxShadow="md"
                    whileHover={{ scale: 1.02, boxShadow: 'xl' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Text fontWeight="bold" mb={1} color="purple.700" isTruncated>
                      {text || 'Sin texto'}
                    </Text>
                    <Text fontSize="sm" color="gray.600" mb={1} noOfLines={1}>
                      <b>Tipo:</b> {type || 'Desconocido'}
                    </Text>
                    <Text fontSize="sm" color="gray.600" mb={2} noOfLines={1}>
                      <b>País:</b> {country || 'Desconocido'}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="blue.600"
                      _hover={{ textDecoration: 'underline' }}
                      cursor="pointer"
                      onClick={() => window.open(link, '_blank')}
                    >
                      {link}
                    </Text>
                  </MotionBox>
                ))}
              </Flex>
            </MotionBox>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default OsintPage;
