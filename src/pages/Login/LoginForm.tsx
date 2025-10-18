import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import useLogin from "../../hooks/useLogin";
import Alerts from "../../components/Alerts";
import PasswordField from "../../components/form/PasswordField";
import { useEffect } from "react";

type LoginFormProps = {
    onSuccess: () => void
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const {email, setEmail, password, setPassword, loading, success, error, handleSubmit} = useLogin();

    useEffect(() => {
        if (success) onSuccess();
    }, [success]);

    return (
        <>
            <Alerts success={success} error={error} />
            <Typography variant="h5" gutterBottom>
                Sign in
            </Typography>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 2
                }}
                onSubmit={(e) => handleSubmit(e)}
            >
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    required
                    aria-label="Email"
                    onChange={({ target: { value } }) => setEmail(value)}
                    value={email}
                ></TextField>
                <PasswordField
                    label="Password"
                    variant="outlined"
                    required
                    aria-label="Password"
                    onChange={({ target: { value } }) => setPassword(value)}
                    value={password}
                ></PasswordField>
                <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Log In"}
                </Button>
            </Box>
        </>
    );
}