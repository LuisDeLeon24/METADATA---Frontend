import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  IconButton,
  HStack,
  Text,
  VStack,
  Flex,
  Avatar,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiEdit3,
  FiEye,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiFileText,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock
} from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionTr = motion(Tr);
const MotionTableContainer = motion(TableContainer);

const typeLabels = {
  HOMICIDE: "Homicidio",
  ASSAULT: "Asalto",
  TERRORISM: "Terrorismo",
  SCAM: "Estafa",
  VANDALISM: "Vandalismo",
  CYBERBULLYING: "Ciberacoso"
};

const stateLabels = {
  RECEIVED: "Recibido",
  IN_PROGRESS: "En Proceso",
  FINISHED: "Finalizado"
};

const priorityLabels = {
  HIGH: "Alta",
  MEDIUM: "Media",
  LOW: "Baja"
};

const typeIcons = {
  HOMICIDE: "🔍",
  ASSAULT: "⚡",
  TERRORISM: "🛡️",
  SCAM: "💳",
  VANDALISM: "🏗️",
  CYBERBULLYING: "💻"
};

const CasesList = ({ cases = [], handleEdit, handleView, tableBg }) => {
  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const getBadgeColor = (type, value) => {
    switch (type) {
      case 'state':
        return value === "RECEIVED" ? "gray" :
          value === "IN_PROGRESS" ? "orange" :
            value === "FINISHED" ? "green" : "gray";
      case 'priority':
        return value === "HIGH" ? "red" :
          value === "MEDIUM" ? "yellow" :
            value === "LOW" ? "green" : "gray";
      case 'type':
        return "purple";
      default:
        return "gray";
    }
  };

  const getStateIcon = (state) => {
    switch (state) {
      case "RECEIVED":
        return FiClock;
      case "IN_PROGRESS":
        return FiAlertTriangle;
      case "FINISHED":
        return FiCheckCircle;
      default:
        return FiClock;
    }
  };

  return (
    <MotionTableContainer
      bg="rgba(255, 255, 255, 0.03)"
      backdropFilter="blur(20px)"
      border="1px solid rgba(139, 92, 246, 0.2)"
      borderRadius="20px"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
      overflow="hidden"
      position="relative"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Borde superior con gradiente */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="2px"
        bgGradient="linear(90deg, #8B5CF6, #EC4899, #3B82F6)"
      />

      {/* Efecto de brillo sutil */}
      <Box
        position="absolute"
        top="20px"
        right="20px"
        w="100px"
        h="100px"
        opacity={0.05}
        background="radial-gradient(circle, #8b4590 1px, transparent 1px)"
        backgroundSize="20px 20px"
        pointerEvents="none"
      />

      <Table variant="simple" size="md">
        <Thead>
          <Tr bg="rgba(139, 92, 246, 0.1)">
            <Th
              color="rgba(255, 255, 255, 0.9)"
              fontWeight="700"
              letterSpacing="wide"
              textTransform="uppercase"
              fontSize="xs"
              py={4}
              borderBottom="1px solid rgba(139, 92, 246, 0.3)"
            >
              <HStack spacing={2}>
                <FiFileText size={14} />
                <Text>Caso</Text>
              </HStack>
            </Th>
            <Th
              color="rgba(255, 255, 255, 0.9)"
              fontWeight="700"
              letterSpacing="wide"
              textTransform="uppercase"
              fontSize="xs"
              py={4}
              borderBottom="1px solid rgba(139, 92, 246, 0.3)"
            >
              Tipo
            </Th>
            <Th
              color="rgba(255, 255, 255, 0.9)"
              fontWeight="700"
              letterSpacing="wide"
              textTransform="uppercase"
              fontSize="xs"
              py={4}
              borderBottom="1px solid rgba(139, 92, 246, 0.3)"
            >
              <HStack spacing={2}>
                <FiCalendar size={14} />
                <Text>Fecha</Text>
              </HStack>
            </Th>
            <Th
              color="rgba(255, 255, 255, 0.9)"
              fontWeight="700"
              letterSpacing="wide"
              textTransform="uppercase"
              fontSize="xs"
              py={4}
              borderBottom="1px solid rgba(139, 92, 246, 0.3)"
            >
              Estado
            </Th>
            <Th
              color="rgba(255, 255, 255, 0.9)"
              fontWeight="700"
              letterSpacing="wide"
              textTransform="uppercase"
              fontSize="xs"
              py={4}
              borderBottom="1px solid rgba(139, 92, 246, 0.3)"
            >
              <HStack spacing={2}>
                <FiMapPin size={14} />
                <Text>Ubicación</Text>
              </HStack>
            </Th>
            <Th
              color="rgba(255, 255, 255, 0.9)"
              fontWeight="700"
              letterSpacing="wide"
              textTransform="uppercase"
              fontSize="xs"
              py={4}
              borderBottom="1px solid rgba(139, 92, 246, 0.3)"
            >
              Prioridad
            </Th>
            <Th
              color="rgba(255, 255, 255, 0.9)"
              fontWeight="700"
              letterSpacing="wide"
              textTransform="uppercase"
              fontSize="xs"
              py={4}
              borderBottom="1px solid rgba(139, 92, 246, 0.3)"
            >
              <HStack spacing={2}>
                <FiUser size={14} />
                <Text>Investigador</Text>
              </HStack>
            </Th>
            <Th
              color="rgba(255, 255, 255, 0.9)"
              fontWeight="700"
              letterSpacing="wide"
              textTransform="uppercase"
              fontSize="xs"
              py={4}
              borderBottom="1px solid rgba(139, 92, 246, 0.3)"
            >
              Acciones
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <AnimatePresence>
            {cases.map((c, index) => (
              <MotionTr
                key={c._id}
                variants={rowVariants}
                whileHover="hover"
                bg="rgba(255, 255, 255, 0.02)"
                _hover={{
                  bg: "rgba(139, 92, 246, 0.08)",
                  boxShadow: "inset 0 0 0 1px rgba(139, 92, 246, 0.3)"
                }}
                transition="all 0.3s ease"
                borderBottom="1px solid rgba(139, 92, 246, 0.1)"
              >
                <Td py={4} color="white" fontWeight="500">
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" fontWeight="600">
                      {c.title}
                    </Text>
                    <Text fontSize="xs" color="rgba(255, 255, 255, 0.6)">
                      ID: {c._id.slice(-6)}
                    </Text>
                  </VStack>
                </Td>
                <Td py={4}>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      colorScheme={getBadgeColor('type', c.type)}
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="600"
                      bg="rgba(139, 92, 246, 0.2)"
                      color="#c084fc"
                      border="1px solid rgba(139, 92, 246, 0.3)"
                    >
                      <HStack spacing={1}>
                        <Text>{typeIcons[c.type] || "📋"}</Text>
                        <Text>{typeLabels[c.type] || c.type}</Text>
                      </HStack>
                    </Badge>
                  </MotionBox>
                </Td>
                <Td py={4} color="rgba(255, 255, 255, 0.8)" fontSize="sm">
                  {c.initDate ? new Date(c.initDate).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }) : '-'}
                </Td>
                <Td py={4}>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      colorScheme={getBadgeColor('state', c.state)}
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="600"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Box as={getStateIcon(c.state)} size="10px" />
                      {stateLabels[c.state] || c.state}
                    </Badge>
                  </MotionBox>
                </Td>
                <Td py={4} color="rgba(255, 255, 255, 0.8)" fontSize="sm">
                  <HStack spacing={1}>
                    <FiMapPin size={12} color="rgba(139, 92, 246, 0.7)" />
                    <Text>{c.ubication || 'No especificada'}</Text>
                  </HStack>
                </Td>
                <Td py={4}>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      colorScheme={getBadgeColor('priority', c.priority)}
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="600"
                    >
                      {priorityLabels[c.priority] || c.priority}
                    </Badge>
                  </MotionBox>
                </Td>
                <Td py={4}>
                  <HStack spacing={2}>
                    <Avatar
                      size="sm"
                      name={c.researcher?.name || 'Sin asignar'}
                      bg="linear-gradient(135deg, #8B5CF6, #A855F7)"
                      color="white"
                      fontSize="xs"
                    />
                    <VStack align="start" spacing={0}>
                      <Text
                        fontSize="sm"
                        fontWeight="500"
                        color="white"
                        lineHeight="1.2"
                      >
                        {c.researcher?.name || 'Sin asignar'}
                      </Text>
                      {c.researcher?.email && (
                        <Text
                          fontSize="xs"
                          color="rgba(255, 255, 255, 0.6)"
                          lineHeight="1.2"
                        >
                          {c.researcher.email}
                        </Text>
                      )}
                    </VStack>
                  </HStack>
                </Td>
                <Td py={4}>
                  <HStack spacing={2}>
                    <Tooltip label="Ver detalles" placement="top">
                      <MotionBox
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          bg="rgba(59, 130, 246, 0.2)"
                          color="#60a5fa"
                          border="1px solid rgba(59, 130, 246, 0.3)"
                          borderRadius="8px"
                          _hover={{
                            bg: "rgba(59, 130, 246, 0.3)",
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                          }}
                          onClick={() => handleView && handleView(c)}
                          aria-label="Ver caso"
                        />
                      </MotionBox>
                    </Tooltip>
                    <Tooltip label="Editar caso" placement="top">
                      <MotionBox
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <IconButton
                          icon={<FiEdit3 />}
                          size="sm"
                          bg="rgba(139, 92, 246, 0.2)"
                          color="#c084fc"
                          border="1px solid rgba(139, 92, 246, 0.3)"
                          borderRadius="8px"
                          _hover={{
                            bg: "rgba(139, 92, 246, 0.3)",
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)"
                          }}
                          onClick={() => handleEdit && handleEdit(c)}
                          aria-label="Editar caso"
                        />
                      </MotionBox>
                    </Tooltip>
                  </HStack>
                </Td>
              </MotionTr>
            ))}
          </AnimatePresence>
        </Tbody>
      </Table>

      {/* Estado vacío mejorado */}
      <AnimatePresence>
        {cases.length === 0 && (
          <MotionBox
            textAlign="center"
            py={16}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing={6}>
              <MotionBox
                w="120px"
                h="120px"
                bg="linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2))"
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="48px"
                border="2px solid rgba(139, 92, 246, 0.3)"
                animate={{
                  y: [-5, 5, -5],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                📋
              </MotionBox>

              <VStack spacing={3}>
                <Text
                  fontSize="xl"
                  color="rgba(255, 255, 255, 0.9)"
                  fontWeight="600"
                >
                  No hay casos registrados
                </Text>
                <Text
                  color="rgba(255, 255, 255, 0.6)"
                  fontSize="md"
                  maxW="400px"
                  lineHeight="1.6"
                >
                  Comienza creando tu primer caso forense para empezar a gestionar investigaciones
                </Text>

                <Box
                  mt={4}
                  px={4}
                  py={2}
                  bg="rgba(139, 92, 246, 0.1)"
                  border="1px solid rgba(139, 92, 246, 0.3)"
                  borderRadius="full"
                  color="#c084fc"
                  fontSize="sm"
                  fontWeight="500"
                >
                  💡 Tip: Usa el botón "Nuevo Caso" para comenzar
                </Box>
              </VStack>
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </MotionTableContainer>
  );
};

export default CasesList;