'use client';
import React, { useState } from 'react';
import FullScreenNav from './Navigation/FullScreenNav';
import SmallScreenNav from './Navigation/SmallScreenNav';
import CustomDrawer from '../Custom/CustomDrawer';
import NavSetting from './NavSetting';

const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 right-0 z-[1000] bg-body border-b border-secondary">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Large Screens */}
                <div className="hidden md:block">
                    <FullScreenNav setDrawerOpen={setDrawerOpen} />
                </div>

                {/* Small Screens */}
                <div className="flex md:hidden">
                    <SmallScreenNav setDrawerOpen={setDrawerOpen} />
                </div>
            </div>

            {/* Drawer */}
            <CustomDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title="Settings"
            >
                <NavSetting onClose={() => setDrawerOpen(false)} />
            </CustomDrawer>
        </div>
    );
};

export default Navigation;
