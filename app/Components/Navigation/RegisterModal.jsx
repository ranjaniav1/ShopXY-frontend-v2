'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Phone,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  Upload,
  FileImage,
  Loader2,
  ShieldCheck,
  LogIn,
  Globe,
} from 'lucide-react';

import CustomModal from '@/app/Custom/CustomModal';
import CustomInput from '@/app/Custom/CustomInput';
import PasswordInput from '@/app/Common/PasswordInput';
import FileInput from '@/app/Common/FileInput';
import CustomButton from '@/app/Custom/CustomButton';

import { GoogleSignupButton, handleChange, handleFileChange, handleSubmit } from '@/app/helper/RegisterUtils';
import { useUser } from '@/app/context/UserContext';

const RegisterModal = ({ open, onClose, onSwitchToLogin }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser();

  return (
    <CustomModal open={open} onClose={onClose} title={t("Register")}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData, avatar, setLoading, onClose);
        }}
        className="space-y-3 text-tprimary"
      >
        {/* Full Name */}
        <CustomInput
          placeholder={t('Full Name')}
          name="fullname"
          value={formData.fullname}
          onChange={handleChange(setFormData)}
          startIcon={<User className="w-5 h-5" />}
        />

        {/* Email */}
        <CustomInput
          placeholder={t('Email')}
          name="email"
          value={formData.email}
          onChange={handleChange(setFormData)}
          startIcon={<Mail className="w-5 h-5" />}
        />

        {/* Password */}
        <PasswordInput
          t={t}
          showPassword={showPassword}
          handleChange={handleChange(setFormData)}
          setShowPassword={setShowPassword}
          value={formData.password}
          icon={{
            visible: <Eye className="w-4 h-4" />,
            hidden: <EyeOff className="w-4 h-4" />,
            lock: <Lock className="w-5 h-5" />,
          }}
        />

        {/* Phone */}
        <CustomInput
          placeholder={t('Phone')}
          name="phone"
          value={formData.phone}
          onChange={handleChange(setFormData)}
          startIcon={<Phone className="w-5 h-5" />}
        />

        {/* Avatar Upload */}
        <FileInput
          t={t}
          avatar={avatar}
          handleFileClick={() => document.getElementById('avatar-upload').click()}
          handleFileChange={handleFileChange(setAvatar)}
          icon={<FileImage className="w-5 h-5" />}
        />

        {/* Submit Button */}
        <CustomButton
          type="submit"
          fullWidth
          disabled={loading}
          title={
            loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('Registering...')}
              </div>
            ) : (
              t('Register')
            )
          }
        />

        {/* Divider */}
        <div className="flex items-center my-2">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-2 text-sm text-gray-500">{t('OR')}</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google Signup */}
        <CustomButton
          fullWidth
          onClick={() => GoogleSignupButton(setUser, onClose)}
          startIcon={<Globe className="w-5 h-5" />}
          background="#d62746"
          title={t('Google')}
        />

        {/* Switch to Login */}
        <CustomButton
          fullWidth
          variant="text"
          onClick={onSwitchToLogin}
          title={t('Already have an account? Login')}
          startIcon={<LogIn className="w-5 h-5" />}
        />
      </form>
    </CustomModal>
  );
};

export default RegisterModal;
