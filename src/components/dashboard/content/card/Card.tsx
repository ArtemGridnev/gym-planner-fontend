import { Box } from "@mui/material";

type ContentCardProps = {
    children: React.ReactNode;
    width?: string;
};

export default function ContentCard({ children, width = '100%' }: ContentCardProps) {
    return (
        <Box 
            sx={{ 
                display: 'flex',
                width,
                height: '100%',
                background: 'white',
                borderColor: 'divider', 
                borderWidth: 1, 
                borderStyle: 'solid',
                borderRadius: (theme) => theme.shape.borderRadius,
                flexDirection: 'column'
            }}
        >
            {children}
        </Box>
    );
}