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
import { GetCurrentUser, Login } from "@/app/Service/User";
import { setUser } from "@/app/redux/reducer/user/loginReducer";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { GoogleSignupButton } from "@/app/helper/RegisterUtils";

const LoginModal = ({ open, onClose, onSwitchToRegister }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch(); // Initialize useDispatch
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (!email) {
      toast.error(t("Please fill email field"));
      setLoading(false); // Stop loading
      return;
    }

    if (!password) {
      toast.error(t("Please fill password field"));
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await Login({ email, password });
      console.log("Login response:", response); // Log to inspect

      // Check the statusCode from response
      if (response?.statusCode === 200 && response?.success) {
        const userData = await GetCurrentUser(); // ✅ fetch fresh user
        dispatch(setUser(userData?.data)); // ✅ set to redux
        toast.success(t(response?.message || "Login successful"));
        onClose();
      } else {
        toast.error(t(response?.message || "Login failed"));
      }
    } catch (error) {
      console.error("Login error", error);

      if (error?.response) {
        // Handle error if response exists
        if (error.response?.status === 404) {
          toast.error(t("User not found"));
        } else if (error.response?.status === 401) {
          toast.error(t("Invalid password"));
        } else {
          toast.error(t(error.response?.data?.message || "Login failed"));
        }
      } else {
        toast.error(t("An unexpected error occurred."));
      }
    } finally {
      setLoading(false); // Stop loading
    }
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
            onClick={() => GoogleSignupButton(dispatch, onClose)}
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


    </>
  );
};

export default LoginModal;
