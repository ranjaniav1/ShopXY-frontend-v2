'use client';
import React, { useState } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import FullScreenNav from './Navigation/FullScreenNav';
import SmallScreenNav from './Navigation/SmallScreenNav';
import CustomDrawer from '../Custom/CustomDrawer';

const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();

    return (
        <Box className="nav " style={{ background: theme.palette.background.nav }}>
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
                    <CustomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
                </Box>
        </Box>
    );
};

export default Navigation;
