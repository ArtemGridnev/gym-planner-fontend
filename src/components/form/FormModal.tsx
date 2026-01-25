import { Box } from "@mui/material";
import type { ReactNode } from "react";
import Modal from "../modal/Modal";

type FormModalProps = {
    open?: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
};

export default function FormModal({ open = true, title, onClose, children }: FormModalProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            width="30rem"
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                <Box sx={{ p: '0.75rem' }}>
                    {children}
                </Box>
            </Modal.Content>
        </Modal>
    );
}