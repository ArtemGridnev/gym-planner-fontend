import type { FormCompFieldProps } from "../components/form/Form";

export const loginFormFields: FormCompFieldProps[] = [
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