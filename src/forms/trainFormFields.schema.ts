import type { FormFieldSchema } from "../types/form/formFieldSchema";

export const trainFormFields: FormFieldSchema[] = [
    {
        label: "Name",
        name: "name",
        type: "text",
        rules: {
            required: { value: true, message: "This field is required." },
            maxLength: { value: 50, message: "Name have to be less that 50 chars." }
        }
    },
    {
        label: "Recurrence",
        name: "recurrenceCron",
        type: "cron",
        fields: ['weekDays'],
        rules: {
            required: { value: true, message: "This field is required." },
        }
    },
];