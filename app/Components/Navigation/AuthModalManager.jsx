'use client';
import React, { useState } from 'react';
import RegisterModal from './RegisterModal'; // Import your RegisterModal component
import LoginModal from './LoginModal'; // Import your LoginModal component

const AuthModals = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false); // Ensure login modal is closed when opening register modal
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false); // Ensure register modal is closed when opening login modal
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpenRegister}>Open Register Modal</Button>
      <Button onClick={handleOpenLogin}>Open Login Modal</Button>

      <RegisterModal 
        open={isRegisterOpen} 
        onClose={handleCloseRegister} 
        onSwitchToLogin={handleOpenLogin} 
      />

      <LoginModal 
        open={isLoginOpen} 
        onClose={handleCloseLogin} 
      />
    </div>
  );
};

export default AuthModals;
