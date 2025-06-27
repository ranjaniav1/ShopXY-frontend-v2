import React, { useState } from "react";
import CustomButton from "@/app/Custom/CustomButton";
import { UserCircle } from "lucide-react"; // ✅ Lucide replacement
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
      <CustomButton
        startIcon={<UserCircle className="w-5 h-5" />} // ✅ Lucide icon
        title="Login"
        onClick={handleOpenLogin}
      />
      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={handleOpenLogin}
      />
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegister={handleOpenRegister}
      />
    </>
  );
};

export default NavAuthButtons;
