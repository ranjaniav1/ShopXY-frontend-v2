'use client';
import React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CustomIconButton from '@/app/Common/CustomIconButton';
import { Search } from '@mui/icons-material';
import CustomInput from '@/app/Common/CustomInput';

const SmallScreenNav = ({ setDrawerOpen }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{ width: '100%' }}  // Ensuring the Box spans full width
    >
      {/* Logo */}
      <div className="text-xl font-semibold">
        <span style={{ color: '#22aa99' }}>s</span>hopxy
      </div>

      <Box display="flex" alignItems="center">
        {/* Search Icon */}

        <CustomInput
          startIcon={<Search sx={{ fontSize: 24 }} />} // Ensure icon size is set
          placeholder="Search Products"
          className="bg-blue-100 text-white py-2 px-4 rounded-md"
        />
        {/* Hamburger Menu Icon */}
        <CustomIconButton onClick={() => setDrawerOpen(true)} ><MenuIcon /></CustomIconButton>

      </Box>
    </Box>
  );
};

export default SmallScreenNav;
