export type FormFieldSchemaValidator = {
    fn: (value: string) => boolean,
    message: string
};

export type FormFieldSchema = {
    name: string;
    label: string;
    type: "text" | "email" | "password";
    required?: boolean;
    validators?: FormFieldSchemaValidator[] | ((formFields: Record<string, string>) => FormFieldSchemaValidator[]);
};