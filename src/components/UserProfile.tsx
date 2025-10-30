import { Avatar, Box, Typography } from "@mui/material";
import { useAuthContext } from "../context/AuthProvider";

export default function UserProfile() {
    const { user } = useAuthContext();

    if (!user) return;

    const userFullName = `${user.firstName} ${user.lastName}`;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}
        >
            <Avatar  />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography variant="body2">{userFullName}</Typography>
                <Typography variant="caption" color="text.secondary">{user.email}</Typography>
            </Box>
        </Box>
    )
}