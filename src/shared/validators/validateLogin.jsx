export const handleEmailChange = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

export const emailValidationMessage = 'Ingrese un correo valido';

export const handlePasswordChange = (password) => {
    const regex = /^\S{6,12}$/;
    return regex.test(password)
}

export const validatePasswordMessage = 'La contraseña debe tener entre 6 y 12 caracteres sin espacios.'