'use client';
import React, { useState } from 'react';
import FullScreenNav from './Navigation/FullScreenNav';
import SmallScreenNav from './Navigation/SmallScreenNav';
import CustomDrawer from '../Custom/CustomDrawer';
import NavSetting from './NavSetting';

const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div
            className="bg-body border-b border-secondary fixed top-0 left-0 right-0 z-[1000]"
        >
            <div className="max-w-7xl mx-auto px-4">
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
            <div className="w-[350px]">
                <CustomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Settings">
                    <NavSetting onClose={() => setDrawerOpen(false)} />
                </CustomDrawer>
            </div>
        </div>
    );
};

export default Navigation;
