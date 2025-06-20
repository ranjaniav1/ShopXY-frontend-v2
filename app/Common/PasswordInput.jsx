'use client';
import React from 'react';
import { Eye, EyeOff } from 'lucide-react'; // or your preferred icon set
import CustomInput from '../Custom/CustomInput';

const PasswordInput = ({ t, showPassword, handleChange, setShowPassword, value }) => {
    return (
        <div className="mb-2">
            <CustomInput
                placeholder={t('Password')}
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={value}
                onChange={handleChange}
                endIcon={showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                onClickEndIcon={() => setShowPassword((prev) => !prev)}
            />
        </div>
    );
};

export default PasswordInput;
