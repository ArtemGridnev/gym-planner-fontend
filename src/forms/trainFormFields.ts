import type { FormFieldSchema } from "../types/formFieldSchema";
import { maxLength } from "../utils/validation";

export const trainFormFields: FormFieldSchema[] = [
    {
        label: "Name",
        name: "name",
        type: "text",
        required: true,
        validators: [
            { fn: maxLength(50), message: "Name have to be less that 50 chars." }
        ]
    },
    {
        label: "Recurrence",
        name: "recurrenceCron",
        type: "cron",
        fields: ['weekDays'],
        required: true,
        validators: []
    },
];