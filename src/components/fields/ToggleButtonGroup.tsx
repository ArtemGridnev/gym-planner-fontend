import { FormControl, FormLabel, ToggleButtonGroup as MuiToggleButtonGroup, type ToggleButtonGroupProps as MuiToggleButtonGroupProps, ToggleButton } from "@mui/material";

type ToggleButtonGroupProps = {
    label: string;
    options: { value: string, name: string }[];
    onChange: (selectedValues: string[]) => void;
    value: string[];
} & Omit<MuiToggleButtonGroupProps, 'onChange' | 'value'>;

export default function ToggleButtonGroup({ label, options, onChange, value }: ToggleButtonGroupProps) {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
        <MuiToggleButtonGroup
            value={value}
            onChange={(_: any, values: string[]) => onChange(values)}
            size="small"
            sx={{
                flexWrap: "wrap",
            }}
        >
            {options.map(({ value, name }) => (
                <ToggleButton
                    key={value}
                    value={value}
                    sx={{ px: 2 }}
                >
                    {name}
                </ToggleButton>
            ))}
        </MuiToggleButtonGroup>
    </FormControl>
  );
}
