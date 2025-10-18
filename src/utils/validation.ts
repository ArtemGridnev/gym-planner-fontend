export const isNotEmpty = (value: string) => {
    return value.trim().length > 0;
};

export const minLength = (value: string, length: number) => {
    return value.trim().length >= length;
};

export const validateEmail = (email: string):boolean => {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
};


export const validatePassword = (password: string): string | null => {
    const minLength = 8;

    if (password.length < minLength) return `Password must be at least ${minLength} characters`;
    if (!/[A-Z]/.test(password)) return "Password must include at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must include at least one lowercase letter";
    if (!/\d/.test(password)) return "Password must include at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must include at least one special character";

    return null;
};

  
