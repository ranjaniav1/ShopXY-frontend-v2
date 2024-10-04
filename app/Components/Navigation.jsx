'use client';
import React, { useState } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import FullScreenNav from './Navigation/FullScreenNav';
import SmallScreenNav from './Navigation/SmallScreenNav';
import CustomDrawer from '../Custom/CustomDrawer';
import NavSetting from './NavSetting';
import RegisterModal from './Navigation/RegisterModal';
import LoginModal from './Navigation/LoginModal';

const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();

    return (
        <Box className="nav "  style={{
            background: theme.palette.background.nav,
            position: 'fixed', // Fix the nav at the top
            top: 0, // Align to the top
            left: 0,
            right: 0,
            zIndex: 1000, }}>
            <Container maxWidth="xl">
                {/* Only visible on larger screens */}
                <Box display={{ xs: 'none', md: 'block' }}>
                    <FullScreenNav setDrawerOpen={setDrawerOpen} />
                </Box>
                {/* Only visible on smaller screens */}
                <Box display={{ xs: 'flex', md: 'none' }}>
                    <SmallScreenNav setDrawerOpen={setDrawerOpen} />
                </Box>
            </Container>
            <Box width={350}>
                <CustomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Settings">
                    <NavSetting />
                </CustomDrawer>
            </Box> {/* Register Modal */}
           
        </Box>
    );
};

export default Navigation;
