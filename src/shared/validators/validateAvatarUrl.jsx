
export const validationAvatarUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}

export const avatarUrlValidationMessage = 'Esta no es una URL valida';