'use client'
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CustomInput from '../Common/CustomInput';
import Search from '@mui/icons-material/Search';
import CustomMenu from '../Common/CustomMenu';
import CustomIconButton from '../Common/CustomIconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Navigation = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
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
        <AppBar position="static" className='bg-white'>
            <Container
                maxWidth="xl"   > <Toolbar >
                    {/* Logo */}
                    <Typography variant="h6" color={"GrayText"}>
                        MyLogo
                    </Typography>

                    {/* Search Field */}
                    <div style={{ position: 'relative', marginRight: '16px', flexGrow: 1 }}>
                        <CustomInput startIcon={<Search />} placeholder={"Search for Products,Brands and More"} className="bg-blue-300" />
                    </div>

                    {/* Account Button */}
                    <CustomMenu startIcon={<AccountCircle />} title={"Account"} menuItems={menuItems} anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        onOpen={handleMenuOpen} className={"mr-2"} />


                    {/* Cart Icon Button */}
                    <CustomMenu startIcon={<ShoppingCartIcon />} title={"Cart"} menuItems={menuItems} anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        onOpen={handleMenuOpen} />


                    <CustomIconButton
                        startIcon={<MoreVertIcon />}
                        color='primary'
                    />


                </Toolbar>
            </Container>
        </AppBar >

    );
};

export default Navigation;
