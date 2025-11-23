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
    onClick?: () => void;
}

export default function DataCard({ icon: Icon, title, children, menuItems, onClick }: DataCardProps) {
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
            {Icon && (
                <Icon 
                    sx={{ 
                        color: 'text.secondary',
                        ...(onClick && { cursor: 'pointer' })
                    }}
                    {...(onClick && { onClick: () => onClick() })}
                 />
            )}
            <Box 
                sx={{ 
                    flexGrow: 1,
                    ...(onClick && { cursor: 'pointer' })
                }}
                {...(onClick && { onClick: () => onClick() })}
            >
                <Typography variant="body1" sx={{ marginBottom: '0.75rem' }}>{title}</Typography>
                {children}
            </Box>
            {menuItems && (
                <Box onClick={(e) => e.preventDefault()}>
                    <ButtonMenu items={menuItems}>
                        <IconButton>
                            <MoreVertOutlined />
                        </IconButton>
                    </ButtonMenu>
                </Box>
            )}
        </Box>
    );
}