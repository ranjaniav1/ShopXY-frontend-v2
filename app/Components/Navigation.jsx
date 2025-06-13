'use client';
import React, { useEffect, useState } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import FullScreenNav from './Navigation/FullScreenNav';
import SmallScreenNav from './Navigation/SmallScreenNav';
import CustomDrawer from '../Custom/CustomDrawer';
import NavSetting from './NavSetting';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/reducer/ThemeReducer';
import Cookies from 'js-cookie';

const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const user = useSelector((state) => state?.auth?.user?.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const savedTheme = Cookies.get('theme'); // Read from Cookies
        if (savedTheme) {
            dispatch(setTheme(savedTheme));
        }
    }, [dispatch]);
    return (
        <Box className="bg-body border-b border-secondary"  style={{
            position: 'fixed', // Fix the nav at the top
            top: 0, // Align to the top
            left: 0,
            right: 0,
            zIndex: 1000,height:"80px" }}>
            <Container maxWidth="xl">
                {/* Only visible on larger screens */}
                <Box display={{ xs: 'none', md: 'block' }}>
                    <FullScreenNav setDrawerOpen={setDrawerOpen} user={user}/>
                </Box>
                {/* Only visible on smaller screens */}
                <Box display={{ xs: 'flex', md: 'none' }}>
                    {/* <SmallScreenNav setDrawerOpen={setDrawerOpen} user={user}/> */}
                </Box>
            </Container>
            <Box width={350}>
                <CustomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Settings">
                    <NavSetting onClose={()=>setDrawerOpen(false)}/>
                </CustomDrawer>
            </Box> {/* Register Modal */}
           
        </Box>
    );
};

export default Navigation;
