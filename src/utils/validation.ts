export const isEmpty = (value: any):boolean => {
    if (value === null || value === undefined) return true;

    if (typeof value === 'string') {
        return value.trim().length === 0;
    }

    if (typeof value === 'number') {
        return Number.isNaN(value);
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    return false;
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
