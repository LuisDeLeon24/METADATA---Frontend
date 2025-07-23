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
} from "@chakra-ui/react";

const typeOptions = [
  { value: "HOMICIDE", label: "Homicidio" },
  { value: "ASSAULT", label: "Asalto" },
  { value: "TERRORISM", label: "Terrorismo" },
  { value: "SCAM", label: "Estafa" },
  { value: "VANDALISM", label: "Vandalismo" },
  { value: "CYBERBULLYING", label: "Ciberacoso" },
];

const stateOptions = [
  { value: "RECEIVED", label: "Recibido" },
  { value: "IN_PROGRESS", label: "En Proceso" },
  { value: "FINISHED", label: "Finalizado" },
];

const priorityOptions = [
  { value: "HIGH", label: "Alta" },
  { value: "MEDIUM", label: "Media" },
  { value: "LOW", label: "Baja" },
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

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      finishDate: form.finishDate || null,
      researcher: form.researcher,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="2xl">
        <ModalHeader>
          {initialData ? "Editar Caso" : "Nuevo Caso"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Título</FormLabel>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  borderRadius="xl"
                  focusBorderColor="purple.500"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Descripción</FormLabel>
                <Input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  borderRadius="xl"
                  focusBorderColor="purple.500"
                  placeholder="Describe el caso (mínimo 15 caracteres)"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Tipo</FormLabel>
                <Select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  borderRadius="xl"
                  focusBorderColor="purple.500"
                >
                  <option value="">Selecciona tipo</option>
                  {typeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Fecha de Inicio</FormLabel>
                <Input
                  type="date"
                  name="initDate"
                  value={form.initDate}
                  onChange={handleChange}
                  borderRadius="xl"
                  focusBorderColor="purple.500"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Fecha de Finalización</FormLabel>
                <Input
                  type="date"
                  name="finishDate"
                  value={form.finishDate}
                  onChange={handleChange}
                  borderRadius="xl"
                  focusBorderColor="purple.500"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Estado</FormLabel>
                <Select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  borderRadius="xl"
                  focusBorderColor="purple.500"
                >
                  {stateOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Ubicación</FormLabel>
                <Input
                  name="ubication"
                  value={form.ubication}
                  onChange={handleChange}
                  borderRadius="xl"
                  focusBorderColor="purple.500"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Prioridad</FormLabel>
                <Select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  borderRadius="xl"
                  focusBorderColor="purple.500"
                >
                  <option value="">Selecciona prioridad</option>
                  {priorityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Investigador</FormLabel>
                <Select
                  name="researcher"
                  value={form.researcher}
                  onChange={handleChange}
                  borderRadius="xl"
                  focusBorderColor="purple.500"
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
              </FormControl>
              <Flex justify="flex-end" w="full" mt={2}>
                <Button onClick={onClose} borderRadius="xl" mr={3}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  colorScheme="purple"
                  borderRadius="xl"
                >
                  {initialData ? "Actualizar" : "Crear"}
                </Button>
              </Flex>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CaseFormModal;