'use client';
import React, { useState } from 'react';
import { Modal, Box, Button, Typography, TextField, Link, ButtonGroup, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Login } from '@/app/Service/LoginUser';
import toast from 'react-hot-toast';

const LoginModal = ({ open, onClose, onSwitchToRegister }) => {
    const { t } = useTranslation();
    const [selectedMethod, setSelectedMethod] = useState('email'); // 'email', 'phone', 'google'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await Login({ email, password });
            if (response) {
                toast.success(t('Login successful'));
                onClose(); // Close the modal
                // Optionally, store token or user data
                // localStorage.setItem('authToken', response.token);
            }
        } catch (error) {
            toast.error(t('Login failed. Please check your credentials and try again.'));
            console.error('Login error', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleSubmitPhone = async (e) => {
        e.preventDefault();
        // Add your phone login logic here
        toast.success(t('Phone login not implemented yet'));
        onClose();
    };

    const handleGoogleLogin = () => {
        // Add your Google login logic here
        toast.success(t('Google login not implemented yet'));
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
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <Typography id="login-modal-title" variant="h6" component="h2" mb={2}>
                    {t('Login')}
                </Typography>

                {/* Method Selection Button Group */}
                <ButtonGroup
                    fullWidth
                    variant="contained"
                    aria-label="login method selection"
                    sx={{ mb: 2 }}
                >
                    <Button
                        variant={selectedMethod === 'email' ? 'contained' : 'outlined'}
                        onClick={() => setSelectedMethod('email')}
                    >
                        {t('Manualy')}
                    </Button>
                    <Button
                        variant={selectedMethod === 'phone' ? 'contained' : 'outlined'}
                        onClick={() => setSelectedMethod('phone')}
                    >
                        {t('Phone')}
                    </Button>
                    <Button
                        variant={selectedMethod === 'google' ? 'contained' : 'outlined'}
                        onClick={() => setSelectedMethod('google')}
                    >
                        {t('Google')}
                    </Button>
                </ButtonGroup>

                {/* Conditional Rendering Based on Selected Method */}
                {selectedMethod === 'email' && (
                    <form onSubmit={handleSubmitEmail}>
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
                            <Link component="button" variant="body2" onClick={onSwitchToRegister}>
                                {t('Don\'t have an account? Register')}
                            </Link>
                            <Button variant="contained" color="primary" type="submit" disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : t('Login')}
                            </Button>
                        </Box>
                    </form>
                )}

                {selectedMethod === 'phone' && (
                    <form onSubmit={handleSubmitPhone}>
                        <TextField
                            label={t('Phone Number')}
                            type="tel"
                            fullWidth
                            margin="normal"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                        <TextField
                            label={t('OTP')}
                            type="text"
                            fullWidth
                            margin="normal"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                            <Link component="button" variant="body2" onClick={onSwitchToRegister}>
                                {t('Don\'t have an account? Register')}
                            </Link>
                            <Button variant="contained" color="primary" type="submit">
                                {t('Login')}
                            </Button>
                        </Box>
                    </form>
                )}

                {selectedMethod === 'google' && (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleGoogleLogin}
                    >
                        {t('Login with Google')}
                    </Button>
                )}
            </Box>
        </Modal>
    );
};

export default LoginModal;
