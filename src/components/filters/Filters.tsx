import { Box, type TextFieldProps } from "@mui/material";
import type { FilterFieldSchema } from "../../types/filterFieldSchema";
import FilterField from "./FilterField";

type FilterProps = {
    fields: FilterFieldSchema[];
    filters: Record<string, string>;
    handleChange: (field: string, value: string) => void;
    inputProps: TextFieldProps
};

export default function Filters({
    fields,
    filters,
    handleChange,
    inputProps
}: FilterProps) {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
            }}
        >
            {fields.map((field, index) => (
                <FilterField
                    {...{
                        ...field,
                        value: filters[field.name],
                        onChange: handleChange
                    }} 
                    key={index}
                    inputProps={{
                        placeholder: field.label,
                        ...inputProps
                    }}
                ></FilterField>
            ))}
        </Box>
    );
}