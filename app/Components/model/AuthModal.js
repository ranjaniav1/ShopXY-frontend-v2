'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import CustomModal from '@/app/Custom/CustomModal';
import CustomInput from '@/app/Custom/CustomInput';
import CustomButton from '@/app/Custom/CustomButton';
import PasswordInput from '@/app/Common/PasswordInput';
import FileInput from '@/app/Common/FileInput';

import { useUser } from '@/app/context/UserContext';
import {
  GoogleSignupButton,
  handleChange,
  handleFileChange,
  handleSubmit,
} from '@/app/helper/RegisterUtils';
import { Login, GetCurrentUser } from '@/app/Service/User';

const AuthModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { setUser } = useUser();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
  });
  const [avatar, setAvatar] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(t('Please fill in all fields'));
      return;
    }

    setLoading(true);
    try {
      const response = await Login({ email, password });
      if (response?.statusCode === 200 && response?.success) {
        const userData = await GetCurrentUser();
        setUser(userData?.data);
        toast.success(t(response?.message || 'Login successful'));
        onClose();
      } else {
        toast.error(t(response?.message || 'Login failed'));
      }
    } catch (error) {
      console.error('Login error', error);
      toast.error(t('An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await handleSubmit(formData, avatar, setLoading, () => {
      toast.success(t('Registered successfully'));
      setIsLogin(true);
      onClose();
    });
  };

  return (
    <CustomModal open={open} onClose={onClose} title={t(isLogin ? 'Login' : 'Register')}>
      <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-3">
        {!isLogin && (
          <>
            <CustomInput
              placeholder={t('Full Name')}
              name="fullname"
              value={formData.fullname}
              onChange={handleChange(setFormData)}
              className="mb-2"
            />
            <CustomInput
              placeholder={t('Phone')}
              name="phone"
              value={formData.phone}
              onChange={handleChange(setFormData)}
              className="mb-2"
            />
          </>
        )}

        <CustomInput
          placeholder={t('Email')}
          name="email"
          value={isLogin ? email : formData.email}
          onChange={
            isLogin ? (e) => setEmail(e.target.value) : handleChange(setFormData)
          }
          className="mb-2"
        />

        <PasswordInput
          t={t}
          showPassword={showPassword}
          handleChange={
            isLogin ? (e) => setPassword(e.target.value) : handleChange(setFormData)
          }
          setShowPassword={setShowPassword}
          value={isLogin ? password : formData.password}
        />

        {!isLogin && (
          <FileInput
            t={t}
            avatar={avatar}
            handleFileClick={() => document.getElementById('avatar-upload').click()}
            handleFileChange={handleFileChange(setAvatar)}
          />
        )}

        <CustomButton
          type="submit"
          fullWidth
          disabled={loading}
          title={
            loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full mx-auto" />
            ) : (
              t(isLogin ? 'Login' : 'Register')
            )
          }
          className="mt-4"
        />

        <div className="border-t border-gray-200 my-4 text-center text-sm text-gray-500">
          {t('OR')}
        </div>

        <div className="flex gap-2">
          <CustomButton
            fullWidth
            onClick={() => GoogleSignupButton(setUser, onClose)}
            title={t('Google')}
            className="bg-red-600 hover:bg-red-700 text-white"
          />
        </div>

        <div className="border-t border-gray-200 my-4" />

        <CustomButton
          variant="text"
          fullWidth
          onClick={() => setIsLogin((prev) => !prev)}
          title={
            isLogin
              ? t('Not registered? Register')
              : t('Already have an account? Login')
          }
          className="text-sm text-primary mt-2"
        />
      </form>
    </CustomModal>
  );
};

export default AuthModal;
