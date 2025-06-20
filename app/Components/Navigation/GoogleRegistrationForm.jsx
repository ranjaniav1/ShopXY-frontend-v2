// src/Components/Navigation/GoogleRegistrationModal.jsx

'use client';
import React, { useState } from 'react';
import CustomModal from '@/app/Custom/CustomModal';
import CustomInput from '@/app/Custom/CustomInput';
import CustomButton from '@/app/Custom/CustomButton';
import { useTranslation } from 'react-i18next';
import { Person, PhoneAndroid } from '@mui/icons-material';

const GoogleRegistrationModal = ({ open, onClose }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ fullname: '', phone: '' });

    // Handler to update form data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        console.log('Google registration data:', formData);
        onClose();
    };

    return (
        <CustomModal open={open} onClose={onClose} title={t('Google Registration')}>
            <form onSubmit={handleSubmit}>
                <CustomInput
                    placeholder={t('Full Name')}
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    startIcon={<Person />}
                    className="mb-2"
                    required
                />
                <CustomInput
                    placeholder={t('Phone')}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    startIcon={<PhoneAndroid />}
                    className="mb-2"
                    required
                />
                <CustomButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    title={t('Register with Google')}
                />
            </form>
        </CustomModal>
    );
};

export default GoogleRegistrationModal;
