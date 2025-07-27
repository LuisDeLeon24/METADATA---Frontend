import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Badge,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Container,
  Flex,
  Icon,
  Divider,
  Grid,
  GridItem,
  Avatar,
  Tooltip,
  useToast
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ViewIcon, 
  EditIcon, 
  AddIcon, 
  CalendarIcon,
  InfoIcon,
  CheckCircleIcon,
  WarningIcon,
  TimeIcon
} from "@chakra-ui/icons";
import { 
  FaGavel, 
  FaShieldAlt, 
  FaBomb, 
  FaUserSecret,
  FaHammer,
  FaBullhorn,
  FaMapMarkerAlt,
  FaFileAlt,
  FaUsers,
  FaChartLine,
  FaClock,
  FaExclamationTriangle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import CasesList from "./CasesList";
import CaseFormModal from "./CaseFormModal";
import { useCases } from "../../shared/hooks/useCases";
import { useUsers } from "../../shared/hooks/useUsers";
import { UserContext } from "../../context/UserContext";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionTr = motion(Tr);

// Mapeo de iconos para tipos de caso
const typeIcons = {
  HOMICIDE: FaGavel,
  ASSAULT: FaShieldAlt,
  TERRORISM: FaBomb,
  SCAM: FaUserSecret,
  VANDALISM: FaHammer,
  CYBERBULLYING: FaBullhorn
};

// Lista mejorada para SEARCHER
const CasesListSearcher = ({ cases, handleView }) => {
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

  const getStateColor = (state) => {
    switch(state) {
      case "RECEIVED": return "gray";
      case "IN_PROGRESS": return "orange";
      case "FINISHED": return "green";
      default: return "gray";
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "HIGH": return "red";
      case "MEDIUM": return "yellow";
      case "LOW": return "green";
      default: return "gray";
    }
  };

  if (cases.length === 0) {
    return (
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        bg="rgba(30, 30, 30, 0.8)"
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor="purple.500"
        borderRadius="2xl"
        p={12}
        textAlign="center"
      >
        <Icon as={FaFileAlt} boxSize={16} color="purple.400" mb={4} />
        <Text color="purple.200" fontSize="xl" fontWeight="medium" mb={2}>
          No tienes casos asignados
        </Text>
        <Text color="gray.400">
          Espera a que te asignen un caso para comenzar.
        </Text>
      </MotionBox>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      bg="rgba(30, 30, 30, 0.8)"
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor="rgba(139, 92, 246, 0.2)"
      borderRadius="2xl"
      overflow="hidden"
    >
      <TableContainer>
        <Table variant="simple" size="md">
          <Thead>
            <Tr bg="rgba(139, 92, 246, 0.1)">
              <Th color="purple.300" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
                Caso
              </Th>
              <Th color="purple.300" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
                Tipo
              </Th>
              <Th color="purple.300" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
                Fecha
              </Th>
              <Th color="purple.300" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
                Estado
              </Th>
              <Th color="purple.300" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
                Ubicación
              </Th>
              <Th color="purple.300" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
                Prioridad
              </Th>
              <Th color="purple.300" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
                Acciones
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <AnimatePresence>
              {cases.map((c, i) => (
                <MotionTr
                  key={c._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.1 }}
                  _hover={{ 
                    bg: "rgba(139, 92, 246, 0.1)",
                    transform: "translateX(4px)"
                  }}
                  borderBottom="1px solid"
                  borderColor="rgba(139, 92, 246, 0.1)"
                >
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold" color="white" fontSize="sm">
                        {c.title}
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        ID: {c._id.slice(-6)}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Icon 
                        as={typeIcons[c.type] || FaFileAlt} 
                        color="purple.400" 
                        boxSize={4}
                      />
                      <Badge 
                        bg="rgba(139, 92, 246, 0.2)" 
                        color="purple.200"
                        borderRadius="md"
                        px={2}
                        py={1}
                      >
                        {typeLabels[c.type] || c.type}
                      </Badge>
                    </HStack>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Icon as={CalendarIcon} color="gray.400" boxSize={3} />
                      <Text color="gray.300" fontSize="sm">
                        {c.initDate ? new Date(c.initDate).toLocaleDateString() : '-'}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge 
                      colorScheme={getStateColor(c.state)}
                      variant="solid"
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      {stateLabels[c.state] || c.state}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Icon as={FaMapMarkerAlt} color="gray.400" boxSize={3} />
                      <Text color="gray.300" fontSize="sm">
                        {c.ubication}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge 
                      colorScheme={getPriorityColor(c.priority)}
                      variant="solid"
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      {priorityLabels[c.priority] || c.priority}
                    </Badge>
                  </Td>
                  <Td>
                    <Tooltip label="Ver detalles" hasArrow>
                      <IconButton
                        icon={<ViewIcon />}
                        size="sm"
                        bg="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ 
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)"
                        }}
                        transition="all 0.3s ease"
                        onClick={() => handleView && handleView(c)}
                        aria-label="Ver caso"
                      />
                    </Tooltip>
                  </Td>
                </MotionTr>
              ))}
            </AnimatePresence>
          </Tbody>
        </Table>
      </TableContainer>
    </MotionBox>
  );
};

const CaseManagerAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCase, setEditingCase] = useState(null);
  const [viewingCase, setViewingCase] = useState(null);
  const { cases, createCase, updateCase, fetchCases } = useCases();
  const { users } = useUsers();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    fetchCases();
  }, []);

  const handleNewCase = () => {
    setEditingCase(null);
    onOpen();
  };

  const handleEdit = (caseData) => {
    setEditingCase(caseData);
    onOpen();
  };

  const handleView = (caseData) => {
    setViewingCase(caseData);
  };

  const handleCloseView = () => setViewingCase(null);

  const handleSubmit = async (formData) => {
    try {
      if (editingCase) {
        await updateCase(editingCase._id, formData);
        toast({
          title: "Caso actualizado",
          description: "El caso ha sido actualizado exitosamente.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await createCase(formData);
        toast({
          title: "Caso creado",
          description: "El nuevo caso ha sido creado exitosamente.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      await fetchCases();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar el caso.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleViewReport = (id) => {
    navigate(`/report?caseId=${id}`);
    handleCloseView();
  };

  const userCases = cases.filter(
    (c) => c.researcher?._id === user?._id || c.researcher === user?._id
  );

  // Estadísticas de casos
  const stats = {
    total: cases.length,
    received: cases.filter(c => c.state === 'RECEIVED').length,
    inProgress: cases.filter(c => c.state === 'IN_PROGRESS').length,
    finished: cases.filter(c => c.state === 'FINISHED').length,
    highPriority: cases.filter(c => c.priority === 'HIGH').length
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)"
      position="relative"
      overflow="hidden"
      pt='100'
    >
      {/* Background Effects */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.1"
        bgImage="radial-gradient(circle at 25% 25%, purple.500 0%, transparent 50%), radial-gradient(circle at 75% 75%, purple.700 0%, transparent 50%)"
      />

      <Container maxW="7xl" py={8} position="relative" zIndex={1}>
        {/* Header Section */}
        <MotionFlex
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          justify="space-between"
          align="center"
          mb={8}
          flexWrap="wrap"
          gap={4}
        >
          <VStack align="start" spacing={2}>
            <HStack spacing={3}>
              <Icon as={FaGavel} boxSize={8} color="purple.400" />
              <Heading 
                size="2xl" 
                bgGradient="linear(to-r, purple.200, purple.400)"
                bgClip="text"
                fontWeight="bold"
              >
                Administración de Casos
              </Heading>
            </HStack>
            <Text fontSize="lg" color="gray.300">
              {user?.role === "ADMIN" ? 
                "Gestiona y supervisa todos los casos del sistema" : 
                "Revisa los casos que tienes asignados"
              }
            </Text>
          </VStack>

          {user?.role === "ADMIN" && (
            <Button
              leftIcon={<AddIcon />}
              bg="linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
              color="white"
              size="lg"
              borderRadius="xl"
              px={8}
              py={6}
              _hover={{ 
                transform: "translateY(-2px)",
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
              }}
              transition="all 0.3s ease"
              onClick={handleNewCase}
            >
              Nuevo Caso
            </Button>
          )}
        </MotionFlex>

        {/* Stats Dashboard */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          mb={8}
        >
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }} gap={6}>
            <GridItem>
              <Box
                bg="rgba(30, 30, 30, 0.8)"
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor="purple.500"
                borderRadius="xl"
                p={6}
                textAlign="center"
              >
                <Icon as={FaFileAlt} boxSize={8} color="purple.400" mb={2} />
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {user?.role === "ADMIN" ? stats.total : userCases.length}
                </Text>
                <Text color="gray.400" fontSize="sm">Total Casos</Text>
              </Box>
            </GridItem>
            
            <GridItem>
              <Box
                bg="rgba(30, 30, 30, 0.8)"
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor="gray.500"
                borderRadius="xl"
                p={6}
                textAlign="center"
              >
                <Icon as={TimeIcon} boxSize={8} color="gray.400" mb={2} />
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {stats.received}
                </Text>
                <Text color="gray.400" fontSize="sm">Recibidos</Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box
                bg="rgba(30, 30, 30, 0.8)"
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor="orange.500"
                borderRadius="xl"
                p={6}
                textAlign="center"
              >
                <Icon as={FaClock} boxSize={8} color="orange.400" mb={2} />
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {stats.inProgress}
                </Text>
                <Text color="gray.400" fontSize="sm">En Proceso</Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box
                bg="rgba(30, 30, 30, 0.8)"
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor="green.500"
                borderRadius="xl"
                p={6}
                textAlign="center"
              >
                <Icon as={CheckCircleIcon} boxSize={8} color="green.400" mb={2} />
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {stats.finished}
                </Text>
                <Text color="gray.400" fontSize="sm">Finalizados</Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box
                bg="rgba(30, 30, 30, 0.8)"
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor="red.500"
                borderRadius="xl"
                p={6}
                textAlign="center"
              >
                <Icon as={FaExclamationTriangle} boxSize={8} color="red.400" mb={2} />
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {stats.highPriority}
                </Text>
                <Text color="gray.400" fontSize="sm">Alta Prioridad</Text>
              </Box>
            </GridItem>
          </Grid>
        </MotionBox>

        {/* Modal para formulario de casos */}
        {user?.role === "ADMIN" && (
          <CaseFormModal
            isOpen={isOpen}
            onClose={onClose}
            initialData={editingCase}
            onSubmit={handleSubmit}
            users={users}
          />
        )}

        {/* Modal mejorado para ver detalles */}
        <Modal isOpen={!!viewingCase} onClose={handleCloseView} size="2xl">
          <ModalOverlay backdropFilter="blur(10px)" />
          <MotionContent
            as={ModalContent}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            bg="rgba(30, 30, 30, 0.95)"
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor="purple.500"
            borderRadius="2xl"
            color="white"
          >
            <ModalHeader>
              <HStack spacing={3}>
                <Icon as={InfoIcon} color="purple.400" boxSize={6} />
                <Text bgGradient="linear(to-r, purple.200, purple.400)" bgClip="text">
                  Detalle del Caso
                </Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton color="gray.400" />
            <ModalBody>
              {viewingCase && (
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem colSpan={2}>
                    <Box
                      bg="rgba(139, 92, 246, 0.1)"
                      p={4}
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="purple.700"
                    >
                      <Text fontSize="xl" fontWeight="bold" color="white" mb={2}>
                        {viewingCase.title}
                      </Text>
                      <Text color="gray.300" fontSize="sm">
                        ID del Caso: {viewingCase._id}
                      </Text>
                    </Box>
                  </GridItem>

                  <GridItem>
                    <VStack align="start" spacing={4}>
                      <Box>
                        <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={1}>
                          TIPO DE CASO
                        </Text>
                        <HStack spacing={2}>
                          <Icon as={typeIcons[viewingCase.type] || FaFileAlt} color="purple.400" />
                          <Badge bg="purple.500" color="white" borderRadius="md" px={3} py={1}>
                            {viewingCase.type}
                          </Badge>
                        </HStack>
                      </Box>

                      <Box>
                        <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={1}>
                          ESTADO
                        </Text>
                        <Badge 
                          colorScheme={
                            viewingCase.state === "RECEIVED" ? "gray" :
                            viewingCase.state === "IN_PROGRESS" ? "orange" :
                            viewingCase.state === "FINISHED" ? "green" : "gray"
                          }
                          variant="solid"
                          borderRadius="full"
                          px={3}
                          py={1}
                        >
                          {viewingCase.state}
                        </Badge>
                      </Box>

                      <Box>
                        <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={1}>
                          PRIORIDAD
                        </Text>
                        <Badge 
                          colorScheme={
                            viewingCase.priority === "HIGH" ? "red" :
                            viewingCase.priority === "MEDIUM" ? "yellow" :
                            viewingCase.priority === "LOW" ? "green" : "gray"
                          }
                          variant="solid"
                          borderRadius="full"
                          px={3}
                          py={1}
                        >
                          {viewingCase.priority}
                        </Badge>
                      </Box>
                    </VStack>
                  </GridItem>

                  <GridItem>
                    <VStack align="start" spacing={4}>
                      <Box>
                        <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={1}>
                          FECHA DE INICIO
                        </Text>
                        <HStack spacing={2}>
                          <Icon as={CalendarIcon} color="gray.400" boxSize={4} />
                          <Text color="gray.300">
                            {viewingCase.initDate ? new Date(viewingCase.initDate).toLocaleDateString() : 'No definida'}
                          </Text>
                        </HStack>
                      </Box>

                      <Box>
                        <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={1}>
                          UBICACIÓN
                        </Text>
                        <HStack spacing={2}>
                          <Icon as={FaMapMarkerAlt} color="gray.400" boxSize={4} />
                          <Text color="gray.300">{viewingCase.ubication}</Text>
                        </HStack>
                      </Box>

                      <Box>
                        <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={1}>
                          INVESTIGADOR
                        </Text>
                        <HStack spacing={2}>
                          <Avatar size="sm" name={viewingCase.researcher?.name || 'Sin asignar'} />
                          <Text color="gray.300">
                            {viewingCase.researcher?.name || 'Sin asignar'}
                          </Text>
                        </HStack>
                      </Box>
                    </VStack>
                  </GridItem>

                  <GridItem colSpan={2}>
                    <Box>
                      <Text color="purple.300" fontSize="sm" fontWeight="bold" mb={2}>
                        DESCRIPCIÓN
                      </Text>
                      <Box
                        bg="rgba(30, 30, 30, 0.5)"
                        p={4}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.700"
                      >
                        <Text color="gray.300" lineHeight="tall">
                          {viewingCase.description}
                        </Text>
                      </Box>
                    </Box>
                  </GridItem>
                </Grid>
              )}
            </ModalBody>
            <ModalFooter>
              <HStack spacing={3}>
                <Button 
                  leftIcon={<Icon as={FaChartLine} />}
                  bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  color="white"
                  borderRadius="lg"
                  px={6}
                  _hover={{ 
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)"
                  }}
                  transition="all 0.3s ease"
                  onClick={() => handleViewReport(viewingCase._id)}
                >
                  Ver Reporte
                </Button>
                <Button 
                  variant="ghost" 
                  color="gray.300"
                  _hover={{ bg: "rgba(255,255,255,0.1)" }}
                  onClick={handleCloseView}
                >
                  Cerrar
                </Button>
              </HStack>
            </ModalFooter>
          </MotionContent>
        </Modal>

        {/* Lista de casos */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {user?.role === "ADMIN" ? (
            <CasesList cases={cases} handleEdit={handleEdit} handleView={handleView} />
          ) : (
            <CasesListSearcher cases={userCases} handleView={handleView} />
          )}
        </MotionBox>
      </Container>
    </Box>
  );
};

// Componente Motion para ModalContent
const MotionContent = motion(ModalContent);

export default CaseManagerAdmin;