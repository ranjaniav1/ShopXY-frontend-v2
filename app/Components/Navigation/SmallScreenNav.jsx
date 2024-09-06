import React, { useState } from 'react';
import { Badge, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CustomButton from '@/app/Custom/CustomButton';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import CustomModal from '@/app/Custom/CustomModal'; // Import CustomModal
import SearchModal from './SearchModal';
import { Search as SearchIcon } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';

const SmallScreenNav = ({ setDrawerOpen }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth?.user?.data?.user) || {}
  const cartItemCount = useSelector((state) => state.cart.itemCount) || 0;
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
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
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setIsOpenSearch(false); // Close the search modal after searching
    }
  };


  // extract full name into the 1st word
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
        <IconButton onClick={() => setIsOpenSearch(true)}>
          <SearchIcon />
        </IconButton>
        {/* Login/Account Button */}
        {
          isAuth ? (

            <img src={user.avatar} alt="Avatar" className="w-8 h-7 rounded-none" />

          ) : (
            <button onClick={handleOpenLogin} className='px-0.5 rounded-md btn'>Login</button>
          )
        }
        {/* Hamburger Menu Icon */}
        <Link href="/scheckout/carts">
          <IconButton aria-label="cart" size="small">
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>        </Link>

        <IconButton onClick={() => setDrawerOpen(true)} size="small">
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
        <SearchModal searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch} />
      </CustomModal>
    </Box >
  );
};

export default SmallScreenNav;
