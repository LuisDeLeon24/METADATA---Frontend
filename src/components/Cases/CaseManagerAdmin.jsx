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
  Text,
  Badge,
  VStack,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

import CasesList from "./CasesList";
import CaseFormModal from "./CaseFormModal";
import { useCases } from "../../shared/hooks/useCases";
import { useUsers } from "../../shared/hooks/useUsers";
import { UserContext } from "../../context/UserContext";

// Lista solo para SEARCHER
const CasesListSearcher = ({ cases, handleView, tableBg }) => {
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
              <Td>
                <IconButton
                  icon={<ViewIcon />}
                  size='sm'
                  colorScheme='blue'
                  variant='ghost'
                  onClick={() => handleView && handleView(c)}
                  aria-label='Ver caso'
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {cases.length === 0 && (
        <Box textAlign='center' py={10}>
          <Text fontSize='lg' color={emptyTextColor}>
            No tienes casos asignados
          </Text>
          <Text color={emptySubTextColor}>
            Espera a que te asignen un caso.
          </Text>
        </Box>
      )}
    </TableContainer>
  );
};

const CaseManagerAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCase, setEditingCase] = useState(null);
  const [viewingCase, setViewingCase] = useState(null);
  const { cases, createCase, updateCase, fetchCases } = useCases();
  const { users } = useUsers();
  const { user } = useContext(UserContext);

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
    if (editingCase) {
      await updateCase(editingCase._id, formData);
    } else {
      await createCase(formData);
    }
    await fetchCases();
    onClose();
  };

  const userCases = cases.filter(
    (c) => c.researcher?._id === user?._id || c.researcher === user?._id
  );

  return (
    <Box maxW="7xl" mx="auto" p={6}>
      <Heading mb={6}>Administración de Casos</Heading>

      {user?.role === "ADMIN" && (
        <>
          <Button colorScheme="purple" mb={6} onClick={handleNewCase}>
            + Nuevo Caso
          </Button>
          <CaseFormModal
            isOpen={isOpen}
            onClose={onClose}
            initialData={editingCase}
            onSubmit={handleSubmit}
            users={users}
          />
        </>
      )}

      <Modal isOpen={!!viewingCase} onClose={handleCloseView} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalle del Caso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {viewingCase && (
              <VStack align="start" spacing={3}>
                <Text><b>Título:</b> {viewingCase.title}</Text>
                <Text><b>Tipo:</b> {viewingCase.type}</Text>
                <Text><b>Fecha Inicio:</b> {viewingCase.initDate ? new Date(viewingCase.initDate).toLocaleDateString() : '-'}</Text>
                <Text><b>Estado:</b> <Badge>{viewingCase.state}</Badge></Text>
                <Text><b>Ubicación:</b> {viewingCase.ubication}</Text>
                <Text><b>Prioridad:</b> <Badge>{viewingCase.priority}</Badge></Text>
                <Text><b>Investigador:</b> {viewingCase.researcher?.name || 'Sin asignar'}</Text>
                <Text><b>Descripción:</b> {viewingCase.description}</Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {user?.role === "ADMIN" ? (
        <CasesList cases={cases} handleEdit={handleEdit} handleView={handleView} />
      ) : (
        <CasesListSearcher cases={userCases} handleView={handleView} />
      )}
    </Box>
  );
};

export default CaseManagerAdmin;