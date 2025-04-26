'use client';
import React, { useState } from 'react';
import { Typography, CircularProgress, Divider, Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PhoneAndroid, Google, Email, Person } from '@mui/icons-material';
import CustomModal from '@/app/Custom/CustomModal';
import CustomInput from '@/app/Custom/CustomInput';
import PasswordInput from '@/app/Common/PasswordInput';
import FileInput from '@/app/Common/FileInput';
import { GoogleSignupButton, handleChange, handleFileChange, handleSubmit } from '@/app/helper/RegisterUtils';
import CustomButton from '@/app/Custom/CustomButton';
import { useDispatch } from 'react-redux';

const RegisterModal = ({ open, onClose, onSwitchToLogin }) => {
    const { t } = useTranslation();
    const theme = useTheme()
    const [formData, setFormData] = useState({ fullname: '', email: '', password: '', phone: '' });
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
const dispatch=useDispatch()
  

    return (
        <>
            <CustomModal open={open} onClose={onClose} title={t("Register")} sx={{ color: theme.palette.text.primary }}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formData, avatar, setLoading, onClose);
                }}> <CustomInput
                        placeholder={t('Full Name')}
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange(setFormData)}
                        startIcon={<Person />}
                        className="mb-2"

                    />
                    <CustomInput
                        placeholder={t('Email')}
                        name="email"
                        value={formData.email}
                        onChange={handleChange(setFormData)}
                        startIcon={<Email />}
                        className="mb-2"

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

                    />
                    <FileInput
                        t={t}
                        avatar={avatar}
                        handleFileClick={() => document.getElementById('avatar-upload').click()}
                        handleFileChange={handleFileChange(setAvatar)}
                    />
                    <CustomButton
                        variant="contained"
                        fullWidth
                        type="submit"
                        disabled={loading}
                        title={loading ? <CircularProgress size={24} /> : t('Register')}
                    />
                    <Divider sx={{ my: 1 }}>{t('OR')}</Divider>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                        <CustomButton
                            background="#d62746"
                            fullWidth
                            onClick={() => GoogleSignupButton(dispatch, onClose)}
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
        </>
    );
};

export default RegisterModal;
