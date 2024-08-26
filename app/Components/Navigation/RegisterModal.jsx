'use client';
import React, { useState } from 'react';
import { Typography, CircularProgress, Divider, Box, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Register } from '@/app/Service/RegisterUser';
import toast, { Toaster } from 'react-hot-toast';
import { PhoneAndroid, Google, Email, Lock, Person, AddPhotoAlternate, Visibility, VisibilityOff } from '@mui/icons-material';
import CustomModal from '@/app/Custom/CustomModal';
import CustomInput from '@/app/Custom/CustomInput';
import CustomButton from '@/app/Custom/CustomButton';

const RegisterModal = ({ open, onClose, onSwitchToLogin }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ email: '', fullname: '', password: '', phone: '' });
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = e => setAvatar(e.target.files[0]);
    const handleFileClick = () => document.getElementById('avatar-upload').click();
    
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const formDataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => formDataToSubmit.append(key, value));
        if (avatar) formDataToSubmit.append('avatar', avatar);

        try {
            await Register(formDataToSubmit);
            toast.success(t('User registered successfully'));
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || t('Registration failed. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster position="bottom-right" />
            <CustomModal open={open} onClose={onClose} title={t("Register")}>
                <form onSubmit={handleSubmit}>
                    <CustomInput
                        placeholder={t('Email')} name="email" value={formData.email}
                        onChange={handleChange} startIcon={<Email />} className="mb-2" required
                    />
                    <CustomInput
                        placeholder={t('Full Name')} name="fullname" value={formData.fullname}
                        onChange={handleChange} startIcon={<Person />} className="mb-2" required
                    />
                    <Box sx={{ position: 'relative' }}>
                        <CustomInput
                            placeholder={t('Password')} type={showPassword ? 'text' : 'password'} name="password"
                            value={formData.password} onChange={handleChange}  className="mb-2" required
                        />
                        <IconButton
                            sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Box>
                    <CustomInput
                        placeholder={t('Phone')} name="phone" value={formData.phone}
                        onChange={handleChange} startIcon={<PhoneAndroid />} className="mb-2" required
                    />
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', border: '1px dashed #ccc', borderRadius: '4px', padding: '8px', cursor: 'pointer', mb: 2 }}
                        onClick={handleFileClick}
                    >
                        <input
                            type="file" id="avatar-upload" accept="image/*" style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <IconButton color="primary" component="span"><AddPhotoAlternate /></IconButton>
                        <Typography variant="body2" sx={{ ml: 2 }}>
                            {avatar ? avatar.name : t('Upload Avatar')}
                        </Typography>
                    </Box>
                    <CustomButton
                        variant="contained" color="primary" fullWidth type="submit"
                        disabled={loading} title={loading ? <CircularProgress size={24} /> : t('Register')}
                    />
                    <Divider sx={{ my: 1 }}>{t('OR')}</Divider>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CustomButton
                           background="#e58d4d"
                           fullWidth onClick={() => toast.success(t('Phone registration not implemented yet'))}
                           startIcon={<PhoneAndroid />} title={t('Phone')} sx={{ flex: 1 }}
                        />
                        <Divider orientation="vertical" flexItem />
                        <CustomButton
                            background="#d62746" fullWidth onClick={() => toast.success(t('Google registration not implemented yet'))}
                            startIcon={<Google />} title={t('Google')} sx={{ flex: 1 }}
                        />
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <CustomButton
                        variant="text" color="primary" fullWidth onClick={onSwitchToLogin}
                        title={t('Already have an account? Login')} sx={{ mt: 2 }}
                    />
                </form>
            </CustomModal>
        </>
    );
};

export default RegisterModal;
