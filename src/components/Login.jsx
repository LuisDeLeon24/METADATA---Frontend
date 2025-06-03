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
    Image
} from "@chakra-ui/react";

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


    const formBackground = useColorModeValue("white", "gray.700");
    const labelColor = useColorModeValue("gray.700", "gray.200");
    const buttonColor = useColorModeValue("blue.500", "blue.600");

    
    return (
        <Flex
            position="relative"
            minH="100vh"
            align="center"
            justify="center"
            p={8}
        >
            <Stack
                direction={{ base: "column", md: "row" }}
                spacing={8}
                align="center"
                position="relative"
                zIndex={1}
            >
                <Box
                    flex="1"
                    bg={formBackground}
                    p={8}
                    borderRadius="md"
                    boxShadow="dark-lg"
                    maxW="md"
                    w="full"
                >
                    <Stack spacing={4}>
                        <Stack align="center">
                            <Heading fontSize="3xl" textAlign="center" color={useColorModeValue('black', 'white')} >
                                Sign in
                            </Heading>
                            <Text fontSize="lg" color="white.600">

                            </Text>
                        </Stack>
                        <form>
                            <VStack spacing={4}>
                                <FormControl color={labelColor} >
                                    <FormLabel></FormLabel>
                                    <CustomInput
                                        field='email'
                                        label='Email'
                                        value={formState.email.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='text'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.email.showError}
                                        validationMessage={emailValidationMessage}
                                    />
                                </FormControl>

                                <FormControl color={labelColor} >
                                    <FormLabel></FormLabel>
                                    <CustomInput
                                        field='password'
                                        label='Password'
                                        value={formState.password.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='password'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.password.showError}
                                        validationMessage={validatePasswordMessage}
                                    />
                                </FormControl>
                                <Button
                                    bg={buttonColor}
                                    color="white"
                                    _hover={{ bg: "blue.700" }}
                                    width="400px"
                                    type="submit"
                                    isDisabled={isSubmitButtonDisabled}
                                    onClick={handleLogin}
                                >
                                    Sign Up
                                </Button>
                            </VStack>
                        </form>
                        <Text textAlign="center" color={useColorModeValue('black', 'gray.300')} >
                            Don't have an account?{" "}
                            <Box
                                as="span"
                                fontWeight="bold"
                                color="blue.300"
                                cursor="pointer"
                                onClick={switchAuthHandler}
                            >
                                Sign Up
                            </Box>
                        </Text>

                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};
