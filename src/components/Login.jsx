import { useState } from "react";
import { CustomInput } from "./Input";
import { useLogin } from "../shared/hooks/useLogin";
import {
    emailValidationMessage,
    validateEmail,
    validatePassword,
    validatePasswordMessage
} from '../shared/validators'
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    VStack,
    useColorModeValue,
    Stack,
    Heading,
    Text,
    Flex,
    Image,
    Container,
    HStack,
    Divider,
    Icon,
    useBreakpointValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaApple } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin();

    const [formState, setFormState] = useState({
        email: {
            value: "",
            isValid: false,
            showError: false,
        },
        password: {
            value: "",
            isValid: false,
            showError: false,
        },
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleLogin = (e) => {
        e.preventDefault();
        login(formState.email.value, formState.password.value);
    };

    const isSubmitButtonDisabled = isLoading || !formState.email.isValid || !formState.password.isValid;

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const formWidth = useBreakpointValue({ base: "90vw", sm: "400px", md: "450px" });

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            position="relative"
            overflow="hidden"
        >
            {/* Elementos decorativos de fondo */}
            <Box
                position="absolute"
                top="10%"
                left="10%"
                width="200px"
                height="200px"
                borderRadius="50%"
                bg="purple.500"
                opacity="0.1"
                filter="blur(40px)"
            />
            <Box
                position="absolute"
                bottom="10%"
                right="10%"
                width="300px"
                height="300px"
                borderRadius="50%"
                bg="blue.400"
                opacity="0.1"
                filter="blur(60px)"
            />
            
            <Container maxW="container.sm" p={4}>
                <MotionFlex
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    direction="column"
                    align="center"
                    justify="center"
                >
                    <MotionBox
                        variants={itemVariants}
                        bg="rgba(255, 255, 255, 0.05)"
                        backdropFilter="blur(20px)"
                        borderRadius="2xl"
                        p={8}
                        width={formWidth}
                        maxW="450px"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        boxShadow="0 25px 45px rgba(0, 0, 0, 0.3)"
                        position="relative"
                        _before={{
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "1px",
                            bg: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        }}
                    >
                        {/* Header */}
                        <VStack spacing={6} mb={8}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            >
                                <Box
                                    w="60px"
                                    h="60px"
                                    borderRadius="50%"
                                    bg="linear-gradient(135deg, #7209b7, #a855f7)"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    boxShadow="0 10px 25px rgba(114, 9, 183, 0.4)"
                                >
                                    <Text fontSize="2xl" fontWeight="bold" color="white">
                                        ✦
                                    </Text>
                                </Box>
                            </motion.div>
                            
                            <VStack spacing={2}>
                                <Heading
                                    fontSize="2xl"
                                    fontWeight="600"
                                    color="white"
                                    textAlign="center"
                                >
                                    Bienvenido de nuevo
                                </Heading>
                                <Text
                                    fontSize="sm"
                                    color="gray.400"
                                    textAlign="center"
                                >
                                    Ingresa tus credenciales para continuar
                                </Text>
                            </VStack>
                        </VStack>

                        {/* Social Login Buttons */}
                        <VStack spacing={4} mb={6}>
                            <HStack spacing={3} w="full">
                                <Button
                                    flex="1"
                                    variant="outline"
                                    borderColor="rgba(255,255,255,0.2)"
                                    color="white"
                                    _hover={{
                                        bg: "rgba(255,255,255,0.1)",
                                        borderColor: "rgba(255,255,255,0.3)",
                                        transform: "translateY(-2px)"
                                    }}
                                    transition="all 0.3s ease"
                                    leftIcon={<FaGoogle />}
                                    size="sm"
                                >
                                    Google
                                </Button>
                                <Button
                                    flex="1"
                                    variant="outline"
                                    borderColor="rgba(255,255,255,0.2)"
                                    color="white"
                                    _hover={{
                                        bg: "rgba(255,255,255,0.1)",
                                        borderColor: "rgba(255,255,255,0.3)",
                                        transform: "translateY(-2px)"
                                    }}
                                    transition="all 0.3s ease"
                                    leftIcon={<FaGithub />}
                                    size="sm"
                                >
                                    GitHub
                                </Button>
                            </HStack>
                            
                            <HStack w="full" spacing={4}>
                                <Divider borderColor="rgba(255,255,255,0.2)" />
                                <Text fontSize="xs" color="gray.400" whiteSpace="nowrap">
                                    O continúa con email
                                </Text>
                                <Divider borderColor="rgba(255,255,255,0.2)" />
                            </HStack>
                        </VStack>

                        {/* Form */}
                        <Box>
                            <VStack spacing={5}>
                                <motion.div variants={itemVariants} style={{ width: "100%" }}>
                                    <FormControl>
                                        <CustomInput
                                            field='email'
                                            label='Email'
                                            value={formState.email.value}
                                            onChangeHandler={handleInputValueChange}
                                            type='email'
                                            onBlurHandler={handleInputValidationOnBlur}
                                            showErrorMessage={formState.email.showError}
                                            validationMessage={emailValidationMessage}
                                        />
                                    </FormControl>
                                </motion.div>

                                <motion.div variants={itemVariants} style={{ width: "100%" }}>
                                    <FormControl>
                                        <CustomInput
                                            field='password'
                                            label='Contraseña'
                                            value={formState.password.value}
                                            onChangeHandler={handleInputValueChange}
                                            type='password'
                                            onBlurHandler={handleInputValidationOnBlur}
                                            showErrorMessage={formState.password.showError}
                                            validationMessage={validatePasswordMessage}
                                        />
                                    </FormControl>
                                </motion.div>

                                <HStack justify="space-between" w="full">
                                    <Checkbox
                                        colorScheme="purple"
                                        size="sm"
                                        color="gray.300"
                                    >
                                        Recordarme
                                    </Checkbox>
                                    <Text
                                        fontSize="sm"
                                        color="purple.300"
                                        cursor="pointer"
                                        _hover={{ color: "purple.200", textDecoration: "underline" }}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Text>
                                </HStack>

                                <motion.div
                                    variants={itemVariants}
                                    style={{ width: "100%" }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        type="submit"
                                        isLoading={isLoading}
                                        loadingText="Iniciando sesión..."
                                        isDisabled={isSubmitButtonDisabled}
                                        w="full"
                                        h="50px"
                                        bg="linear-gradient(135deg, #7209b7, #a855f7)"
                                        color="white"
                                        fontSize="md"
                                        fontWeight="600"
                                        borderRadius="xl"
                                        _hover={{
                                            bg: "linear-gradient(135deg, #5a067a, #9333ea)",
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 10px 25px rgba(114, 9, 183, 0.4)"
                                        }}
                                        _active={{
                                            transform: "translateY(0px)"
                                        }}
                                        transition="all 0.3s ease"
                                        boxShadow="0 4px 15px rgba(114, 9, 183, 0.3)"
                                        onClick={handleLogin}
                                    >
                                        Iniciar Sesión
                                    </Button>
                                </motion.div>
                            </VStack>
                        </Box>

                        {/* Footer */}
                        <VStack spacing={4} mt={8}>
                            <HStack spacing={1} justify="center">
                                <Text fontSize="sm" color="gray.400">
                                    ¿No tienes una cuenta?
                                </Text>
                                <Text
                                    fontSize="sm"
                                    color="purple.300"
                                    fontWeight="600"
                                    cursor="pointer"
                                    onClick={switchAuthHandler}
                                    _hover={{
                                        color: "purple.200",
                                        textDecoration: "underline"
                                    }}
                                    transition="color 0.2s ease"
                                >
                                    Regístrate aquí
                                </Text>
                            </HStack>
                        </VStack>
                    </MotionBox>
                </MotionFlex>
            </Container>
        </Flex>
    );
};