import { Box, Divider, IconButton, Typography } from "@mui/material";
import CardHeaderAction, { type CardHeaderActionProps } from "./CardHeaderAction";
import { ArrowBackOutlined } from "@mui/icons-material";

type CardHeaderProps = {
    title: string;
    actions?: CardHeaderActionProps[];
    onBack?: () => void;
};

export default function CardHeader({ title, actions, onBack }: CardHeaderProps) {
    return (
        <>
            <Box sx={{
                display: 'flex',
                minHeight: '60px',
                padding: '0.75rem',
                alignItems: 'center',
                flexShrink: 0
            }}>
                {onBack && (
                    <IconButton onClick={() => onBack()} aria-label="Go back">
                        <ArrowBackOutlined />
                    </IconButton>
                )}
                <Typography variant="h5" component="h1" sx={{ paddingInline: '0.5rem' }}>{title}</Typography>
                <Box sx={{ marginInlineStart: 'auto' }}>
                    {actions && actions.map((action) => (
                        <CardHeaderAction {...action} key={action.label} />
                    ))}
                </Box>
            </Box>
            <Divider />
        </>
    );
}