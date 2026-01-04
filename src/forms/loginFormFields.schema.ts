import type { FormFieldSchema } from "../types/form/formFieldSchema";

export const loginFormFields: FormFieldSchema[] = [
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
    }
];