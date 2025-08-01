import { useState } from 'react';
import { Box, Button, Select, Input, HStack, Text, VStack, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiFilter, FiUser, FiCalendar, FiRefreshCw } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const LogFilter = ({ users = [], onFilter }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApplyFilter = () => {
    onFilter({
      userId: selectedUser || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

  const handleReset = () => {
    setSelectedUser('');
    setStartDate('');
    setEndDate('');
    onFilter({});
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      mb={8}
      p={6}
      borderRadius="xl"
      bg="linear-gradient(135deg, #1A1A1A 0%, #2D1B69 100%)"
      color="white"
      boxShadow="0 20px 40px rgba(139, 69, 199, 0.3), 0 0 0 1px rgba(139, 69, 199, 0.1)"
      maxW="700px"
      mx="auto"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        bgGradient: 'linear(to-r, purple.400, purple.600, purple.800)',
      }}
    >
      {/* Header con icono */}
      <VStack spacing={4} align="stretch">
        <HStack spacing={3} mb={2}>
          <Icon as={FiFilter} color="purple.300" boxSize={5} />
          <Text
            fontSize="lg"
            fontWeight="bold"
            bgGradient="linear(to-r, purple.300, purple.100)"
            bgClip="text"
          >
            Filtros de Búsqueda
          </Text>
        </HStack>

        <HStack spacing={4} flexWrap="wrap" justify="center">
          {/* Select Usuario */}
          <VStack spacing={2} align="start">
            <HStack spacing={2}>
              <Icon as={FiUser} color="purple.300" boxSize={4} />
              <Text fontSize="sm" color="gray.300" fontWeight="medium">
                Usuario
              </Text>
            </HStack>
            <Select
              placeholder="Seleccionar usuario"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              w="200px"
              bg="rgba(0, 0, 0, 0.4)"
              border="1px solid"
              borderColor="purple.600"
              color="white"
              borderRadius="lg"
              _hover={{
                borderColor: 'purple.400',
                bg: 'rgba(0, 0, 0, 0.6)',
              }}
              _focus={{
                borderColor: 'purple.300',
                boxShadow: '0 0 0 1px #B794F6',
              }}
              sx={{
                option: {
                  backgroundColor: '#1A1A1A',
                  color: 'white',
                },
                '& option:hover': {
                  backgroundColor: '#2D1B69',
                }
              }}
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </VStack>

          {/* Input Fecha Inicio */}
          <VStack spacing={2} align="start">
            <HStack spacing={2}>
              <Icon as={FiCalendar} color="purple.300" boxSize={4} />
              <Text fontSize="sm" color="gray.300" fontWeight="medium">
                Fecha Inicio
              </Text>
            </HStack>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              w="160px"
              bg="rgba(0, 0, 0, 0.4)"
              border="1px solid"
              borderColor="purple.600"
              color="white"
              borderRadius="lg"
              _hover={{
                borderColor: 'purple.400',
                bg: 'rgba(0, 0, 0, 0.6)',
              }}
              _focus={{
                borderColor: 'purple.300',
                boxShadow: '0 0 0 1px #B794F6',
              }}
              sx={{
                '::-webkit-calendar-picker-indicator': {
                  filter: 'invert(1)',
                  cursor: 'pointer',
                }
              }}
            />
          </VStack>

          {/* Input Fecha Fin */}
          <VStack spacing={2} align="start">
            <HStack spacing={2}>
              <Icon as={FiCalendar} color="purple.300" boxSize={4} />
              <Text fontSize="sm" color="gray.300" fontWeight="medium">
                Fecha Fin
              </Text>
            </HStack>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              w="160px"
              bg="rgba(0, 0, 0, 0.4)"
              border="1px solid"
              borderColor="purple.600"
              color="white"
              borderRadius="lg"
              _hover={{
                borderColor: 'purple.400',
                bg: 'rgba(0, 0, 0, 0.6)',
              }}
              _focus={{
                borderColor: 'purple.300',
                boxShadow: '0 0 0 1px #B794F6',
              }}
              sx={{
                '::-webkit-calendar-picker-indicator': {
                  filter: 'invert(1)',
                  cursor: 'pointer',
                }
              }}
            />
          </VStack>
        </HStack>

        {/* Botones */}
        <HStack spacing={3} justify="center" mt={4}>
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            bgGradient="linear(to-r, purple.500, purple.600)"
            color="white"
            onClick={handleApplyFilter}
            borderRadius="lg"
            px={6}
            py={2}
            fontWeight="semibold"
            _hover={{
              bgGradient: "linear(to-r, purple.400, purple.500)",
              boxShadow: "0 8px 25px rgba(139, 69, 199, 0.4)",
            }}
            _active={{
              bgGradient: "linear(to-r, purple.600, purple.700)",
            }}
          >
            Aplicar Filtros
          </MotionButton>

          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="outline"
            borderColor="purple.400"
            color="purple.300"
            onClick={handleReset}
            borderRadius="lg"
            px={6}
            py={2}
            fontWeight="semibold"
            leftIcon={<FiRefreshCw />}
            _hover={{
              bg: 'rgba(139, 69, 199, 0.1)',
              borderColor: 'purple.300',
              color: 'purple.200',
            }}
            _active={{
              bg: 'rgba(139, 69, 199, 0.2)',
            }}
          >
            Limpiar
          </MotionButton>
        </HStack>
      </VStack>

      {/* Efecto de brillo sutil */}
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
    </MotionBox>
  );
};

export default LogFilter;