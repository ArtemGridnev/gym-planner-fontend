import { FormControl, FormLabel, ToggleButtonGroup as MuiToggleButtonGroup, ToggleButton } from "@mui/material";

type ToggleButtonGroupParams = {
    label: string;
    options: { value: string, name: string }[];
    onChange: (selectedValues: string[]) => void;
    value: string[];
};

export default function ToggleButtonGroup({ label, options, onChange, value }: ToggleButtonGroupParams) {
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
