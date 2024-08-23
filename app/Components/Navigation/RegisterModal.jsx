'use client';
import React, { useState } from 'react';
import { Modal, Box, Button, Typography, TextField, Input } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Register } from '@/app/Service/RegisterUser';

const RegisterModal = ({ open, onClose }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        email: '',
        fullname: '',
        password: '',
        phoneNumber: '',
    });
    const [avatar, setAvatar] = useState(null); // State for the avatar file

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Prepare form data to submit
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('fullname', formData.fullname);
        formDataToSubmit.append('password', formData.password);
        formDataToSubmit.append('phoneNumber', formData.phoneNumber);
        if (avatar) {
            formDataToSubmit.append('avatar', avatar);
        }
    
        try {
            // Call the Register function from the service
            await Register(formDataToSubmit);
    
            // Close modal on success
            onClose();
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };
    

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="register-modal-title">
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
                <Typography id="register-modal-title" variant="h6" component="h2" mb={2}>
                    {t('Register')}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label={t('Email')}
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label={t('Full Name')}
                        name="fullname"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label={t('Password')}
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label={t('Phone Number')}
                        name="phoneNumber"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        sx={{ my: 2 }}
                    />
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" type="submit">
                            {t('Register')}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default RegisterModal;
