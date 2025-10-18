import { Box, Button, Container, Paper, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <Box 
            sx={{ background: "#f1f1f1" }}
        >
            <Container
                maxWidth="sm"
                sx={{ 
                    display: "flex",
                    height: "100vh",
                    alignItems: "center",
                    justifyContent: "center" 
                }}
            >
                <Paper
                    elevation={2}
                    sx={{
                        width: "100%",
                        maxWidth: "25rem",
                        p: 2
                    }}
                >
                    <LoginForm onSuccess={() => {navigate('/dashboard')}} />
                    <Typography
                        sx={{ mt: 1.5, textAlign: 'center' }}
                    >
                        Don't have an account?{' '}
                        <Link to="/register">Create account</Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}