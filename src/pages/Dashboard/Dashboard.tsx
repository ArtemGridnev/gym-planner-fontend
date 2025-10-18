import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { Button } from "@mui/material";

export default function Dashboard() {
    const { logout } = useAuthContext();

    return (
        <div>
            <Button onClick={() => logout()}>Logout</Button>
            <div>Dashboard</div>
            <Outlet />
        </div>
    );
}