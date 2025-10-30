import { Modal as MuiModal, Paper, type ModalProps as MuiModalProps } from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalContent from "./ModalContent";

type ModalProps = Omit<MuiModalProps, 'children'> & {
    title: string,
    open: boolean,
    onClose: () => void,
    children: React.ReactNode;
    width?: string;
    height?: string;
};

export default function Modal({ title, open, onClose, width, height, children }: ModalProps) {
    return (
        <MuiModal 
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem'
            }}
        >
            <Paper
                sx={{
                    width,
                    maxWidth: '100%',
                    height,
                    maxHeight: '100%',
                    borderRadius: (theme) => theme.shape.borderRadius
                }}
            >
                <ModalHeader title={title} onClose={onClose} />
                <ModalContent>{children}</ModalContent>
            </Paper>
        </MuiModal>
    );
};