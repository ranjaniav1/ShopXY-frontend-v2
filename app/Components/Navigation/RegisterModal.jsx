'use client';
import React, { useState } from 'react';
import { Typography, CircularProgress, Divider, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import { PhoneAndroid, Google, Email, Person } from '@mui/icons-material';
import CustomModal from '@/app/Custom/CustomModal';
import CustomInput from '@/app/Custom/CustomInput';
import PasswordInput from '@/app/Common/PasswordInput';
import FileInput from '@/app/Common/FileInput';
import { handleChange, handleFileChange, handleSubmit } from '@/app/utils/RegisterUtils';
import CustomButton from '@/app/Custom/CustomButton';
import PhoneRegistrationModal from './PhoneRegistrationModal';
import GoogleRegistrationModal from './GoogleRegistrationForm';

const RegisterModal = ({ open, onClose, onSwitchToLogin }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ fullname: '', email: '', password: '', phone: '' });
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false); // State for Phone Registration Modal
    const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false); // State for Google Registration Modal
    // Handler to open Phone Registration Modal
    const handleOpenPhoneModal = () => {
        setIsPhoneModalOpen(true);
        onClose(); // Close the RegisterModal when opening the PhoneRegistrationModal
    };

    // Handler to close Phone Registration Modal
    const handleClosePhoneModal = () => {
        setIsPhoneModalOpen(false);
    };// Handler to open Google Registration Modal
    const handleOpenGoogleModal = () => {
        setIsGoogleModalOpen(true);
        onClose(); // Close the RegisterModal when opening the GoogleRegistrationModal
    };

    // Handler to close Google Registration Modal
    const handleCloseGoogleModal = () => {
        setIsGoogleModalOpen(false);
    };
    return (
        <>
            <Toaster position="bottom-center"  />
            <CustomModal open={open} onClose={onClose} title={t("Register")}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formData, avatar, setLoading, onClose);
                }}>
                    <CustomInput
                        placeholder={t('Email')}
                        name="email"
                        value={formData.email}
                        onChange={handleChange(setFormData)}
                        startIcon={<Email />}
                        className="mb-2"
                        required
                    />
                    <CustomInput
                        placeholder={t('Full Name')}
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange(setFormData)}
                        startIcon={<Person />}
                        className="mb-2"
                        required
                    />
                    <PasswordInput
                        t={t}
                        showPassword={showPassword}
                        handleChange={handleChange(setFormData)}
                        setShowPassword={setShowPassword}
                        value={formData.password}
                    />
                    <CustomInput
                        placeholder={t('Phone')}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange(setFormData)}
                        startIcon={<PhoneAndroid />}
                        className="mb-2"
                        required
                    />
                    <FileInput
                        t={t}
                        avatar={avatar}
                        handleFileClick={() => document.getElementById('avatar-upload').click()}
                        handleFileChange={handleFileChange(setAvatar)}
                    />
                    <CustomButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        disabled={loading}
                        title={loading ? <CircularProgress size={24} /> : t('Register')}
                    />
                    <Divider sx={{ my: 1 }}>{t('OR')}</Divider>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CustomButton
                            background="#e58d4d"
                            fullWidth
                            onClick={handleOpenPhoneModal}
                            startIcon={<PhoneAndroid />}
                            title={t('Phone')}
                            sx={{ flex: 1 }}
                        />
                        <Divider orientation="vertical" flexItem />
                        <CustomButton
                            background="#d62746"
                            fullWidth
                            onClick={handleOpenGoogleModal}
                            startIcon={<Google />}
                            title={t('Google')}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <CustomButton
                        variant="text"
                        color="primary"
                        fullWidth
                        onClick={onSwitchToLogin}
                        title={t('Already have an account? Login')}
                        sx={{ mt: 2 }}
                    />
                </form>
            </CustomModal>
            {/* rendeer phone registrationmodal */}
            <PhoneRegistrationModal open={isPhoneModalOpen} onClose={handleClosePhoneModal} />
            <GoogleRegistrationModal open={isGoogleModalOpen} onClose={handleCloseGoogleModal} />
        </>
    );
};

export default RegisterModal;
