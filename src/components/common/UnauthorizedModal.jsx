import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Text
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
  
  const UnauthorizedModal = () => {
    const navigate = useNavigate();
  
    const handleRedirect = () => {
      localStorage.removeItem('user'); // Limpia si quieres forzar login nuevo
      navigate('/');
    };
  
    return (
      <Modal isOpen={true} isCentered onClose={handleRedirect}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Acceso no autorizado</ModalHeader>
          <ModalBody>
            <Text>No tienes permiso para ver esta página.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleRedirect}>
              Volver al login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default UnauthorizedModal;
  