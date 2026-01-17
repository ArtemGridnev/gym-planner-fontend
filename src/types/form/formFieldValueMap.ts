import type { SearchSelectOption, SelectOption } from "./formFieldSchema";

export type FormFieldValueMap = {
    text: string;
    textarea: string;
    email: string;
    password: string;
    number: number;
    select: SelectOption | null;
    searchSelect: SearchSelectOption | null;
    searchSelectMultiple: SearchSelectOption[];
    cron: string;
};