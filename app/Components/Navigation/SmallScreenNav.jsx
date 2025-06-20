'use client';
import React, { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import Link from 'next/link';
import NavCartButton from './NavCartButton';
import CustomModal from '@/app/Custom/CustomModal';
import NavSearchBar from './NavSearchBar';
import { useUser } from '@/app/context/UserContext';
import AuthModal from '../model/AuthModal';

const SmallScreenNav = ({ setDrawerOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="flex justify-between items-center w-full p-2 bg-body">
      {/* Logo */}
      <Link href="/" passHref>
        <div className="text-xl font-semibold text-primary">
          <span className="text-[#22aa99]">S</span>hopXY
        </div>
      </Link>

      <div className="flex items-center gap-3">
        {/* Search Button */}
        <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
          <Search className="w-5 h-5 text-primary" />
        </button>

        {/* User Avatar or Login */}
        {user ? (
          <>
            <Link href="/user/profile" passHref>
              <img
                src={user?.avatar || '/default-avatar.png'}
                alt="Avatar"
                className="w-8 h-8 rounded-md object-cover"
              />
            </Link>
            <NavCartButton />
          </>
        ) : (
          <button
            onClick={() => setAuthOpen(true)}
            className="px-3 py-1 text-sm border rounded-md text-primary border-primary hover:bg-primary hover:text-white transition"
          >
            Login / Register
          </button>
        )}

        {/* Hamburger */}
        <button onClick={() => setDrawerOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
          <Menu className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Search Modal */}
      <CustomModal
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        height="450px"
        title="Search"
      >
        <NavSearchBar onClose={() => setIsSearchOpen(false)} />
      </CustomModal>

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

export default SmallScreenNav;
