'use client';
import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import FullScreenNav from './Navigation/FullScreenNav';
import SmallScreenNav from './Navigation/SmallScreenNav';
import CustomDrawer from '../Custom/CustomDrawer';
import NavSetting from './NavSetting';
import { useUser } from '../context/UserContext';

const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { user } = useUser()

    return (
        <Box className="bg-body border-b border-secondary" style={{
            position: 'fixed', // Fix the nav at the top
            top: 0, // Align to the top
            left: 0,
            right: 0,
            zIndex: 1000
        }}>
            <Container maxWidth="xl">
                {/* Only visible on larger screens */}
                <Box display={{ xs: 'none', md: 'block' }}>
                    <FullScreenNav setDrawerOpen={setDrawerOpen} user={user} />
                </Box>
                {/* Only visible on smaller screens */}
                <Box display={{ xs: 'flex', md: 'none' }}>
                    {/* <SmallScreenNav setDrawerOpen={setDrawerOpen} user={user}/> */}
                </Box>
            </Container>
            <Box width={350}>
                <CustomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Settings">
                    <NavSetting onClose={() => setDrawerOpen(false)} />
                </CustomDrawer>
            </Box> {/* Register Modal */}

        </Box>
    );
};

export default Navigation;
