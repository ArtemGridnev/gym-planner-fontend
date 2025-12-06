import { Box, IconButton, Skeleton, Typography } from "@mui/material";
import ButtonMenu from "../../ButtonMenu";
import { MoreVertOutlined } from "@mui/icons-material";
import { getRandomInt } from "../../../utils/random";

export type DataCardProps = {
    icon?: boolean;
    children?: React.ReactNode;
    menuItems?: boolean;
};

export default function DataCardSkeleton({ icon, children, menuItems }: DataCardProps) {
    return (
        <Box 
            sx={{
                display: 'flex',
                background: 'white',
                gap: '0.75rem',
                padding: '0.75rem',
                alignItems: 'flex-start',
                borderColor: 'divider',
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: (theme) => theme.shape.borderRadius,
            }}
        >
            {icon && (
                <Skeleton 
                    variant="circular"  
                    sx={{
                        width: '1.5rem',
                        height: '1.5rem',
                    }}
                />
            )}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ marginBottom: '0.75rem' }}>
                    <Skeleton sx={{
                        width: `${getRandomInt(25, 50)}%`
                    }} />
                </Typography>
                {children}
            </Box>
            {menuItems && (
                <Skeleton 
                    variant="circular"  
                    sx={{
                        width: '2rem',
                        height: '2rem',
                    }}
                />
            )}
        </Box>
    );
}