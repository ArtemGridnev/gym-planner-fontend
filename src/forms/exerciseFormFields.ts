import type { FormFieldSchema } from '../types/formFieldSchema';

export const registerFormFields: FormFieldSchema[] = [
    {
        label: "First name",
        name: "firstName",
        type: "text",
        required: true,
        validators: []
    },
    {
        label: "Last name",
        name: "lastName",
        type: "text",
        required: true
    },
    {
        label: "Email",
        name: "email",
        type: "email",
        required: true
    },
    {
        label: "Password",
        name: "password",
        type: "password",
        required: true
    },
    {
        label: "Validate Password",
        name: "validatePassword",
        type: "password",
        required: true
    }
];