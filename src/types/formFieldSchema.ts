import type { ElementType } from "react";

export type FormFieldSchemaValidator = {
    fn: (value: string) => boolean;
    message: string;
};

export type SelectOption = {
    value: string,
    label: string
};

export type SearchSelectOption = {
    id: number,
    label: string
};

export type BaseField = {
    name: string;
    label: string;
    required?: boolean;
    validators?: FormFieldSchemaValidator[] | ((formFields: Record<string, string>) => FormFieldSchemaValidator[]);
    startAdornment?: ElementType | string;
    endAdornment?: ElementType | string;
};

export type TextField = {
    type: "text";
};

export type Textarea = {
    type: "textarea"
}

export type EmailField = {
    type: "email"
}

export type PasswordField = {
    type: "password"
}

export type NumberField = {
    type: "number";
    min?: number;
    max?: number;
    decimals?: number;
    step?: number;
    unit?: string;
};

export type SelectField = {
    type: "select";
    options: SelectOption[] | (() => Promise<SelectOption[]>);
};

export type SearchSelectField = {
    type: "searchSelect";
    options: SearchSelectOption[] | (() => Promise<SearchSelectOption[]>);
};

export type SearchSelectMultipleField = {
    type: "searchSelectMultiple";
    options: SearchSelectOption[] | (() => Promise<SearchSelectOption[]>);
};

export type CronField = {
    type: "cron";
    fields: ('weekDays')[];
};

export type FormFieldSchema = BaseField & (TextField | Textarea | EmailField | PasswordField | SelectField | SearchSelectField | SearchSelectMultipleField | NumberField | CronField);

