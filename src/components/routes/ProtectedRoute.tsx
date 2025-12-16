import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import LoginPage from "../../pages/auth/LoginPage";
import { Box } from "@mui/material";

export default function ProtectedRoute() {
    const { user, loading } = useAuthContext();

    if (loading) return <Box>Loading...</Box>;

    if (!user) return <LoginPage />;

    return <Outlet />;
}