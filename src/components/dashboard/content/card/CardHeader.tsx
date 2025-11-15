import { Box, Divider, Typography } from "@mui/material";
import CardHeaderAction, { type CardHeaderActionProps } from "./CardHeaderAction";

type CardHeaderProps = {
    title: string;
    actions?: CardHeaderActionProps[]
};

export default function CardHeader({ title, actions }: CardHeaderProps) {
    return (
        <>
            <Box sx={{
                display: 'flex',
                minHeight: '60px',
                padding: '0.75rem',
                alignItems: 'center',
                flexShrink: 0
            }}>
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