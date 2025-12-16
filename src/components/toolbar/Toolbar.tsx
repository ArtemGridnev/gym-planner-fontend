import { Box, type BoxProps } from "@mui/material";

type ToolbarProps = BoxProps;

export default function Toolbar({ children, sx, ...props }: ToolbarProps) {
    return (
        <Box
            sx={{
                position: 'sticky',
                display: 'flex',
                background: 'white',
                padding: '1rem',
                gap: '1rem',
                top: 0,
                left: 0,
                zIndex: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
                flexShrink: 0,
                ...(sx || {})
            }}
            {...props}
        >
            {children}
        </Box>
    );
}