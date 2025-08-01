import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Flex,
  HStack,
  Text,
  Badge,
  Icon,
  Textarea,
  useColorModeValue,
  Box,
  Divider,
  Tooltip,
  Progress,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  TimeIcon,
  StarIcon,
  ViewIcon,
  CheckCircleIcon,
  WarningIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

// Motion components
const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionVStack = motion(VStack);

const typeOptions = [
  { 
    value: "HOMICIDE", 
    label: "Homicidio", 
    color: "red.500", 
    icon: WarningIcon,
    priority: "HIGH" 
  },
  { 
    value: "ASSAULT", 
    label: "Asalto", 
    color: "orange.500", 
    icon: WarningIcon,
    priority: "MEDIUM" 
  },
  { 
    value: "TERRORISM", 
    label: "Terrorismo", 
    color: "red.600", 
    icon: WarningIcon,
    priority: "HIGH" 
  },
  { 
    value: "SCAM", 
    label: "Estafa", 
    color: "yellow.500", 
    icon: InfoIcon,
    priority: "MEDIUM" 
  },
  { 
    value: "VANDALISM", 
    label: "Vandalismo", 
    color: "blue.500", 
    icon: InfoIcon,
    priority: "LOW" 
  },
  { 
    value: "CYBERBULLYING", 
    label: "Ciberacoso", 
    color: "purple.500", 
    icon: ViewIcon,
    priority: "MEDIUM" 
  },
];

const stateOptions = [
  { 
    value: "RECEIVED", 
    label: "Recibido", 
    color: "blue.500", 
    bg: "blue.50",
    icon: InfoIcon 
  },
  { 
    value: "IN_PROGRESS", 
    label: "En Proceso", 
    color: "orange.500", 
    bg: "orange.50",
    icon: TimeIcon 
  },
  { 
    value: "FINISHED", 
    label: "Finalizado", 
    color: "green.500", 
    bg: "green.50",
    icon: CheckCircleIcon 
  },
];

const priorityOptions = [
  { 
    value: "HIGH", 
    label: "Alta", 
    color: "red.500", 
    bg: "red.50",
    icon: WarningIcon 
  },
  { 
    value: "MEDIUM", 
    label: "Media", 
    color: "orange.500", 
    bg: "orange.50",
    icon: InfoIcon 
  },
  { 
    value: "LOW", 
    label: "Baja", 
    color: "green.500", 
    bg: "green.50",
    icon: CheckCircleIcon 
  },
];

const CaseFormModal = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  users = [],
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    initDate: "",
    finishDate: "",
    state: "RECEIVED",
    ubication: "",
    priority: "",
    researcher: "",
    status: true,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [formProgress, setFormProgress] = useState(0);

  // Theme colors
  const bgGradient = useColorModeValue(
    'linear(to-br, white, purple.50)',
    'linear(to-br, gray.800, purple.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('purple.200', 'purple.600');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const accentColor = useColorModeValue('purple.600', 'purple.300');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const overlayBg = useColorModeValue('blackAlpha.300', 'blackAlpha.600');

  // Animation variants
  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        staggerChildren: 0.1 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02, 
      boxShadow: "0 8px 25px -8px rgba(139, 92, 246, 0.5)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        type: initialData.type || "",
        initDate: initialData.initDate
          ? initialData.initDate.slice(0, 10)
          : "",
        finishDate: initialData.finishDate
          ? initialData.finishDate.slice(0, 10)
          : "",
        state: initialData.state || "RECEIVED",
        ubication: initialData.ubication || "",
        priority: initialData.priority || "",
        researcher: initialData.researcher?._id || initialData.researcher || "",
        status: initialData.status ?? true,
      });
    } else {
      setForm({
        title: "",
        description: "",
        type: "",
        initDate: "",
        finishDate: "",
        state: "RECEIVED",
        ubication: "",
        priority: "",
        researcher: "",
        status: true,
      });
    }
  }, [initialData, isOpen]);

  // Calculate form progress
  useEffect(() => {
    const requiredFields = ['title', 'description', 'type', 'initDate', 'state', 'ubication', 'priority', 'researcher'];
    const filledFields = requiredFields.filter(field => form[field] && form[field].toString().trim() !== '');
    const progress = (filledFields.length / requiredFields.length) * 100;
    setFormProgress(progress);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    const newValue = inputType === "checkbox" ? checked : value;
    
    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Auto-set priority based on case type
    if (name === "type" && value) {
      const selectedType = typeOptions.find(opt => opt.value === value);
      if (selectedType && !form.priority) {
        setForm(prev => ({
          ...prev,
          priority: selectedType.priority
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      finishDate: form.finishDate || null,
      researcher: form.researcher,
    });
  };

  const getSelectedTypeInfo = () => {
    return typeOptions.find(opt => opt.value === form.type);
  };

  const getSelectedStateInfo = () => {
    return stateOptions.find(opt => opt.value === form.state);
  };

  const getSelectedPriorityInfo = () => {
    return priorityOptions.find(opt => opt.value === form.priority);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal 
          isOpen={isOpen} 
          onClose={onClose} 
          size="2xl" 
          isCentered
          motionPreset="none"
        >
          <ModalOverlay bg={overlayBg} backdropFilter="blur(4px)" />
          <MotionBox
            as={ModalContent}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            borderRadius="3xl"
            overflow="hidden"
            border="1px solid"
            borderColor={borderColor}
            bg={cardBg}
            maxH="90vh"
            shadow="2xl"
          >
            {/* Header with gradient */}
            <Box
              bgGradient="linear(135deg, purple.600, purple.800, black)"
              color="white"
              p={6}
              position="relative"
              overflow="hidden"
            >
              {/* Decorative elements */}
              <Box
                position="absolute"
                top="-20px"
                right="-20px"
                w="100px"
                h="100px"
                bg="whiteAlpha.100"
                borderRadius="full"
                opacity={0.3}
              />
              <Box
                position="absolute"
                bottom="-10px"
                left="-10px"
                w="60px"
                h="60px"
                bg="whiteAlpha.100"
                borderRadius="full"
                opacity={0.2}
              />

              <ModalCloseButton 
                color="white" 
                size="lg" 
                top={4} 
                right={4}
                _hover={{ bg: "whiteAlpha.200" }}
                borderRadius="full"
              />
              
              <VStack align="start" spacing={3}>
                <HStack spacing={3}>
                  <Icon 
                    as={initialData ? ViewIcon : StarIcon} 
                    boxSize={6} 
                    color="purple.200" 
                  />
                  <Text fontSize="2xl" fontWeight="bold">
                    {initialData ? "Editar Caso" : "Nuevo Caso"}
                  </Text>
                </HStack>
                
                <Text fontSize="sm" opacity={0.9}>
                  {initialData 
                    ? "Modifica los detalles del caso existente" 
                    : "Completa la información para crear un nuevo caso forense"
                  }
                </Text>

                {/* Progress bar */}
                <Box w="full" mt={2}>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="xs" opacity={0.8}>Progreso del formulario</Text>
                    <Text fontSize="xs" opacity={0.8}>{Math.round(formProgress)}%</Text>
                  </HStack>
                  <Progress 
                    value={formProgress} 
                    colorScheme="purple" 
                    bg="whiteAlpha.200"
                    borderRadius="full"
                    size="sm"
                  />
                </Box>
              </VStack>
            </Box>

            <ModalBody p={6} maxH="60vh" overflowY="auto" color='whiteAlpha.900' >
              <MotionVStack
                as="form"
                onSubmit={handleSubmit}
                spacing={6}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Basic Information Section */}
                <Box w="full">
                  <HStack mb={4}>
                    <Icon as={InfoIcon} color={accentColor} />
                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                      Información Básica
                    </Text>
                  </HStack>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem colSpan={2}>
                      <FormControl isRequired>
                        <FormLabel color={textColor} fontSize="sm" fontWeight="medium">
                          Título del Caso
                        </FormLabel>
                        <Input
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          borderRadius="xl"
                          focusBorderColor="purple.400"
                          bg={inputBg}
                          border="2px solid"
                          borderColor="transparent"
                          _hover={{ borderColor: "purple.200" }}
                          _focus={{ 
                            borderColor: "purple.400",
                            boxShadow: "0 0 0 1px purple.400"
                          }}
                          size="lg"
                          placeholder="Ingresa un título descriptivo"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem colSpan={2}>
                      <FormControl isRequired>
                        <FormLabel color={textColor} fontSize="sm" fontWeight="medium">
                          Descripción
                        </FormLabel>
                        <Textarea
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          borderRadius="xl"
                          focusBorderColor="purple.400"
                          bg={inputBg}
                          border="2px solid"
                          borderColor="transparent"
                          _hover={{ borderColor: "purple.200" }}
                          _focus={{ 
                            borderColor: "purple.400",
                            boxShadow: "0 0 0 1px purple.400"
                          }}
                          placeholder="Describe detalladamente el caso (mínimo 15 caracteres)"
                          rows={3}
                          resize="vertical"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel color={textColor} fontSize="sm" fontWeight="medium">
                          Tipo de Caso
                        </FormLabel>
                        <Select
                          name="type"
                          value={form.type}
                          onChange={handleChange}
                          borderRadius="xl"
                          focusBorderColor="purple.400"
                          bg={inputBg}
                          border="2px solid"
                          borderColor="transparent"
                          _hover={{ borderColor: "purple.200" }}
                          _focus={{ 
                            borderColor: "purple.400",
                            boxShadow: "0 0 0 1px purple.400"
                          }}
                          size="lg"
                        >
                          <option value="">Selecciona tipo</option>
                          {typeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Select>
                        {form.type && (
                          <HStack mt={2}>
                            <Badge 
                              colorScheme={getSelectedTypeInfo()?.color?.split('.')[0]} 
                              variant="subtle"
                              borderRadius="full"
                              px={3}
                              py={1}
                            >
                              <HStack spacing={1}>
                                <Icon as={getSelectedTypeInfo()?.icon} boxSize={3} />
                                <Text fontSize="xs">{getSelectedTypeInfo()?.label}</Text>
                              </HStack>
                            </Badge>
                          </HStack>
                        )}
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel color={textColor} fontSize="sm" fontWeight="medium">
                          Ubicación
                        </FormLabel>
                        <Input
                          name="ubication"
                          value={form.ubication}
                          onChange={handleChange}
                          borderRadius="xl"
                          focusBorderColor="purple.400"
                          bg={inputBg}
                          border="2px solid"
                          borderColor="transparent"
                          _hover={{ borderColor: "purple.200" }}
                          _focus={{ 
                            borderColor: "purple.400",
                            boxShadow: "0 0 0 1px purple.400"
                          }}
                          size="lg"
                          placeholder="Ciudad, País"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Box>

                <Divider borderColor={borderColor} />

                {/* Dates and Status Section */}
                <Box w="full">
                  <HStack mb={4}>
                    <Icon as={CalendarIcon} color={accentColor} />
                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                      Fechas y Estado
                    </Text>
                  </HStack>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel color={textColor} fontSize="sm" fontWeight="medium">
                          Fecha de Inicio
                        </FormLabel>
                        <Input
                          type="date"
                          name="initDate"
                          value={form.initDate}
                          onChange={handleChange}
                          borderRadius="xl"
                          focusBorderColor="purple.400"
                          bg={inputBg}
                          border="2px solid"
                          borderColor="transparent"
                          _hover={{ borderColor: "purple.200" }}
                          _focus={{ 
                            borderColor: "purple.400",
                            boxShadow: "0 0 0 1px purple.400"
                          }}
                          size="lg"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel color={textColor} fontSize="sm" fontWeight="medium">
                          Fecha de Finalización
                        </FormLabel>
                        <Input
                          type="date"
                          name="finishDate"
                          value={form.finishDate}
                          onChange={handleChange}
                          borderRadius="xl"
                          focusBorderColor="purple.400"
                          bg={inputBg}
                          border="2px solid"
                          borderColor="transparent"
                          _hover={{ borderColor: "purple.200" }}
                          _focus={{ 
                            borderColor: "purple.400",
                            boxShadow: "0 0 0 1px purple.400"
                          }}
                          size="lg"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel color={textColor} fontSize="sm" fontWeight="medium">
                          Estado del Caso
                        </FormLabel>
                        <Select
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          borderRadius="xl"
                          focusBorderColor="purple.400"
                          bg={inputBg}
                          border="2px solid"
                          borderColor="transparent"
                          _hover={{ borderColor: "purple.200" }}
                          _focus={{ 
                            borderColor: "purple.400",
                            boxShadow: "0 0 0 1px purple.400"
                          }}
                          size="lg"
                        >
                          {stateOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Select>
                        {form.state && (
                          <HStack mt={2}>
                            <Badge 
                              colorScheme={getSelectedStateInfo()?.color?.split('.')[0]} 
                              variant="subtle"
                              borderRadius="full"
                              px={3}
                              py={1}
                            >
                              <HStack spacing={1}>
                                <Icon as={getSelectedStateInfo()?.icon} boxSize={3} />
                                <Text fontSize="xs">{getSelectedStateInfo()?.label}</Text>
                              </HStack>
                            </Badge>
                          </HStack>
                        )}
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel color={textColor} fontSize="sm" fontWeight="medium">
                          Prioridad
                        </FormLabel>
                        <Select
                          name="priority"
                          value={form.priority}
                          onChange={handleChange}
                          borderRadius="xl"
                          focusBorderColor="purple.400"
                          bg={inputBg}
                          border="2px solid"
                          borderColor="transparent"
                          _hover={{ borderColor: "purple.200" }}
                          _focus={{ 
                            borderColor: "purple.400",
                            boxShadow: "0 0 0 1px purple.400"
                          }}
                          size="lg"
                        >
                          <option value="">Selecciona prioridad</option>
                          {priorityOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Select>
                        {form.priority && (
                          <HStack mt={2}>
                            <Badge 
                              colorScheme={getSelectedPriorityInfo()?.color?.split('.')[0]} 
                              variant="subtle"
                              borderRadius="full"
                              px={3}
                              py={1}
                            >
                              <HStack spacing={1}>
                                <Icon as={getSelectedPriorityInfo()?.icon} boxSize={3} />
                                <Text fontSize="xs">{getSelectedPriorityInfo()?.label}</Text>
                              </HStack>
                            </Badge>
                          </HStack>
                        )}
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Box>

                <Divider borderColor={borderColor} />

                {/* Assignment Section */}
                <Box w="full">
                  <HStack mb={4}>
                    <Icon as={ViewIcon} color={accentColor} />
                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                      Asignación
                    </Text>
                  </HStack>

                  <FormControl isRequired>
                    <FormLabel color={textColor} fontSize="sm" fontWeight="medium">
                      Investigador Asignado
                    </FormLabel>
                    <Select
                      name="researcher"
                      value={form.researcher}
                      onChange={handleChange}
                      borderRadius="xl"
                      focusBorderColor="purple.400"
                      bg={inputBg}
                      border="2px solid"
                      borderColor="transparent"
                      _hover={{ borderColor: "purple.200" }}
                      _focus={{ 
                        borderColor: "purple.400",
                        boxShadow: "0 0 0 1px purple.400"
                      }}
                      size="lg"
                      disabled={users.length === 0}
                    >
                      <option value="">Selecciona un Investigador</option>
                      {users.length === 0 && (
                        <option value="" disabled>
                          No hay investigadores disponibles
                        </option>
                      )}
                      {users.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.username || `${u.name} ${u.surname}`}
                        </option>
                      ))}
                    </Select>
                    {users.length === 0 && (
                      <Text fontSize="xs" color="orange.500" mt={2}>
                        ⚠️ No hay investigadores disponibles en el sistema
                      </Text>
                    )}
                  </FormControl>
                </Box>

                {/* Action Buttons */}
                <Flex justify="flex-end" w="full" mt={6} gap={3}>
                  <Button 
                    onClick={onClose} 
                    variant="ghost"
                    size="lg"
                    borderRadius="xl"
                    color={textColor}
                    _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                  >
                    Cancelar
                  </Button>
                  <MotionButton
                    type="submit"
                    colorScheme="purple"
                    size="lg"
                    borderRadius="xl"
                    bgGradient="linear(135deg, purple.500, purple.600)"
                    _hover={{ 
                      bgGradient: "linear(135deg, purple.600, purple.700)",
                    }}
                    _active={{ 
                      bgGradient: "linear(135deg, purple.700, purple.800)",
                    }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    isDisabled={formProgress < 100}
                    leftIcon={<Icon as={initialData ? ViewIcon : StarIcon} />}
                    px={8}
                  >
                    {initialData ? "Actualizar Caso" : "Crear Caso"}
                  </MotionButton>
                </Flex>
              </MotionVStack>
            </ModalBody>
          </MotionBox>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CaseFormModal;