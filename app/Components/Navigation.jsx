'use client';
import React, { useState } from 'react';
import FullScreenNav from './Navigation/FullScreenNav';
import SmallScreenNav from './Navigation/SmallScreenNav';
import CustomDrawer from '../Custom/CustomDrawer';
import NavSetting from './NavSetting';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext'; // ✅ context

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const { user } = useUser();

  return (
    <div
      className="bg-body border-b border-secondary"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '80px',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Large screens */}
        <div className="hidden md:block">
          <FullScreenNav setDrawerOpen={setDrawerOpen} user={user} />
        </div>

        {/* Small screens */}
        <div className="flex md:hidden">
          {/* <SmallScreenNav setDrawerOpen={setDrawerOpen} user={user} /> */}
        </div>
      </div>

      {/* Drawer */}
      <div style={{ width: 350 }}>
        <CustomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Settings">
          <NavSetting onClose={() => setDrawerOpen(false)} />
        </CustomDrawer>
      </div>
    </div>
  );
};

export default Navigation;
