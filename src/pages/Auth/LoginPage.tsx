import { Box, Container, Paper, Typography } from "@mui/material";
import LoginForm from "../../components/auth/forms/LoginForm";
import { Link, useNavigate } from "react-router-dom";

type LoginPageProps = {
    redirectPath?: string | null;
};

export default function LoginPage({ redirectPath = null } : LoginPageProps) {
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
                    <Typography variant="h5" component="h1" gutterBottom>
                        Sign in
                    </Typography>
                    <LoginForm onSuccess={() => navigate(redirectPath ?? '/train-sessions')} />
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