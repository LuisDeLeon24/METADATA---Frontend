import {
    FormControl,
    FormLabel,
    Textarea,
    FormErrorMessage,
    Input as ChakraInput,
    InputGroup,
    InputRightElement,
    IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { motion } from "framer-motion";

const MotionIconButton = motion(IconButton);

export const CustomInput = ({
    field,
    label,
    value,
    onChangeHandler,
    type = 'text',
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textArea = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const [blinkKey, setBlinkKey] = useState(0);

    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field);
    };

    const handleInputBlur = (event) => {
        onBlurHandler(event.target.value, field);
    };

    const isPasswordField = type === 'password';

    const handleTogglePassword = () => {
        setShowPassword(prev => !prev);
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 300);
        setBlinkKey(prev => prev + 1);
    };

    return (
        <FormControl isInvalid={showErrorMessage} maxW="400px">
            <FormLabel>{label}</FormLabel>
            {textArea ? (
                <Textarea
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleInputBlur}
                    rows={5}
                />
            ) : isPasswordField ? (
                <InputGroup>
                    <ChakraInput
                        type={showPassword ? 'text' : 'password'}
                        value={value}
                        onChange={handleValueChange}
                        onBlur={handleInputBlur}
                    />
                    <InputRightElement>
                        <MotionIconButton
                            key={blinkKey}
                            size="sm"
                            variant="ghost"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            onClick={handleTogglePassword}
                            animate={{ scaleY: [1, 0.1, 1, 0.1, 1] }}
                            transition={{ duration: 1, times: [0, 0.2, 0.4, 0.6, 1] }}
                            outline="none"
                            boxShadow="none"
                            _hover={{ background: 'transparent' }}
                            _focus={{ boxShadow: 'none' }}
                        />

                    </InputRightElement>
                </InputGroup>
            ) : (
                <ChakraInput
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleInputBlur}
                />
            )}
            {showErrorMessage && (
                <FormErrorMessage>{validationMessage}</FormErrorMessage>
            )}
        </FormControl>
    );
};
