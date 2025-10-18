import type { FormCompFieldProps } from "../components/form/Form";

export const registerFormFields: FormCompFieldProps[] = [
    {
        label: "First name",
        name: "firstName",
        type: "text",
        required: true
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