'use client';

import React, { useEffect, useState } from 'react';
import FullScreenNav from './Navigation/FullScreenNav';

const Navigation = () => {
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10); // Add shadow when scroll > 10px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[1000] bg-body border-b border-secondary transition-shadow duration-300 ${
        hasShadow ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="md:block">
          <FullScreenNav />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
