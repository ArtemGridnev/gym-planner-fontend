import { Modal as MuiModal, Paper, type ModalProps as MuiModalProps, Box, Typography, IconButton, Divider } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import React from "react";

type ModalProps = Omit<MuiModalProps, 'children'> & {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode;
    width?: number | string;
    height?: number | string;
};

const ModalContext = React.createContext<{ onClose: () => void } | null>(null);

export default function Modal({ open, onClose, width, height, children }: ModalProps) {
    return (
        <ModalContext value={{ onClose }}>
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
                        display: 'flex',
                        width,
                        maxWidth: '100%',
                        height,
                        maxHeight: '100%',
                        borderRadius: (theme) => theme.shape.borderRadius,
                        flexDirection: 'column'
                    }}
                >
                    {children}
                </Paper>
            </MuiModal>
        </ModalContext>
        
    );
};

type ModalHeaderProps = {
    children: React.ReactNode;
};

Modal.Header = function Header({ children }: ModalHeaderProps) {
    const ctx = React.useContext(ModalContext);
  
    if (!ctx) {
      throw new Error("Modal.Header must be used inside <Modal>");
    }
  
    const { onClose } = ctx;
  
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            minHeight: 60,
            p: '0.75rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <Typography px="0.5rem" variant="h6">
            {children}
          </Typography>
  
          <IconButton onClick={onClose} aria-label="Close popup">
            <CloseOutlined />
          </IconButton>
        </Box>
        <Divider />
      </>
    );
  };
  

Modal.Content = function Content({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            {children}
        </Box>
    );
};

Modal.Footer = function Footer({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Divider />
            <Box 
                sx={{
                    minHeight: '60px',
                    padding: '0.75rem',
                    flexShrink: 0
                }}
            >
                {children}
            </Box>
        </>
    );
};