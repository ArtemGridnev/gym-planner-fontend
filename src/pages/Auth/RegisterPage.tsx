import { Box, Container, Paper, Typography } from "@mui/material";
import RegisterForm from "../../components/auth/forms/RegisterFrom";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
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
                        Sign up
                    </Typography>
                    <RegisterForm onSuccess={() => navigate('/train-sessions')} />
                    <Typography
                        sx={{ mt: 1.5, textAlign: 'center' }}
                    >
                        Already have an account?{' '}
                        <Link to="/login">Sign In</Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}