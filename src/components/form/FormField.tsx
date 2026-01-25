import { TextField } from "@mui/material";
import PasswordField from "../fields/PasswordField";
import type { FormFieldSchema } from "../../types/form/formFieldSchema";
import Select from "../fields/Select";
import SearchSelect from "../fields/SearchSelect";
import NumberField from "../fields/NumberField";
import CronField from "../fields/CronField";
import SearchSelectMultiple from "../fields/SearchSelectMultiple";
import { Controller, useFormContext } from "react-hook-form";

type FormFieldProps = FormFieldSchema & {
    disabled?: boolean;
};

export default function FormField(props: FormFieldProps) {
    const { name, label, rules, type, ...otherProps } = props;
    const { control } = useFormContext();
    const required = rules?.required === true || (typeof rules?.required === 'object' && rules?.required?.value);

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const commonProps = {
                    label,
                    required,
                    error: !!fieldState?.error,
                    helperText: fieldState?.error?.message,
                    ...otherProps,
                };

                switch (type) {
                    case "number":
                        return <NumberField {...field} {...commonProps} type={type} />;
                    case "select":
                        return <Select {...field} {...commonProps} options={props.options} />;
                    case "searchSelect":
                        return (
                            <SearchSelect
                                {...commonProps}
                                input={commonProps}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                options={props.options}
                            />
                        );
                    case "searchSelectMultiple":
                        return (
                            <SearchSelectMultiple
                                input={commonProps}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                options={props.options}
                            />
                        );
                    case "password":
                        return (
                            <PasswordField
                                {...commonProps}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        );
                    case "cron":
                        return (
                            <CronField
                                fields={props.fields}
                                onChange={field.onChange}
                                value={field.value}
                            />
                        );
                    case "textarea":
                        return (
                            <TextField
                                {...commonProps}
                                type={type}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value ?? ""}
                                multiline
                                minRows={4.5}
                                maxRows={6}
                            />
                        );
                    case "text":
                    case "email":
                        return (
                            <TextField
                                {...commonProps}
                                type={type}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value ?? ""}
                            />
                        );
                    default:
                        return <></>;
                }
            }}
        />
    );
}