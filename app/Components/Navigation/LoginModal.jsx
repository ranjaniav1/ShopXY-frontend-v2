"use client";
import React, { useState } from "react";
import { Divider, CircularProgress, Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import {
  Visibility,
  VisibilityOff,
  Google,
  Email
} from "@mui/icons-material";
import CustomModal from "@/app/Custom/CustomModal";
import CustomInput from "@/app/Custom/CustomInput";
import CustomButton from "@/app/Custom/CustomButton";
import GoogleRegistrationModal from "./GoogleRegistrationForm";
import { Login } from "@/app/Service/User";
import { setUser } from "@/app/redux/reducer/user/loginReducer";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const LoginModal = ({ open, onClose, onSwitchToRegister }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch(); // Initialize useDispatch
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false); // State for Google Login Modal

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await Login({ email, password });
      if (response) {
        dispatch(setUser(response));
        Cookies.set("user", true, { expires: 7 });
        toast.success(t("Login successful"));
        onClose();
      }
    } catch (error) {
      toast.error(
        t("Login failed. Please check your credentials and try again.")
      );
      console.error("Login error", error);
    } finally {
      setLoading(false);
    }
  };


  const handleOpenGoogleModal = () => {
    setIsGoogleModalOpen(true);
    onClose(); // Close the LoginModal when opening the GoogleLoginModal
  };

 

  const handleCloseGoogleModal = () => {
    setIsGoogleModalOpen(false);
  };

  return (
    <>
      <CustomModal open={open} onClose={onClose} title={t("Login")}>
        {/* Email and Password Inputs */}
        <form onSubmit={handleSubmitEmail}>
          <CustomInput
            placeholder={t("Email")}
            startIcon={<Email />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2"
            required
          />
          <CustomInput
            placeholder={t("Password")}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endIcon={showPassword ? <VisibilityOff /> : <Visibility />}
            onClickEndIcon={() => setShowPassword(!showPassword)}
            className="mb-2"
            required
          />
          <CustomButton
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            title={loading ? <CircularProgress size={24} /> : t("Login")}
            sx={{ mt: 2, backgroundColor: theme.palette.primary.main }}
          />
        </form>
        {/* "OR" Separator */}
        <Divider sx={{ my: 2 }}>{t("OR")}</Divider>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
         
          <CustomButton
            fullWidth
            onClick={handleOpenGoogleModal}
            startIcon={<Google />}
            title={t("Google")}
            sx={{ flex: 1, backgroundColor: theme.palette.error.main }}
          />
        </Box>{" "}
        <Divider sx={{ my: 2 }} />
        <CustomButton
          variant="text"
          color="primary"
          fullWidth
          onClick={onSwitchToRegister}
          title={t("not Registed? Register")}
          sx={{ mt: 2, backgroundColor: theme.palette.primary.main }}
        />
      </CustomModal>{" "}
     
      {/* Render GoogleLoginModal */}
      <GoogleRegistrationModal
        open={isGoogleModalOpen}
        onClose={handleCloseGoogleModal}
      />
    </>
  );
};

export default LoginModal;
