export const isNotEmpty = (value: string):boolean => {
    return value.trim().length > 0;
};

export const minLength = (length: number) => (value: string):boolean => {
    return value.trim().length >= length;
};

export const maxLength = (length: number) => (value: string):boolean => {
    return value.trim().length <= length;
};

export const validateEmail = (email: string):boolean => {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
};
