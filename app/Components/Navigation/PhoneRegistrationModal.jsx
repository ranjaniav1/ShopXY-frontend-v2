'use client';
import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import CustomModal from '@/app/Custom/CustomModal';
import CustomInput from '@/app/Custom/CustomInput';
import FileInput from '@/app/Common/FileInput';
import CustomButton from '@/app/Custom/CustomButton';
import { Email, Person, PhoneAndroid } from '@mui/icons-material';

const PhoneRegistrationModal = ({ open, onClose }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ fullname: '', phone: '', email: '' }); // Added email field
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmitPhone = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Check if email is valid (simple check here)
            if (!formData.email.includes('@')) {
                toast.error(t('Invalid email address.'));
                setLoading(false);
                return;
            }


            toast.success(t('OTP sent successfully. Please check your phone.'));
            onClose(); // Close the modal after sending OTP
        } catch (error) {
            toast.error(t('Failed to send OTP. Please try again.'));
            console.error('OTP sending error', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CustomModal open={open} onClose={onClose} title={t('Phone Registration')}>
            <form onSubmit={handleSubmitPhone}>
                <CustomInput
                    placeholder={t('Full Name')}
                    name="fullname"
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    className="mb-2"
                    required startIcon={<Person />}
                />
                <CustomInput
                    placeholder={t('Email')} // Added email input
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mb-2" startIcon={<Email />}
                    required
                />
                <CustomInput
                    placeholder={t('Phone')}
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mb-2" startIcon={<PhoneAndroid />}
                    required
                />
                <FileInput
                    t={t}
                    avatar={avatar}
                    handleFileClick={() => document.getElementById('avatar-upload').click()}
                    handleFileChange={(e) => setAvatar(e.target.files[0])}
                />
                <CustomButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={loading}
                    title={loading ? <CircularProgress size={24} /> : t('Submit')}
                />
            </form>
        </CustomModal>
    );
};

export default PhoneRegistrationModal;
