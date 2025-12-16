import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { Box } from "@mui/material";

export default function PublicRoute() {
    const { user, loading } = useAuthContext();

    if (loading) return <Box>Loading...</Box>;

    if (user) return <Navigate to="/train-sessions" />

    return <Outlet />;
}