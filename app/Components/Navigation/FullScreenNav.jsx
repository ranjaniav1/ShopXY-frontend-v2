'use client';
import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Badge, Box, IconButton } from '@mui/material';
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
import { useRouter } from 'next/navigation';

const FullScreenNav = ({ setDrawerOpen }) => {
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth?.user?.data?.user) || {}
  const cartItems = useSelector((state) => state.cart.cart) || [];
  const cartItemCount = cartItems.length;

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter()

  const handleOpenRegister = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  const handleOpenLogin = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };


  // search 
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`)
    }
  }
  const menuItems = [
    { title: 'Profile', onClick: () => console.log('Profile clicked') },
    { title: 'My Account', onClick: () => console.log('My Account clicked') },
    { title: 'Logout', onClick: () => console.log('Logout clicked') },
  ];

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      {/* Logo */}
      <Link href="/">
        <div className="text-xl font-semibold">
          <span style={{ color: '#22aa99' }}>s</span>hopxy
        </div>
      </Link>

      {/* Search Field */}
      <div className="flex-grow mx-4">
        <CustomInput
          startIcon={<Search className='rounded-md text-white' onClick={() => handleSearch()} />}
          placeholder="Search for Products, Brands, and More"
          className="bg-blue-100 py-1 rounded-md "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key
        />
      </div>

      {/* Account and Cart Menu */}
      <div className="flex space-x-2">
        {
          isAuth ? (


            <CustomButton
              title={
                <div className="flex item-center space-x-2">
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-none" /> <span>{user.fullname}</span></div>
              }
              onClick={handleOpenRegister}
            />) : (
            <CustomButton
              startIcon={<AccountCircle />}
              title={t("Login")}
              onClick={handleOpenLogin}
            />)
        }

        <Link href="/scheckout/carts">
          <IconButton aria-label="cart" size="small">
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>        </Link>

        <IconButton size='small'>
          <MoreVertIcon onClick={() => setDrawerOpen(true)} />
        </IconButton>

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
