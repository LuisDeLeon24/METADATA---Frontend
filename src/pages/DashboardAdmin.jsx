import { Box, Flex, Heading, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import ReportesSection from '../components/DashboarAdminPage/ReportesSection';
import CasesSection from '../components/DashboarAdminPage/CasesSection';
import LogsSection from '../components/DashboarAdminPage/LogsSection';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const DashboardAdmin = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -2,
      boxShadow: "0 20px 40px rgba(139, 69, 19, 0.15)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Box
      height="100vh"
      bg="linear-gradient(135deg, #1a1a1a 0%, #2d1b3d 50%, #1a1a1a 100%)"
      position="relative"
      overflow="hidden"
      pt={8}
    >
      {/* Efectos de fondo decorativos */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity={0.05}
        background="radial-gradient(circle at 20% 50%, #8b4590 0%, transparent 50%), radial-gradient(circle at 80% 20%, #663399 0%, transparent 50%)"
        pointerEvents="none"
      />

      <Navbar />

      <MotionFlex
        height="calc(100vh - 60px)"
        mt="60px"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        gap={6}
        p={6}
      >
        {/* Panel izquierdo */}
        <MotionBox
          flex="3"
          variants={cardVariants}
        >
          <Flex direction="column" gap={6} height="100%">
            {/* Sección de Reportes */}
            <MotionBox
              flex="1"
              p={6}
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(10px)"
              borderRadius="20px"
              border="1px solid rgba(139, 69, 144, 0.2)"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
              position="relative"
              overflow="hidden"
              variants={cardVariants}
              whileHover="hover"
              {...hoverVariants}
            >
              {/* Brillo sutil en el borde superior */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                height="1px"
                bg="linear-gradient(90deg, transparent, #8b4590, transparent)"
              />

              <Heading
                size="lg"
                mb={4}
                color="white"
                fontWeight="600"
                letterSpacing="tight"
                position="relative"
              >
                <Box
                  as="span"
                  bgGradient="linear(to-r, #ffffff, #e2b5e8)"
                  bgClip="text"
                >
                  Reportes Recientes
                </Box>
                <Box
                  position="absolute"
                  bottom="-8px"
                  left="0"
                  width="60px"
                  height="2px"
                  bg="linear-gradient(90deg, #8b4590, #663399)"
                  borderRadius="full"
                />
              </Heading>
              <ReportesSection />
            </MotionBox>

            {/* Sección de Casos */}
            <MotionBox
              flex="1"
              p={6}
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(10px)"
              borderRadius="20px"
              border="1px solid rgba(139, 69, 144, 0.2)"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
              position="relative"
              overflow="hidden"
              variants={cardVariants}
              whileHover="hover"
              {...hoverVariants}
            >
              {/* Brillo sutil en el borde superior */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                height="1px"
                bg="linear-gradient(90deg, transparent, #8b4590, transparent)"
              />

              <Heading
                size="lg"
                mb={4}
                color="white"
                fontWeight="600"
                letterSpacing="tight"
                position="relative"
              >
                <Box
                  as="span"
                  bgGradient="linear(to-r, #ffffff, #e2b5e8)"
                  bgClip="text"
                >
                  Casos Recientes
                </Box>
                <Box
                  position="absolute"
                  bottom="-8px"
                  left="0"
                  width="60px"
                  height="2px"
                  bg="linear-gradient(90deg, #8b4590, #663399)"
                  borderRadius="full"
                />
              </Heading>
              <CasesSection />
            </MotionBox>
          </Flex>
        </MotionBox>

        {/* Panel derecho: Logs */}
        <MotionBox
          flex="1"
          p={6}
          bg="rgba(0, 0, 0, 0.4)"
          backdropFilter="blur(15px)"
          borderRadius="20px"
          border="1px solid rgba(139, 69, 144, 0.3)"
          boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
          position="relative"
          overflow="hidden"
          variants={cardVariants}
          whileHover="hover"
          {...hoverVariants}
        >
          {/* Efecto de borde lateral izquierdo */}
          <Box
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            width="2px"
            bg="linear-gradient(180deg, #8b4590, #663399, #8b4590)"
            borderRadius="full"
          />

          {/* Patrón decorativo de fondo */}
          <Box
            position="absolute"
            top="20px"
            right="20px"
            width="100px"
            height="100px"
            opacity={0.1}
            background="radial-gradient(circle, #8b4590 1px, transparent 1px)"
            backgroundSize="20px 20px"
            pointerEvents="none"
          />

          <LogsSection />
        </MotionBox>
      </MotionFlex>
    </Box>
  );
};

export default DashboardAdmin;