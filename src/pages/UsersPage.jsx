import React, { useEffect, useState } from 'react';
import {
    Box,
    VStack,
    HStack,
    Text,
    Badge,
    Select,
    Button,
    Card,
    CardBody,
    Avatar,
    IconButton,
    useToast,
    Heading,
    Container,
    Divider,
    Flex,
    useColorModeValue,
    Tooltip,
    Grid,
    GridItem,
    Stack
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditIcon, CheckIcon, CloseIcon, AtSignIcon, PhoneIcon, EmailIcon, StarIcon } from '@chakra-ui/icons';
import Navbar from '../components/common/Navbar';
import { useUsers } from '../shared/hooks/useUsers';

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const UserListComponent = () => {
    const toast = useToast();
    const { fetchUsers, users, updateUsers, isLoading } = useUsers();

    useEffect(() => {
        fetchUsers();
    }, [])

    const [editingUser, setEditingUser] = useState(null);
    const [newRole, setNewRole] = useState('');

    const roles = ['USER', 'SEARCHER', 'ADMIN'];

    const getRoleColor = (role) => {
        switch (role) {
            case 'ADMIN':
                return {
                    bg: 'linear-gradient(135deg, #9333EA, #7C3AED)',
                    color: 'white',
                    icon: StarIcon,
                    glow: '0 0 20px rgba(147, 51, 234, 0.6)'
                };
            case 'SEARCHER':
                return {
                    bg: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                    color: 'white',
                    icon: EditIcon,
                    glow: '0 0 15px rgba(139, 92, 246, 0.4)'
                };
            default:
                return {
                    bg: 'linear-gradient(135deg, #6B7280, #4B5563)',
                    color: 'white',
                    icon: AtSignIcon,
                    glow: '0 0 10px rgba(107, 114, 128, 0.3)'
                };
        }
    };

    const handleStartEdit = (userId, currentRole) => {
        setEditingUser(userId);
        setNewRole(currentRole);
    };

    const handleSaveRole = async (userId) => {
        if (!newRole || newRole === '') {
            toast({
                title: "Error",
                description: "Por favor selecciona un rol válido.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }

        try {
            const updateData = { role: newRole };
            await updateUsers(userId, updateData);
            location.reload();

            setEditingUser(null);
            setNewRole('');
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setNewRole('');
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -8,
            scale: 1.02,
            boxShadow: '0 25px 50px rgba(139, 69, 193, 0.4)',
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const avatarVariants = {
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.3 }
        }
    };

    const badgeVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: { delay: 0.2 }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    };

    return (
        <>
            {/* Navbar placeholder */}
            <Navbar />
            <Box
                minH="100vh"
                bg="radial-gradient(ellipse at center, #2D1B47 0%, #1A1A1A 70%)"
                position="relative"
                overflow="hidden"
            >
                {/* Animated background elements */}
                <Box
                    position="absolute"
                    top="10%"
                    left="10%"
                    w="300px"
                    h="300px"
                    bg="radial-gradient(circle, rgba(139, 69, 193, 0.15) 0%, transparent 70%)"
                    borderRadius="full"
                    filter="blur(40px)"
                    animation="float 6s ease-in-out infinite"
                />
                <Box
                    position="absolute"
                    bottom="20%"
                    right="15%"
                    w="200px"
                    h="200px"
                    bg="radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)"
                    borderRadius="full"
                    filter="blur(30px)"
                    animation="float 8s ease-in-out infinite reverse"
                />

                <Container maxW="7xl" py={12} mt='70px' >
                    <MotionBox
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        mb={12}
                        textAlign="center"
                    >
                        <Heading
                            size="3xl"
                            bgGradient="linear(to-r, #E879F9, #C084FC, #A855F7, #9333EA)"
                            bgClip="text"
                            mb={4}
                            fontWeight="black"
                            letterSpacing="tight"
                        >
                            Gestión de Usuarios
                        </Heading>
                        <Text
                            color="gray.300"
                            fontSize="xl"
                            maxW="600px"
                            mx="auto"
                            mb={6}
                        >
                            Administra y controla los roles de usuarios del sistema con elegancia
                        </Text>
                        <Box
                            w="150px"
                            h="2px"
                            bgGradient="linear(to-r, purple.400, purple.600)"
                            mx="auto"
                            borderRadius="full"
                        />
                    </MotionBox>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <VStack spacing={8}>
                            <AnimatePresence mode="popLayout">
                                {users.map((user, index) => (
                                    <MotionCard
                                        key={user._id}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                        layout
                                        w="full"
                                        maxW="5xl"
                                        bg="rgba(30, 30, 46, 0.95)"
                                        backdropFilter="blur(20px)"
                                        border="2px solid"
                                        borderColor="rgba(139, 69, 193, 0.3)"
                                        borderRadius="2xl"
                                        _hover={{
                                            borderColor: 'rgba(139, 69, 193, 0.6)',
                                        }}
                                        style={{
                                            backgroundImage: 'linear-gradient(135deg, rgba(45, 27, 71, 0.4) 0%, rgba(30, 30, 46, 0.8) 100%)'
                                        }}
                                    >
                                        <CardBody p={8}>
                                            <Grid
                                                templateColumns={{ base: "1fr", lg: "auto 1fr auto" }}
                                                gap={8}
                                                alignItems="center"
                                            >
                                                {/* Avatar Section */}
                                                <GridItem>
                                                    <MotionFlex
                                                        direction="column"
                                                        align="center"
                                                        gap={4}
                                                        variants={avatarVariants}
                                                        whileHover="hover"
                                                    >
                                                        <Box position="relative">
                                                            <Avatar
                                                                size="2xl"
                                                                name={`${user.name} ${user.surname}`}
                                                                bg="linear-gradient(135deg, #9333EA, #7C3AED)"
                                                                color="white"
                                                                border="4px solid"
                                                                borderColor="purple.400"
                                                            />
                                                            <Box
                                                                position="absolute"
                                                                top="-2px"
                                                                right="-2px"
                                                                w="20px"
                                                                h="20px"
                                                                bg={getRoleColor(user.role).bg}
                                                                borderRadius="full"
                                                                border="2px solid white"
                                                                boxShadow={getRoleColor(user.role).glow}
                                                            />
                                                        </Box>
                                                        <VStack spacing={1}>
                                                            <Text
                                                                fontSize="2xl"
                                                                fontWeight="bold"
                                                                color="white"
                                                                textAlign="center"
                                                            >
                                                                {user.name}
                                                            </Text>
                                                            <Text
                                                                fontSize="xl"
                                                                fontWeight="medium"
                                                                color="purple.200"
                                                                textAlign="center"
                                                            >
                                                                {user.surname}
                                                            </Text>
                                                        </VStack>
                                                    </MotionFlex>
                                                </GridItem>

                                                {/* User Information */}
                                                <GridItem>
                                                    <Stack spacing={6}>
                                                        <Box
                                                            bg="rgba(139, 69, 193, 0.1)"
                                                            p={6}
                                                            borderRadius="xl"
                                                            border="1px solid"
                                                            borderColor="rgba(139, 69, 193, 0.2)"
                                                        >
                                                            <Text
                                                                fontSize="sm"
                                                                color="purple.300"
                                                                fontWeight="semibold"
                                                                mb={4}
                                                                textTransform="uppercase"
                                                                letterSpacing="wide"
                                                            >
                                                                Información de contacto
                                                            </Text>
                                                            <VStack align="start" spacing={4}>
                                                                <HStack color="gray.200" spacing={4}>
                                                                    <Box
                                                                        p={2}
                                                                        bg="purple.500"
                                                                        borderRadius="md"
                                                                        color="white"
                                                                    >
                                                                        <AtSignIcon />
                                                                    </Box>
                                                                    <VStack align="start" spacing={0}>
                                                                        <Text fontSize="xs" color="gray.400">Username</Text>
                                                                        <Text fontWeight="medium">{user.username}</Text>
                                                                    </VStack>
                                                                </HStack>
                                                                <HStack color="gray.200" spacing={4}>
                                                                    <Box
                                                                        p={2}
                                                                        bg="purple.600"
                                                                        borderRadius="md"
                                                                        color="white"
                                                                    >
                                                                        <EmailIcon />
                                                                    </Box>
                                                                    <VStack align="start" spacing={0}>
                                                                        <Text fontSize="xs" color="gray.400">Email</Text>
                                                                        <Text fontWeight="medium">{user.email}</Text>
                                                                    </VStack>
                                                                </HStack>
                                                                <HStack color="gray.200" spacing={4}>
                                                                    <Box
                                                                        p={2}
                                                                        bg="purple.700"
                                                                        borderRadius="md"
                                                                        color="white"
                                                                    >
                                                                        <PhoneIcon />
                                                                    </Box>
                                                                    <VStack align="start" spacing={0}>
                                                                        <Text fontSize="xs" color="gray.400">Teléfono</Text>
                                                                        <Text fontWeight="medium">{user.phone}</Text>
                                                                    </VStack>
                                                                </HStack>
                                                            </VStack>
                                                        </Box>
                                                    </Stack>
                                                </GridItem>

                                                {/* Role Management */}
                                                <GridItem>
                                                    <VStack spacing={6} minW="250px">
                                                        <Text
                                                            color="purple.200"
                                                            fontSize="sm"
                                                            fontWeight="bold"
                                                            textTransform="uppercase"
                                                            letterSpacing="wide"
                                                        >
                                                            Control de Acceso
                                                        </Text>

                                                        {editingUser === user._id ? (
                                                            <VStack spacing={4} w="full">
                                                                <Select
                                                                    value={newRole}
                                                                    onChange={(e) => setNewRole(e.target.value)}
                                                                    bg="rgba(45, 27, 71, 0.8)"
                                                                    borderColor="purple.400"
                                                                    color="white"
                                                                    borderRadius="xl"
                                                                    _focus={{
                                                                        borderColor: 'purple.300',
                                                                        boxShadow: '0 0 0 3px rgba(139, 69, 193, 0.3)'
                                                                    }}
                                                                    _hover={{
                                                                        borderColor: 'purple.300'
                                                                    }}
                                                                >
                                                                    {roles.map((role) => (
                                                                        <option
                                                                            key={role}
                                                                            value={role}
                                                                            style={{
                                                                                backgroundColor: '#2D1B47',
                                                                                color: 'white'
                                                                            }}
                                                                        >
                                                                            {role}
                                                                        </option>
                                                                    ))}
                                                                </Select>
                                                                <HStack spacing={2}>
                                                                    <Tooltip label="Guardar cambios" placement="top">
                                                                        <IconButton
                                                                            icon={<CheckIcon />}
                                                                            size="lg"
                                                                            colorScheme="green"
                                                                            onClick={() => handleSaveRole(user._id)}
                                                                            aria-label="Guardar cambios"
                                                                            borderRadius="xl"
                                                                            isLoading={isLoading}
                                                                            _hover={{
                                                                                transform: 'scale(1.1)',
                                                                                boxShadow: '0 8px 25px rgba(72, 187, 120, 0.4)'
                                                                            }}
                                                                        />
                                                                    </Tooltip>
                                                                    <Tooltip label="Cancelar" placement="top">
                                                                        <IconButton
                                                                            icon={<CloseIcon />}
                                                                            size="lg"
                                                                            colorScheme="red"
                                                                            onClick={handleCancelEdit}
                                                                            aria-label="Cancelar edición"
                                                                            borderRadius="xl"
                                                                            isDisabled={isLoading}
                                                                            _hover={{
                                                                                transform: 'scale(1.1)',
                                                                                boxShadow: '0 8px 25px rgba(245, 101, 101, 0.4)'
                                                                            }}
                                                                        />
                                                                    </Tooltip>
                                                                </HStack>
                                                            </VStack>
                                                        ) : (
                                                            <VStack spacing={4}>
                                                                <motion.div
                                                                    variants={badgeVariants}
                                                                    initial="initial"
                                                                    animate="animate"
                                                                    whileHover="hover"
                                                                >
                                                                    <Badge
                                                                        bg={getRoleColor(user.role).bg}
                                                                        color="white"
                                                                        px={6}
                                                                        py={3}
                                                                        borderRadius="full"
                                                                        fontSize="md"
                                                                        fontWeight="bold"
                                                                        textTransform="uppercase"
                                                                        letterSpacing="wide"
                                                                        boxShadow={getRoleColor(user.role).glow}
                                                                        border="2px solid rgba(255, 255, 255, 0.1)"
                                                                    >
                                                                        {user.role}
                                                                    </Badge>
                                                                </motion.div>
                                                                <Tooltip label="Editar rol" placement="top">
                                                                    <IconButton
                                                                        icon={<EditIcon />}
                                                                        size="lg"
                                                                        variant="ghost"
                                                                        colorScheme="purple"
                                                                        onClick={() => handleStartEdit(user._id, user.role)}
                                                                        aria-label="Editar rol"
                                                                        borderRadius="xl"
                                                                        isDisabled={isLoading}
                                                                        _hover={{
                                                                            bg: 'purple.600',
                                                                            transform: 'scale(1.15)',
                                                                            boxShadow: '0 8px 25px rgba(139, 69, 193, 0.4)'
                                                                        }}
                                                                        _active={{
                                                                            transform: 'scale(0.95)'
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            </VStack>
                                                        )}
                                                    </VStack>
                                                </GridItem>
                                            </Grid>
                                        </CardBody>
                                    </MotionCard>
                                ))}
                            </AnimatePresence>
                        </VStack>
                    </motion.div>
                </Container>

                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(5deg); }
                    }
                `}</style>
            </Box>
        </>
    );
};

export default UserListComponent;