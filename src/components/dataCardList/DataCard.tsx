import { Box, IconButton, Typography } from "@mui/material";
import type { ElementType } from "react";
import type { MenuItemProps } from "../menu/MenuItem";
import ButtonMenu from "../ButtonMenu";
import { MoreVertOutlined } from "@mui/icons-material";

export type DataCardProps = {
    icon?: ElementType;
    title: string;
    children?: React.ReactNode;
    menuItems?: MenuItemProps[];
}

export default function DataCard({ icon: Icon, title, children, menuItems }: DataCardProps) {
    return (
        <Box sx={{
            display: 'flex',
            gap: '0.75rem',
            padding: '0.75rem',
            alignItems: 'flex-start',
            borderColor: 'divider',
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: (theme) => theme.shape.borderRadius,
        }}>
            {Icon && (
                <Icon sx={{ 
                    color: 'text.secondary'
                }} />
            )}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ marginBottom: '0.75rem' }}>{title}</Typography>
                {children}
            </Box>
            {menuItems && (
                <ButtonMenu items={menuItems}>
                    <IconButton>
                        <MoreVertOutlined />
                    </IconButton>
                </ButtonMenu>
            )}
        </Box>
    );
}