'use client';
import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import CustomInput from '@/app/Common/CustomInput';
import CustomMenu from '@/app/Common/CustomMenu';
import CustomIconButton from '@/app/Common/CustomIconButton';
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import CustomButton from '@/app/Common/CustomButton';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

const FullScreenNav = ({ setDrawerOpen }) => {
  const { t } = useTranslation();
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenRegister = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  const handleOpenLogin = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  const menuItems = [
    { title: 'Profile', onClick: () => console.log('Profile clicked') },
    { title: 'My Account', onClick: () => console.log('My Account clicked') },
    { title: 'Logout', onClick: () => console.log('Logout clicked') },
  ];

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      {/* Logo */}
      <div className="text-xl font-semibold">
        <span style={{ color: '#22aa99' }}>s</span>hopxy
      </div>

      {/* Search Field */}
      <div className="flex-grow mx-4">
        <CustomInput
          startIcon={<Search className='rounded-md text-white' />}
          placeholder="Search for Products, Brands, and More"
          className="bg-blue-100 h-[36px] py-2 rounded-md h-35"
        />
      </div>

      {/* Account and Cart Menu */}
      <div className="flex space-x-2">
        <CustomButton
          startIcon={<AccountCircle />}
          title={t("Account")}
          onClick={handleOpenRegister}
        />
        <CustomMenu
          startIcon={<ShoppingCartIcon />}
          title={t("Cart")}
          menuItems={menuItems}
        />
        <CustomIconButton sx={{ padding: '4px' }}
          onClick={() => setDrawerOpen(true)}
        >
          <MoreVertIcon />
        </CustomIconButton>
      </div>

      {/* Register Modal */}
      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={handleOpenLogin}
      />

      {/* Login Modal */}
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegister={handleOpenRegister} // Pass onSwitchToRegister prop
      />
    </Box>
  );
};

export default FullScreenNav;
