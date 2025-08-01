import { useState, useContext } from 'react';
import {
  Button,
  Select,
  Input,
  VStack,
  useToast,
  Text,
  HStack,
  Icon,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiSearch,
  FiCalendar,
  FiActivity,
  FiSend
} from 'react-icons/fi';
import { createLog } from '../../services/api.jsx';
import { UserContext } from '../../context/UserContext';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionVStack = motion(VStack);

const LogForm = () => {
  const { user } = useContext(UserContext);
  const [action, setAction] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  // Opciones de acciones con iconos y colores
  const actionOptions = [
    { value: 'Agregar', label: 'Agregar', icon: FiPlus, color: 'green' },
    { value: 'Editar', label: 'Editar', icon: FiEdit3, color: 'blue' },
    { value: 'Eliminar', label: 'Eliminar', icon: FiTrash2, color: 'red' },
    { value: 'Buscar', label: 'Buscar', icon: FiSearch, color: 'purple' },
  ];

  const getSelectedActionIcon = () => {
    const selectedOption = actionOptions.find(opt => opt.value === action);
    return selectedOption ? selectedOption.icon : FiActivity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!action) {
      toast({
        title: 'Acción requerida',
        description: 'Por favor selecciona una acción antes de enviar.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setIsSubmitting(false);
      return;
    }

    // Si no hay fecha, asignar fecha actual en formato ISO compatible con datetime-local
    const fechaValida = date
      ? date
      : new Date().toISOString().slice(0, 16);

    const logData = { userId: user._id, action, date: fechaValida };

    try {
      await createLog(logData);
      toast({
        title: 'Log creado exitosamente',
        description: `Se ha registrado la acción: ${action}`,
        status: 'success',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
      setAction('');
      setDate('');
    } catch (err) {
      toast({
        title: 'Error al crear log',
        description: err.message || 'Ocurrió un error inesperado',
        status: 'error',
        duration: 4000,
        position: 'top-right',
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      maxW="500px"
      mx="auto"
      mt={8}
    >
      <form onSubmit={handleSubmit}>
        <MotionVStack
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          spacing={6}
          bg="linear-gradient(135deg, #1A1A1A 0%, #2D1B69 100%)"
          p={8}
          borderRadius="2xl"
          boxShadow="0 20px 40px rgba(139, 69, 199, 0.3), 0 0 0 1px rgba(139, 69, 199, 0.1)"
          color="white"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            bgGradient: 'linear(to-r, purple.400, purple.600, purple.800)',
          }}
        >
          {/* Header */}
          <VStack spacing={2} w="full">
            <HStack spacing={3}>
              <Icon as={FiActivity} color="purple.300" boxSize={6} />
              <Text
                fontSize="2xl"
                fontWeight="bold"
                bgGradient="linear(to-r, purple.300, purple.100)"
                bgClip="text"
                textAlign="center"
              >
                Crear Nuevo Log
              </Text>
            </HStack>
            <Text fontSize="sm" color="gray.400" textAlign="center">
              Registra una nueva actividad en el sistema
            </Text>
          </VStack>

          {/* Campo de Acción */}
          <FormControl>
            <FormLabel
              htmlFor="action-select"
              fontSize="sm"
              fontWeight="semibold"
              color="purple.200"
              mb={3}
            >
              <HStack spacing={2}>
                <Icon as={getSelectedActionIcon()} boxSize={4} />
                <Text>Tipo de Acción</Text>
              </HStack>
            </FormLabel>
            <Select
              id="action-select"
              placeholder="Selecciona una acción"
              value={action}
              onChange={e => setAction(e.target.value)}
              bg="rgba(0, 0, 0, 0.4)"
              border="2px solid"
              borderColor="purple.600"
              borderRadius="lg"
              color="white"
              fontSize="md"
              _hover={{
                borderColor: 'purple.400',
                bg: 'rgba(0, 0, 0, 0.6)',
              }}
              _focus={{
                borderColor: 'purple.300',
                boxShadow: '0 0 0 1px #B794F6',
                bg: 'rgba(0, 0, 0, 0.6)',
              }}
              _placeholder={{ color: 'gray.400' }}
              sx={{
                option: {
                  backgroundColor: '#1A1A1A',
                  color: 'white',
                  padding: '10px',
                },
                '& option:hover': {
                  backgroundColor: '#2D1B69',
                }
              }}
            >
              {actionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Campo de Fecha */}
          <FormControl>
            <FormLabel
              htmlFor="date-input"
              fontSize="sm"
              fontWeight="semibold"
              color="purple.200"
              mb={3}
            >
              <HStack spacing={2}>
                <Icon as={FiCalendar} boxSize={4} />
                <Text>Fecha y Hora</Text>
              </HStack>
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiCalendar} color="purple.300" />
              </InputLeftElement>
              <Input
                id="date-input"
                type="datetime-local"
                value={date}
                onChange={e => setDate(e.target.value)}
                max={new Date().toISOString().slice(0, 16)}
                bg="rgba(0, 0, 0, 0.4)"
                border="2px solid"
                borderColor="purple.600"
                borderRadius="lg"
                color="white"
                pl={12}
                _hover={{
                  borderColor: 'purple.400',
                  bg: 'rgba(0, 0, 0, 0.6)',
                }}
                _focus={{
                  borderColor: 'purple.300',
                  boxShadow: '0 0 0 1px #B794F6',
                  bg: 'rgba(0, 0, 0, 0.6)',
                }}
                sx={{
                  '::-webkit-calendar-picker-indicator': {
                    filter: 'invert(1)',
                    cursor: 'pointer',
                  }
                }}
              />
            </InputGroup>
            <Text fontSize="xs" color="gray.500" mt={2}>
              Deja vacío para usar la fecha actual
            </Text>
          </FormControl>

          {/* Botón de Envío */}
          <MotionButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            bgGradient="linear(to-r, purple.500, purple.600)"
            color="white"
            size="lg"
            borderRadius="lg"
            px={8}
            py={6}
            fontSize="md"
            fontWeight="bold"
            leftIcon={<FiSend />}
            width="full"
            isLoading={isSubmitting}
            loadingText="Creando log..."
            _hover={{
              bgGradient: "linear(to-r, purple.400, purple.500)",
              boxShadow: "0 8px 25px rgba(139, 69, 199, 0.4)",
            }}
            _active={{
              bgGradient: "linear(to-r, purple.600, purple.700)",
            }}
            _disabled={{
              opacity: 0.6,
              cursor: 'not-allowed',
            }}
            transition="all 0.2s ease-in-out"
          >
            {isSubmitting ? 'Creando Log...' : 'Crear Log'}
          </MotionButton>

          {/* Efecto de brillo de fondo */}
          <Box
            position="absolute"
            top="-50%"
            left="-50%"
            width="200%"
            height="200%"
            bgGradient="radial(circle, rgba(139, 69, 199, 0.1) 0%, transparent 70%)"
            pointerEvents="none"
            opacity={0.5}
          />
        </MotionVStack>
      </form>
    </MotionBox>
  );
};

export default LogForm;