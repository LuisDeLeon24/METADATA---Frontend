import { useState } from 'react';
import { CustomInput } from './Input';
import {
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirPassword,
    validateUsernameMessage,
    emailValidationMessage,
    validatePasswordMessage,
    passwordConfirmationMessage,
} from "../shared/validators";
import { useRegister } from '../shared/hooks/useRegister';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    useColorModeValue,
    Stack,
    Heading,
    Text,
    Flex,
    SimpleGrid,
    GridItem,
    Container,
    HStack,
    Divider,
    Icon,
    useBreakpointValue,
    VStack,
    Progress,
    Checkbox
} from '@chakra-ui/react';
import { motion } from "framer-motion";
import { FaUserPlus, FaGoogle, FaGithub, FaApple, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();
    const [currentStep, setCurrentStep] = useState(1);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const [formState, setFormState] = useState({
        email: {
            value: '',
            isValid: false,
            showError: false,
        },
        name: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false,
        },
        passwordConfir: {
            value: '',
            isValid: false,
            showError: false,
        },
        phone: {
            value: '',
            isValid: false,
            showError: false
        },
        surname: {
            value: '',
            isValid: false,
            showError: false
        },
        username: {
            value: '',
            isValid: false,
            showError: false,
        }
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            }
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'name':
                isValid = value.length >= 2;
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            case 'passwordConfir':
                isValid = validateConfirPassword(formState.password.value, value);
                break;
            case 'phone':
                isValid = value.length >= 8;
                break;
            case 'surname':
                isValid = value.length >= 2;
                break;
            case 'username':
                isValid = validateUsername(value);
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid,
            }
        }))
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!agreedToTerms) return;

        const success = await register(
            formState.email.value,
            formState.name.value,
            formState.password.value,
            formState.phone.value,
            formState.surname.value,
            formState.username.value
        );

        if (!success) return;
        switchAuthHandler();
    }

    // Calcular progreso del formulario
    const getFormProgress = () => {
        const fields = ['name', 'surname', 'username', 'phone', 'email', 'password', 'passwordConfir'];
        const validFields = fields.filter(field => formState[field].isValid).length;
        return (validFields / fields.length) * 100;
    };

    const isSubmitButtonDisabled =
        isLoading ||
        !formState.email.isValid ||
        !formState.name.isValid ||
        !formState.password.isValid ||
        !formState.phone.isValid ||
        !formState.surname.isValid ||
        !formState.username.isValid ||
        !formState.passwordConfir.isValid ||
        !agreedToTerms;

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
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

    const formWidth = useBreakpointValue({ base: "90vw", sm: "500px", md: "600px", lg: "650px" });

    return (
        <Flex
        >
            {/* Elementos decorativos de fondo */}
            <Box
                position="absolute"
                top="15%"
                right="15%"
                width="250px"
                height="250px"
                borderRadius="50%"
                bg="purple.500"
                opacity="0.1"
                filter="blur(50px)"
            />
            <Box
                position="absolute"
                bottom="20%"
                left="10%"
                width="200px"
                height="200px"
                borderRadius="50%"
                bg="blue.400"
                opacity="0.15"
                filter="blur(40px)"
            />

            <Container maxW="container.md" p={4}>
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
                        maxW="650px"
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
                        <VStack spacing={6} mb={6}>
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
                                    <FaUserPlus size="24px" color="white" />
                                </Box>
                            </motion.div>

                            <VStack spacing={2}>
                                <Heading
                                    fontSize="2xl"
                                    fontWeight="600"
                                    color="white"
                                    textAlign="center"
                                >
                                    Crear cuenta nueva
                                </Heading>
                                <Text
                                    fontSize="sm"
                                    color="gray.400"
                                    textAlign="center"
                                >
                                    Completa los campos para comenzar tu experiencia
                                </Text>
                            </VStack>

                            {/* Barra de progreso */}
                            <Box w="100%" px={4}>
                                <HStack justify="space-between" mb={2}>
                                    <Text fontSize="xs" color="gray.400">
                                        Progreso del registro
                                    </Text>
                                    <Text fontSize="xs" color="purple.300">
                                        {Math.round(getFormProgress())}%
                                    </Text>
                                </HStack>
                                <Progress
                                    value={getFormProgress()}
                                    size="sm"
                                    borderRadius="full"
                                    bg="rgba(255,255,255,0.1)"
                                    sx={{
                                        '& > div': {
                                            bg: 'linear-gradient(90deg, #7209b7, #a855f7)',
                                        }
                                    }}
                                />
                            </Box>
                        </VStack>

                        {/* Social Register Buttons */}
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
                                    leftIcon={<FaApple />}
                                    size="sm"
                                >
                                    Apple
                                </Button>
                            </HStack>

                            <HStack w="full" spacing={4}>
                                <Divider borderColor="rgba(255,255,255,0.2)" />
                                <Text fontSize="xs" color="gray.400" whiteSpace="nowrap">
                                    O completa el formulario
                                </Text>
                                <Divider borderColor="rgba(255,255,255,0.2)" />
                            </HStack>
                        </VStack>

                        {/* Form */}
                        <Box>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="full">
                                <motion.div variants={itemVariants}>
                                    <FormControl>
                                        <CustomInput
                                            field='name'
                                            label='Nombre'
                                            value={formState.name.value}
                                            onChangeHandler={handleInputValueChange}
                                            type='text'
                                            onBlurHandler={handleInputValidationOnBlur}
                                            showErrorMessage={formState.name.showError}
                                            validationMessage="Ingrese un nombre válido"
                                        />
                                    </FormControl>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <FormControl>
                                        <CustomInput
                                            field='surname'
                                            label='Apellido'
                                            value={formState.surname.value}
                                            onChangeHandler={handleInputValueChange}
                                            type='text'
                                            onBlurHandler={handleInputValidationOnBlur}
                                            showErrorMessage={formState.surname.showError}
                                            validationMessage="Ingrese un apellido válido"
                                        />
                                    </FormControl>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <FormControl>
                                        <CustomInput
                                            field='username'
                                            label='Nombre de usuario'
                                            value={formState.username.value}
                                            onChangeHandler={handleInputValueChange}
                                            type='text'
                                            onBlurHandler={handleInputValidationOnBlur}
                                            showErrorMessage={formState.username.showError}
                                            validationMessage={validateUsernameMessage}
                                        />
                                    </FormControl>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <FormControl>
                                        <CustomInput
                                            field='phone'
                                            label='Teléfono'
                                            value={formState.phone.value}
                                            onChangeHandler={handleInputValueChange}
                                            type='tel'
                                            onBlurHandler={handleInputValidationOnBlur}
                                            showErrorMessage={formState.phone.showError}
                                            validationMessage="Ingrese un número válido"
                                        />
                                    </FormControl>
                                </motion.div>

                                <GridItem colSpan={2}>
                                    <motion.div variants={itemVariants}>
                                        <FormControl>
                                            <CustomInput
                                                field='email'
                                                label='Correo electrónico'
                                                value={formState.email.value}
                                                onChangeHandler={handleInputValueChange}
                                                type='email'
                                                onBlurHandler={handleInputValidationOnBlur}
                                                showErrorMessage={formState.email.showError}
                                                validationMessage={emailValidationMessage}
                                            />
                                        </FormControl>
                                    </motion.div>
                                </GridItem>

                                <motion.div variants={itemVariants}>
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

                                <motion.div variants={itemVariants}>
                                    <FormControl>
                                        <CustomInput
                                            field='passwordConfir'
                                            label='Confirmar contraseña'
                                            value={formState.passwordConfir.value}
                                            onChangeHandler={handleInputValueChange}
                                            type='password'
                                            onBlurHandler={handleInputValidationOnBlur}
                                            showErrorMessage={formState.passwordConfir.showError}
                                            validationMessage={passwordConfirmationMessage}
                                        />
                                    </FormControl>
                                </motion.div>
                            </SimpleGrid>

                            {/* Términos y condiciones */}
                            <motion.div variants={itemVariants}>
                                <Box
                                    mt={6}
                                    p={4}
                                    bg="rgba(255,255,255,0.05)"
                                    borderRadius="xl"
                                    border="1px solid rgba(255,255,255,0.1)"
                                >
                                    <HStack spacing={3}>
                                        <Checkbox
                                            isChecked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            colorScheme="purple"
                                            size="md"
                                        >
                                            <Text fontSize="sm" color="gray.300">
                                                Acepto los{" "}
                                                <Text as="span" color="purple.300" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                                                    términos y condiciones
                                                </Text>
                                                {" "}y la{" "}
                                                <Text as="span" color="purple.300" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                                                    política de privacidad
                                                </Text>
                                            </Text>
                                        </Checkbox>
                                        <FaShieldAlt color="rgba(168, 85, 247, 0.6)" />
                                    </HStack>
                                </Box>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    type="submit"
                                    onClick={handleRegister}
                                    isLoading={isLoading}
                                    loadingText="Creando cuenta..."
                                    isDisabled={isSubmitButtonDisabled}
                                    w="full"
                                    h="50px"
                                    mt={6}
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
                                    leftIcon={<FaCheckCircle />}
                                >
                                    Crear mi cuenta
                                </Button>
                            </motion.div>
                        </Box>

                        {/* Footer */}
                        <VStack spacing={4} mt={8}>
                            <HStack spacing={1} justify="center">
                                <Text fontSize="sm" color="gray.400">
                                    ¿Ya tienes una cuenta?
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
                                    Inicia sesión aquí
                                </Text>
                            </HStack>
                        </VStack>
                    </MotionBox>
                </MotionFlex>
            </Container>
        </Flex>
    );
};