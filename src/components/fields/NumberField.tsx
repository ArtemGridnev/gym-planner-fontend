import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";

type NumberFieldProps = Omit<TextFieldProps, 'onChange'> & {
  onChange: NonNullable<TextFieldProps['onChange']>;
  value: number | string;
  min?: number;
  max?: number;
  decimals?: number;
  step?: number;
  unit?: string;
};

export default function NumberField({ min, max, decimals, step = 1, unit, onChange, value, ...props }: NumberFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.target.value;

    if (min !== undefined && newValue < min) event.target.value = min.toString();
    if (max !== undefined && newValue > max) event.target.value = max.toString();

    if (decimals !== undefined) {
        const valueDecimals = newValue.toString().split('.')[1];

        if (valueDecimals?.length > decimals) {
            event.target.value = newValue.toString().split('.')[0] + '.' + valueDecimals.slice(0, decimals);
        }
    }

    onChange(event);
  };

  return (
    <TextField
      {...props}
      value={value ?? ""}
      type="number"
      slotProps={{ 
        input: {
            inputProps: {
                ...(min ? { min } : {}),
                ...(max ? { max } : {}),
                step
            },
            ...(unit ? { endAdornment: <InputAdornment position="end">{unit}</InputAdornment> } : {})
        }
      }}
      onChange={handleChange}
    />
  );
}
