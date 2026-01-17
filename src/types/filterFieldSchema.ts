import type { BaseField, EmailField, NumberField, SearchSelectField, SearchSelectMultipleField, SelectField, TextField } from "./form/formFieldSchema";

type SearchField = {
    type: 'search';
};

export type FilterFieldSchema = Omit<BaseField, 'rules'> 
& (SearchField | TextField | EmailField | SelectField | SearchSelectField | SearchSelectMultipleField | NumberField) & {
    debounce?: number
};