'use client';
import React, { useState } from 'react';
import { Typography, Divider, CircularProgress, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Visibility, VisibilityOff, PhoneAndroid, Google, Email } from '@mui/icons-material';
import CustomModal from '@/app/Custom/CustomModal';
import CustomInput from '@/app/Custom/CustomInput';
import CustomButton from '@/app/Custom/CustomButton';
import PhoneRegistrationModal from './PhoneRegistrationModal';
import GoogleRegistrationModal from './GoogleRegistrationForm';
import { Login } from '@/app/Service/User';
import { setUser } from '@/app/redux/reducer/user/loginReducer';
import { useDispatch } from 'react-redux';

const LoginModal = ({ open, onClose, onSwitchToRegister }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch(); // Initialize useDispatch
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false); // State for Phone Login Modal
    const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false); // State for Google Login Modal

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await Login({ email, password });
            if (response) {
                dispatch(setUser(response))
                toast.success(t('Login successful'));
                onClose();
            }
        } catch (error) {
            toast.error(t('Login failed. Please check your credentials and try again.'));
            console.error('Login error', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenPhoneModal = () => {
        setIsPhoneModalOpen(true);
        onClose(); // Close the LoginModal when opening the PhoneLoginModal
    };

    const handleOpenGoogleModal = () => {
        setIsGoogleModalOpen(true);
        onClose(); // Close the LoginModal when opening the GoogleLoginModal
    };

    const handleClosePhoneModal = () => {
        setIsPhoneModalOpen(false);
    };

    const handleCloseGoogleModal = () => {
        setIsGoogleModalOpen(false);
    };

    return (<>
        <CustomModal open={open} onClose={onClose} title={t("Login")}>
            {/* Email and Password Inputs */}
            <form onSubmit={handleSubmitEmail}>
                <CustomInput
                    placeholder={t('Email')} startIcon={<Email />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2"
                />
                <CustomInput
                    placeholder={t('Password')}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endIcon={showPassword ? <VisibilityOff /> : <Visibility />}
                    onClickEndIcon={() => setShowPassword(!showPassword)}
                    className="mb-2"
                />
                <CustomButton
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={loading}
                    title={loading ? <CircularProgress size={24} /> : t('Login')}
                    sx={{ mt: 2 }}
                />
            </form>

            {/* "OR" Separator */}
            <Divider sx={{ my: 2 }}>{t('OR')}</Divider>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CustomButton background="#e58d4d"
                    fullWidth onClick={handleOpenPhoneModal}
                    startIcon={<PhoneAndroid />} title={t('Phone')} sx={{ flex: 1 }}
                />
                <Divider orientation="vertical" flexItem />
                <CustomButton
                    background="#d62746" fullWidth onClick={handleOpenGoogleModal}
                    startIcon={<Google />} title={t('Google')} sx={{ flex: 1 }}
                />
            </Box> <Divider sx={{ my: 2 }} />
            <CustomButton
                variant="text" color="primary" fullWidth onClick={onSwitchToRegister}
                title={t('not Registed? Register')} sx={{ mt: 2 }}
            />
        </CustomModal> <PhoneRegistrationModal open={isPhoneModalOpen} onClose={handleClosePhoneModal} />
        {/* Render GoogleLoginModal */}
        <GoogleRegistrationModal open={isGoogleModalOpen} onClose={handleCloseGoogleModal} /></>
    );
};

export default LoginModal;
