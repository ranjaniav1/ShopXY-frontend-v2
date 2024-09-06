import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CustomButton from '@/app/Custom/CustomButton';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import CustomModal from '@/app/Custom/CustomModal'; // Import CustomModal
import SearchModal from './SearchModal';
import { Search as SearchIcon } from '@mui/icons-material';

const SmallScreenNav = ({ setDrawerOpen }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const handleOpenRegister = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  const handleOpenLogin = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  const openSearch = () => {
    setIsOpenSearch(true);
  };



  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{ width: '100%' }} // Ensuring the Box spans full width
    >
      {/* Logo */}
      <Link href="/" passHref>
        <div className="text-xl font-semibold">
          <span style={{ color: '#22aa99' }}>s</span>hopxy
        </div>
      </Link>

      <Box display="flex" alignItems="center">
        {/* Search Icon */}
        <IconButton onClick={openSearch}>
          <SearchIcon />
        </IconButton>
        {/* Login/Account Button */}
        {isAuth ? (
          <CustomButton title="Account" onClick={handleOpenRegister} />
        ) : (
          <CustomButton title="Login" onClick={handleOpenRegister} />
        )}
        {/* Hamburger Menu Icon */}
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      </Box>

      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={handleOpenLogin}
      />

      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegister={handleOpenRegister}
      />

      <CustomModal open={isOpenSearch} onClose={() => setIsOpenSearch(false)}>
        <SearchModal />
      </CustomModal>
    </Box >
  );
};

export default SmallScreenNav;
