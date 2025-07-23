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
  useColorModeValue,
} from '@chakra-ui/react'
import { EditIcon, ViewIcon } from '@chakra-ui/icons'

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

const CasesList = ({ cases = [], handleEdit, handleView, tableBg }) => {
  const headBg = useColorModeValue('gray.50', 'gray.700');
  const emptyTextColor = useColorModeValue('gray.500', 'gray.400');
  const emptySubTextColor = useColorModeValue('gray.400', 'gray.600');

  return (
    <TableContainer bg={tableBg} borderRadius='2xl' shadow='lg'>
      <Table variant='simple'>
        <Thead bg={headBg}>
          <Tr>
            <Th>Título</Th>
            <Th>Tipo</Th>
            <Th>Fecha Inicio</Th>
            <Th>Estado</Th>
            <Th>Ubicación</Th>
            <Th>Prioridad</Th>
            <Th>Investigador</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cases.map((c) => (
            <Tr key={c._id}>
              <Td fontWeight='medium'>{c.title}</Td>
              <Td>
                <Badge colorScheme='purple' variant='subtle'>
                  {typeLabels[c.type] || c.type}
                </Badge>
              </Td>
              <Td>{c.initDate ? new Date(c.initDate).toLocaleDateString() : '-'}</Td>
              <Td>
                <Badge colorScheme={
                  c.state === "RECEIVED" ? "gray" :
                  c.state === "IN_PROGRESS" ? "orange" :
                  c.state === "FINISHED" ? "green" : "gray"
                } variant='subtle'>
                  {stateLabels[c.state] || c.state}
                </Badge>
              </Td>
              <Td>{c.ubication}</Td>
              <Td>
                <Badge colorScheme={
                  c.priority === "HIGH" ? "red" :
                  c.priority === "MEDIUM" ? "yellow" :
                  c.priority === "LOW" ? "green" : "gray"
                } variant='subtle'>
                  {priorityLabels[c.priority] || c.priority}
                </Badge>
              </Td>
              <Td>{c.researcher?.name || 'Sin asignar'}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    icon={<ViewIcon />}
                    size='sm'
                    colorScheme='blue'
                    variant='ghost'
                    onClick={() => handleView && handleView(c)}
                    aria-label='Ver caso'
                  />
                  <IconButton
                    icon={<EditIcon />}
                    size='sm'
                    colorScheme='brand'
                    variant='ghost'
                    onClick={() => handleEdit && handleEdit(c)}
                    aria-label='Editar caso'
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {cases.length === 0 && (
        <Box textAlign='center' py={10}>
          <Text fontSize='lg' color={emptyTextColor}>
            No hay casos registrados
          </Text>
          <Text color={emptySubTextColor}>
            Crea tu primer caso haciendo clic en "Nuevo Caso"
          </Text>
        </Box>
      )}
    </TableContainer>
  );
};

export default CasesList;