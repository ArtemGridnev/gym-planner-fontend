import { Box } from "@mui/material";

export default function CardContent({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ flexGrow: 1, minHeight: 0 }}>
            {children}
        </Box>
    );
}