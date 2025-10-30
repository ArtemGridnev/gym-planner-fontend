import { CloseOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";

type ModalHeaderProps = {
    title: string;
    onClose: () => void;
};

export default function ModalHeader({ title, onClose }: ModalHeaderProps) {
    return (
        <>
            <Box sx={{
                display: 'flex',
                minHeight: '60px',
                padding: '0.75rem',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography sx={{ paddingInline: '0.5rem' }} variant="h6">{title}</Typography>
                <Box>
                    <IconButton onClick={() => onClose()} aria-label="Close popup">
                        <CloseOutlined />
                    </IconButton>
                </Box>
            </Box>
            <Divider />
        </>
    );
}