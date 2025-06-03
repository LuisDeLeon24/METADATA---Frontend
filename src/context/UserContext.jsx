import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    useColorModeValue
} from '@chakra-ui/react';
import { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showTokenModal, setShowTokenModal] = useState(false);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const colorT = useColorModeValue('black', 'white');

    const fetchUser = useCallback(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        if (!token) {
            setUser(null);
            return;
        }

        axios
            .get('http://127.0.0.1:3000/Metadata/v1/user/profile', {
                headers: { 'x-token': token }
            })
            .then((res) => {
                setUser(res.data.user);
            })
            .catch(() => {
                setUser(null);
            });
    }, []);

    const handleTokenExpired = useCallback(() => {
        setShowTokenModal(true);
        onOpen();
        localStorage.removeItem('user');
        setUser(null);
    }, [onOpen]);

    useEffect(() => {
        const interval = setInterval(() => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const token = storedUser?.token;
            if (!token) return;

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const exp = payload.exp * 1000;

                if (Date.now() > exp) {
                    handleTokenExpired();
                }
            } catch (e) {
                console.error("Token inválido:", e);
                handleTokenExpired();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [handleTokenExpired]);

    useEffect(() => {
        window.addEventListener('token-expired', handleTokenExpired);
        return () => window.removeEventListener('token-expired', handleTokenExpired);
    }, [handleTokenExpired]);

    const handleModalClose = () => {
        onClose();
        navigate('/');
    };

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <UserContext.Provider value={{ user, refreshUser: fetchUser }}>
            {children}

            <Modal isOpen={isOpen && showTokenModal} onClose={handleModalClose} isCentered>
                <ModalOverlay />
                <ModalContent color={colorT} >
                    <ModalHeader>Sesión Expirada</ModalHeader>
                    <ModalBody>Tu sesión ha expirado. Por favor, inicia sesión nuevamente.</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={handleModalClose}>
                            Ir al Login
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </UserContext.Provider>
    );
};
