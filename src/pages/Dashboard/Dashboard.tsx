import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import type { SidebarNavItemProps } from "../../components/nav/SidebarNavItem";
import { ChecklistOutlined, FitnessCenterOutlined, SportsMartialArtsOutlined, TuneOutlined } from "@mui/icons-material";
import SideBar from "../../components/dashboard/SideBar";

export default function Dashboard() {
    const drawerWidth = 280;

    const navItems: SidebarNavItemProps[] = [
        {
            text: "Managment",
            icon: TuneOutlined,
            children: [
                {
                    path: '/managment/exercises',
                    text: "Exercises",
                    icon: FitnessCenterOutlined,
                },
                {
                    path: '/managment/trains',
                    text: "Trainings",
                    icon: SportsMartialArtsOutlined,
                }
            ]
        },
        {
            path: '/train-sessions',
            text: 'Train Sessions',
            icon: ChecklistOutlined
        }
    ];

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                height: '100vh',
                background: "#f1f1f1"
            }}
        >
            <SideBar width={drawerWidth} navItems={navItems} />
            <Box sx={{ 
                maxWidth: '1100px',
                height: '100%',
                padding: '1rem', 
                paddingInlineStart: '0',
                marginInline: 'auto', 
                flexGrow: 1
            }}>
                <Outlet />
            </Box>
        </Box>
    );
}