// PasswordInput.js
import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomInput from '../Custom/CustomInput';

const PasswordInput = ({ t, showPassword, handleChange, setShowPassword, value }) => (
    <Box sx={{ position: 'relative' }}>
        <CustomInput
            placeholder={t('Password')}
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={value}
            onChange={handleChange}
            className="mb-2"
            required
        />
        <IconButton
            sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
            onClick={() => setShowPassword(prev => !prev)}
        >
            {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
    </Box>
);

export default PasswordInput;
