'use client';
import React from 'react';
import FullScreenNav from './Navigation/FullScreenNav';

const Navigation = () => {

    return (
        <div className="fixed top-0 left-0 right-0 z-[1000] bg-body border-b border-secondary">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Large Screens */}
                <div className="md:block">
                    <FullScreenNav  />
                </div>

                
            </div>

            
        </div>
    );
};

export default Navigation;
