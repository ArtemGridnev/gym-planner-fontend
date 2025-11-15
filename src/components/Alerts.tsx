import { Alert, Stack } from "@mui/material";

type AlertsProps = {
    success?: string | null;
    error?: string | null;
}

export default function Alerts({ success = null, error = null }: AlertsProps) {
    return (
        <>
            {(success || error) &&
                <Stack spacing={1} sx={{ 
                    mb: '1rem',
                    "& .MuiAlert-message": {
                        whiteSpace: "pre-wrap"
                    }
                }} >
                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Stack>
            }
        </>
    );
}