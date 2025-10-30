import { Box, Divider, Drawer, IconButton } from "@mui/material";
import logo from '../../assets/logo/logo.png'
import SidebarNav from "../nav/SidebarNav";
import type { SidebarNavItemProps } from "../nav/SidebarNavItem";
import { useAuthContext } from "../../context/AuthProvider";
import { LogoutOutlined, MoreVertOutlined } from "@mui/icons-material";
import UserProfile from "../UserProfile";
import type { MenuItemProps } from "../menu/MenuItem";
import ButtonMenu from "../ButtonMenu";

type SideBarProps = {
    width: number;
    navItems: SidebarNavItemProps[];
};

export default function SideBar({ width, navItems }: SideBarProps) {
    const { logout } = useAuthContext();

    const profileMenuItems: MenuItemProps[] = [
        {
            icon: LogoutOutlined,
            text: 'logout',
            onClick: () => logout()
        }
    ];

    return (
        <Box
            component="nav"
            sx={{
                position: 'relative',
                width,
                flexShrink: 0,
                borderColor: 'divider',
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: (theme) => theme.shape.borderRadius,
                overflow: 'hidden',
                margin: '1rem'
            }}
            aria-label="dashboard sidebar"
        >
            <Drawer
                variant="permanent"
                sx={{
                    '& .MuiDrawer-paper': {
                        position: 'absolute',
                        width,
                        border: 'unset',
                    }
                }}
                open
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem' }}>
                    <Box
                        component="img"
                        src={logo}
                        alt="My Logo"
                        sx={{ width: 40, height: 40 }}
                    />
                </Box>
                <Divider />
                <SidebarNav items={navItems}></SidebarNav>
                <Divider sx={{ marginTop: 'auto' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem' }}>
                    <UserProfile />
                    <ButtonMenu items={profileMenuItems}>
                        <IconButton>
                            <MoreVertOutlined />
                        </IconButton>
                    </ButtonMenu>
                </Box>
            </Drawer>
        </Box>
    );
}