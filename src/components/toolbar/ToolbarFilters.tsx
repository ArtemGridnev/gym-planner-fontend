import { Box, InputAdornment } from "@mui/material";
import type { FilterFieldSchema } from "../../types/filterFieldSchema";
import FilterField from "../filters/FilterField";
import { SearchOutlined } from "@mui/icons-material";

type ToolbarFiltersProps = {
    fields: FilterFieldSchema[];
    filters: Record<string, string>;
    handleChange: (field: string, value: string) => void,
    isLoading?: boolean
};

export default function ToolbarFilters({
    fields,
    filters,
    handleChange
}: ToolbarFiltersProps) {
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
                        variant: 'standard',
                        size: 'small',
                        ...(field.type === 'search' ? {
                            slotProps: {
                                input: {
                                    endAdornment: <InputAdornment position="end"><SearchOutlined /></InputAdornment> 
                                }
                            }
                        } : {}),
                        sx: {
                            '& input': {
                                minWidth: `${field.label.length}ch`
                            }
                        }
                    }}
                ></FilterField>
            ))}
        </Box>
    );
}