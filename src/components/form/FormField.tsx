import { TextField } from "@mui/material";
import PasswordField from "../fields/PasswordField";
import type { FormFieldSchema } from "../../types/form/formFieldSchema";
import Select from "../fields/Select";
import SearchSelect from "../fields/SearchSelect";
import NumberField from "../fields/NumberField";
import CronField from "../fields/CronField";
import SearchSelectMultiple from "../fields/SearchSelectMultiple";
import { Controller, useFormContext } from "react-hook-form";

export default function FormField(props: FormFieldSchema) {
    const {
        name,
        label,
        rules,
        type,
        ...otherProps
    } = props;

    const { control } = useFormContext();

    const required = rules?.required === true || (typeof rules?.required === 'object' && rules?.required?.value);


    switch (type) {
        case 'number':
            return (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                        <NumberField
                            {...field}
                            label={label}
                            aria-label={label}
                            type={type}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            {...otherProps}
                        />  
                    )}
                    />
            );

        case 'select':
            return (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                        <Select
                            {...field}
                            label={label}
                            required={required}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            options={props.options}
                        />  
                    )}
                />
            );

        case 'searchSelect':
            return (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                        <SearchSelect 
                            input={{
                                label,
                                error: !!fieldState.error,
                                helperText: fieldState.error?.message,
                                required
                            }}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            options={props.options}
                        />
                    )}
                />
            );
        
        case 'searchSelectMultiple':
            return (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                        <SearchSelectMultiple 
                            input={{
                                label,
                                required,
                                error: !!fieldState.error,
                                helperText: fieldState.error?.message
                            }}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            options={props.options}
                        />
                    )}
                />
            );

        case 'password':
            return (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                        <PasswordField
                        label={label}
                        required={required}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        />
                    )}
                />
            );

        case 'cron':
            return (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field }) => (
                        <CronField 
                            fields={props.fields}
                            onChange={field.onChange}
                            value={field.value}
                        />
                    )}
                />
            );

        case 'textarea': 
        case 'text': 
        case 'email':
            return (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                        <TextField
                            label={label}
                            aria-label={label}
                            type={type}
                            required={required}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            value={field.value}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            {...(type === "textarea" ? {
                                multiline: true,
                                minRows: 4.5,
                                maxRows: 6
                            } : {})}
                        ></TextField>
                    )}
                />
            );
    }
}