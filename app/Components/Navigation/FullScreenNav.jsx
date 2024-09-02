'use client';
import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import CustomInput from '@/app/Custom/CustomInput';
import CustomButton from '@/app/Custom/CustomButton';
import CustomMenu from '@/app/Custom/CustomMenu';
import CustomIconButton from '@/app/Custom/CustomIconButton';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const FullScreenNav = ({ setDrawerOpen }) => {
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.auth.isAuthenticated)
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
        {
          isAuth ? (<CustomButton
            startIcon={<AccountCircle />}
            title={t("Account")}
            onClick={handleOpenRegister}
          />) : (<CustomButton
            startIcon={<AccountCircle />}
            title={t("Login")}
            onClick={handleOpenRegister}
          />)
        }

        <Link href="/scheckout/carts">
          <CustomButton title="Cart" startIcon={<ShoppingCartIcon />} />
        </Link>

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
