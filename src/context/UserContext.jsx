import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Box,
    Text,
    Icon,
    VStack,
    HStack
} from '@chakra-ui/react';
import { createContext, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiClock, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Crear componentes motion con Chakra UI
const MotionModalContent = motion(ModalContent);
const MotionBox = motion(Box);
const MotionButton = motion(Button);

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showTokenModal, setShowTokenModal] = useState(false);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fetchUser = useCallback(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        if (!token) {
            setUser(null);
            return;
        }

        axios
            .get('https://metadata-backend-a4er.onrender.com/metadata/v1/users/profile', {
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

    // Variantes de animación para framer-motion
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: -50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: -50,
            transition: { duration: 0.3 }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                delay: 0.2,
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 8px 25px rgba(138, 43, 226, 0.3)",
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.95 }
    };

    return (
        <UserContext.Provider value={{ user, refreshUser: fetchUser }}>
            {children}

            <AnimatePresence>
                {isOpen && showTokenModal && (
                    <Modal
                        isOpen={isOpen && showTokenModal}
                        onClose={handleModalClose}
                        isCentered
                        closeOnOverlayClick={false}
                    >
                        <ModalOverlay
                            as={motion.div}
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            bg="blackAlpha.700"
                            backdropFilter="blur(8px)"
                        />
                        <MotionModalContent
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            bg="linear-gradient(135deg, #1a1a1a 0%, #2d1b3d 50%, #1a1a1a 100%)"
                            border="1px solid"
                            borderColor="purple.500"
                            borderRadius="20px"
                            boxShadow="0 20px 60px rgba(138, 43, 226, 0.2), 0 0 40px rgba(138, 43, 226, 0.1)"
                            maxW="400px"
                            color="white"
                            position="relative"
                            overflow="hidden"
                        >
                            {/* Efecto de brillo en el borde */}
                            <Box
                                position="absolute"
                                top="-2px"
                                left="-2px"
                                right="-2px"
                                bottom="-2px"
                                borderRadius="20px"
                                bg="linear-gradient(45deg, transparent, rgba(138, 43, 226, 0.5), transparent)"
                                zIndex="-1"
                                as={motion.div}
                                animate={{
                                    background: [
                                        "linear-gradient(45deg, transparent, rgba(138, 43, 226, 0.5), transparent)",
                                        "linear-gradient(45deg, transparent, rgba(147, 51, 234, 0.5), transparent)",
                                        "linear-gradient(45deg, transparent, rgba(138, 43, 226, 0.5), transparent)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            <ModalHeader
                                pb={2}
                                textAlign="center"
                                borderBottom="1px solid"
                                borderColor="purple.800"
                            >
                                <VStack spacing={3}>
                                    <MotionBox
                                        variants={iconVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <Icon
                                            as={FiAlertCircle}
                                            boxSize={12}
                                            color="purple.400"
                                            filter="drop-shadow(0 0 10px rgba(138, 43, 226, 0.6))"
                                        />
                                    </MotionBox>
                                    <Text
                                        fontSize="xl"
                                        fontWeight="bold"
                                        bgGradient="linear(to-r, white, purple.300)"
                                        bgClip="text"
                                    >
                                        Sesión Expirada
                                    </Text>
                                </VStack>
                            </ModalHeader>

                            <ModalBody py={6}>
                                <VStack spacing={4} textAlign="center">
                                    <HStack spacing={2} color="gray.300">
                                        <Icon as={FiClock} />
                                        <Text fontSize="sm">Tiempo de sesión agotado</Text>
                                    </HStack>
                                    <Text
                                        color="gray.200"
                                        fontSize="md"
                                        lineHeight="1.6"
                                    >
                                        Tu sesión ha expirado por motivos de seguridad.
                                        Por favor, inicia sesión nuevamente para continuar.
                                    </Text>

                                    {/* Indicador visual animado */}
                                    <MotionBox
                                        w="60px"
                                        h="2px"
                                        bg="purple.500"
                                        borderRadius="full"
                                        animate={{
                                            scaleX: [1, 1.2, 1],
                                            opacity: [0.5, 1, 0.5]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </VStack>
                            </ModalBody>

                            <ModalFooter
                                justifyContent="center"
                                borderTop="1px solid"
                                borderColor="purple.800"
                                pt={4}
                            >
                                <MotionButton
                                    onClick={handleModalClose}
                                    bg="linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #9333EA 100%)"
                                    color="white"
                                    size="lg"
                                    borderRadius="12px"
                                    border="1px solid"
                                    borderColor="purple.400"
                                    _hover={{ bg: "none" }}
                                    _active={{ bg: "none" }}
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    leftIcon={<Icon as={FiLogOut} />}
                                    minW="200px"
                                    fontWeight="semibold"
                                    boxShadow="0 4px 15px rgba(138, 43, 226, 0.2)"
                                >
                                    Ir al Login
                                </MotionButton>
                            </ModalFooter>
                        </MotionModalContent>
                    </Modal>
                )}
            </AnimatePresence>
        </UserContext.Provider>
    );
};