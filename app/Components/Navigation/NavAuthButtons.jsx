import React, { useState } from "react";
import CustomButton from "@/app/Custom/CustomButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

const NavAuthButtons = () => {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenRegister = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  const handleOpenLogin = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  return (
    <>
      <CustomButton startIcon={<AccountCircle />} title="Login" onClick={handleOpenLogin} />
      <RegisterModal open={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} onSwitchToLogin={handleOpenLogin} />
      <LoginModal open={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onSwitchToRegister={handleOpenRegister} />
    </>
  );
};

export default NavAuthButtons;
