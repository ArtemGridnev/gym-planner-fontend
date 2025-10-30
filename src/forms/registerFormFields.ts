import type { FormFieldSchema } from "../types/formFieldSchema";
import { minLength, validateEmail } from "../utils/validation";

const passwordValidators = [
    { fn: (p: string) => p.length >= 8, message: "Password must be at least 8 characters" },
    { fn: (p: string) => /[A-Z]/.test(p), message: "Password must include at least one uppercase letter" },
    { fn: (p: string) => /[a-z]/.test(p), message: "Password must include at least one lowercase letter" },
    { fn: (p: string) => /\d/.test(p), message: "Password must include at least one number" },
    { fn: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p), message: "Password must include at least one special character" },
];

export const registerFormFields: FormFieldSchema[] = [
    {
        label: "First name",
        name: "firstName",
        type: "text",
        required: true,
        validators: [
            { fn: minLength(2), message: "First name should be at least two characters long." }
        ]
    },
    {
        label: "Last name",
        name: "lastName",
        type: "text",
        required: true,
        validators: [
            { fn: minLength(2), message: "Last name should be at least two characters long." }
        ]
    },
    {
        label: "Email",
        name: "email",
        type: "email",
        required: true,
        validators: [
            { fn: validateEmail, message: "Not valid email." }
        ]
    },
    {
        label: "Password",
        name: "password",
        type: "password",
        required: true,
        validators: [
            ...passwordValidators
        ]
    },
    {
        label: "Validate Password",
        name: "validatePassword",
        type: "password",
        required: true,
        validators: (formValues) => [
            {
                fn: (value: string) => value === formValues.password,
                message: "Passwords do not match"
            }
        ]
    }
];

