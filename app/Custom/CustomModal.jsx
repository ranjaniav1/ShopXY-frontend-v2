// CustomModal.js
import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomIconButton from './CustomIconButton';

const CustomModal = ({ open, onClose, title, children }) => {
    return (
        <Modal open={open} onClose={onClose} >
            <Box
                sx={{
                    width: 400,
                    margin: 'auto',
                    padding: 3,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {/* Modal Heading */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="h2">
                        {title}
                    </Typography>
                    {/* Close Button */}
                    <CustomIconButton onClick={onClose}>
                        <CloseIcon />
                    </CustomIconButton>
                </Box>

                {/* Modal Content */}
                {children}
            </Box>
        </Modal>
    );
};

export default CustomModal;
