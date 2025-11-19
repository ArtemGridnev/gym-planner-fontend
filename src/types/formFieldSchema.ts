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

type BaseField = {
    name: string;
    label: string;
    required?: boolean;
    validators?: FormFieldSchemaValidator[] | ((formFields: Record<string, string>) => FormFieldSchemaValidator[]);
    startAdornment?: ElementType | string;
    endAdornment?: ElementType | string;
};

type TextField = BaseField & {
    type: "text" | "textarea" | "email" | "password";
}

type NumberField = BaseField & {
    type: "number";
    min?: number;
    max?: number;
    decimals?: number;
    step?: number;
    unit?: string;
}

type SelectField = BaseField & {
    type: "select";
    options: SelectOption[] | (() => Promise<SelectOption[]>);
}

type SearchSelectField = BaseField & {
    type: "searchSelect";
    options: SearchSelectOption[] | (() => Promise<SearchSelectOption[]>);
}

type CronField = BaseField & {
    type: "cron";
    fields: ('weekDays')[];
}

export type FormFieldSchema = TextField | SelectField | SearchSelectField | NumberField | CronField;

