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
    GridItem

} from '@chakra-ui/react';

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();

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
                isValid = true;
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            case 'passwordConfir':
                isValid = validateConfirPassword(formState.password.value, value);
                break;
            case 'phone':
                isValid = true;
                break;
            case 'surname':
                isValid = true;
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
        const success = await register(
            formState.email.value,
            formState.name.value,
            formState.password.value,
            formState.phone.value,
            formState.surname.value,
            formState.username.value
        );

        if (!success) return; // No hace nada si hubo error
        switchAuthHandler(); // Solo se ejecuta si fue exitoso
    }



    const isSubmitButtonDisabled =
        isLoading ||
        !formState.email.isValid ||
        !formState.name.isValid ||
        !formState.password.isValid ||
        !formState.phone.isValid ||
        !formState.surname.isValid ||
        !formState.username.isValid ||
        !formState.passwordConfir.isValid

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
                    maxW="2xl"
                    w="full"
                >
                    <Stack spacing={4} color={labelColor} >
                        <Stack align="center">
                            <Heading fontSize="3xl" textAlign="center">
                                Sign up
                            </Heading>
                            <Text fontSize="lg" color="white.600">

                            </Text>
                        </Stack>
                        <form>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                                <FormControl>
                                    <FormLabel ></FormLabel>
                                    <CustomInput
                                        field='name'
                                        label='Name'
                                        value={formState.name.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='text'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.name.showError}
                                        validationMessage={""}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel color={labelColor}></FormLabel>
                                    <CustomInput
                                        field='surname'
                                        label='Lastname'
                                        value={formState.surname.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='text'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.surname.showError}
                                        validationMessage={''}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel color={labelColor}></FormLabel>
                                    <CustomInput
                                        field='username'
                                        label='Username'
                                        value={formState.username.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='text'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.username.showError}
                                        validationMessage={validateUsernameMessage}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel color={labelColor}></FormLabel>
                                    <CustomInput
                                        field='phone'
                                        label='Phone'
                                        value={formState.phone.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='text'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.phone.showError}
                                        validationMessage={''}
                                    />
                                </FormControl>

                                <GridItem colSpan={2}>
                                    <FormControl textAlign="center">
                                        <FormLabel color={labelColor}></FormLabel>
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
                                </GridItem>

                                <FormControl>
                                    <FormLabel color={labelColor}></FormLabel>
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

                                <FormControl>
                                    <FormLabel color={labelColor}></FormLabel>
                                    <CustomInput
                                        field='passwordConfir'
                                        label='Confirm Password'
                                        value={formState.passwordConfir.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='password'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.passwordConfir.showError}
                                        validationMessage={passwordConfirmationMessage}
                                    />
                                </FormControl>
                            </SimpleGrid>

                            <Flex justify="center" mt={4}>
                                <Button
                                    bg={buttonColor}
                                    color="white"
                                    _hover={{ bg: "blue.700" }}
                                    width="500px"
                                    type="submit"
                                    isDisabled={isSubmitButtonDisabled}
                                    onClick={handleRegister}
                                >
                                    Sign Up
                                </Button>
                            </Flex>
                        </form>

                        <Text textAlign="center">
                            Already have an account{" "}
                            <Box
                                as="span"
                                fontWeight="bold"
                                color="blue.300"
                                cursor="pointer"
                                onClick={switchAuthHandler}
                            >
                                Sign In
                            </Box>
                        </Text>

                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};