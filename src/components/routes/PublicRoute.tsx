import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

export default function PublicRoute() {
    const { user, loading } = useAuthContext();

    if (loading) return <div>Loading...</div>;

    if (user) return <Navigate to="/dashboard" />

    return <Outlet />;
}