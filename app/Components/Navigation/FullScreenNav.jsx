'use client';
import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Badge, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import CustomInput from '@/app/Custom/CustomInput';
import CustomButton from '@/app/Custom/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logout } from '@/app/Service/User';
import { logout } from '@/app/redux/reducer/user/loginReducer';
import toast from 'react-hot-toast';

const FullScreenNav = ({ setDrawerOpen }) => {
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth?.user?.data?.user) || {}
  const cartItems = useSelector((state) => state.cart.cart?.data?.products) || [];
  const cartItemCount = cartItems.length; // Ensure cartItems is an array

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // For profile menu
  const router = useRouter()
  const dispatch = useDispatch()

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

  // Open profile menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close profile menu
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };


  // Logout functionality
  const handleLogout = async () => {
    try {
      await Logout({ userId: user._id });
      dispatch(logout());
      toast.success('User logged out successfully.');
      router.push('/');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
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

            <div>
              {/* Display profile and menu */}
              <IconButton onClick={handleProfileMenuOpen}>
                <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-none" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={() => router.push('/user/profile')}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>) : (
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
