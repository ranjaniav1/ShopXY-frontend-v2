'use client';
import React, { useState } from 'react';
import { Modal, Box, Button, Typography, TextField, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LoginModal = ({ open, onClose, onSwitchToRegister }) => { // Add onSwitchToRegister prop
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="login-modal-title">
            <Box
                sx={{
                    width: 400,
                    margin: 'auto',
                    padding: 3,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography id="login-modal-title" variant="h6" component="h2" mb={2}>
                    {t('Login')}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label={t('Email')}
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label={t('Password')}
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Link component="button" variant="body2" onClick={onSwitchToRegister}> {/* Add switch button */}
                            {t('Don\'t have an account? Register')}
                        </Link>
                        <Button variant="contained" color="primary" type="submit">
                            {t('Login')}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default LoginModal;
