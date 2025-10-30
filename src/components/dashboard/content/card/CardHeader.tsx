import { Box, Divider } from "@mui/material";

export default function CardHeader({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Box sx={{
                display: 'flex',
                minHeight: '60px',
                padding: '0.75rem',
                alignItems: 'center'
            }}>
                {children}
            </Box>
            <Divider />
        </>
    );
}