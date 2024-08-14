'use client';
import React, { useState } from 'react';
import CustomInput from '../Common/CustomInput';
import Search from '@mui/icons-material/Search';
import CustomMenu from '../Common/CustomMenu';
import CustomIconButton from '../Common/CustomIconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomDrawer from '../Common/CustomDrawer';

const Navigation = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false)
    const handleDrawerOpen = () => {
        setDrawerOpen(true)
    }
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        { title: 'Profile', onClick: () => console.log('Profile clicked') },
        { title: 'My Account', onClick: () => console.log('My Account clicked') },
        { title: 'Logout', onClick: () => console.log('Logout clicked') },
    ];

    return (
        <header className="fixed top-0 left-0 w-full div-body shadow-md z-50 py-4 ">            <div className="container mx-auto flex items-center justify-between px-4">
            {/* Logo */}
            <div className="text-xl font-semibold">
                MyLogo
            </div>

            {/* Search Field */}
            <div className="relative flex-grow mx-4">
                <CustomInput
                    startIcon={<Search className='rounded-md text-white' />}
                    placeholder="Search for Products, Brands, and More"
                    className="bg-blue-300 text-black placeholder-gray-700 py-2 px-4 rounded-md"
                />
            </div>

            {/* Account Button */}
            <CustomMenu
                startIcon={<AccountCircle />}
                title="Account"
                menuItems={menuItems}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onOpen={handleMenuOpen}
                className="mr-2"
            />

            {/* Cart Icon Button */}
            <CustomMenu
                startIcon={<ShoppingCartIcon />}
                title="Cart"
                menuItems={menuItems}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onOpen={handleMenuOpen}
            />

            {/* More Options Button */}
            <CustomIconButton
                startIcon={<MoreVertIcon />} onClick={handleDrawerOpen}
            />
        </div>


            {/* drawer */}
            <CustomDrawer open={drawerOpen} onClose={handleDrawerClose}>
                {/* Drawer content goes here */}
                <div>Your drawer content</div>
            </CustomDrawer>
        </header>
    );
};

export default Navigation;
