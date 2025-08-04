"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, LogIn, Globe } from "lucide-react";

import CustomModal from "@/app/Custom/CustomModal";
import CustomInput from "@/app/Custom/CustomInput";
import CustomButton from "@/app/Custom/CustomButton";
import { GetCurrentUser, Login } from "@/app/Service/User";
import { GoogleSignupButton } from "@/app/helper/RegisterUtils";
import { useUser } from "@/app/context/UserContext";

const LoginModal = ({ open, onClose, onSwitchToRegister }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t("Please fill all fields"));
      return;
    }
    setLoading(true);

    try {
      const response = await Login({ email, password });

      if (response?.statusCode === 200 && response?.success) {
        const userData = await GetCurrentUser();
        setUser(userData?.data?.user);
        toast.success(t(response?.message || "Login successful"));
        onClose();
      } else {
        toast.error(t(response?.message || "Login failed"));
      }
    } catch (error) {
      if (error?.response) {
        const { status, data } = error.response;
        if (status === 404) toast.error(t("User not found"));
        else if (status === 401) toast.error(t("Invalid password"));
        else toast.error(t(data?.message || "Login failed"));
      } else {
        toast.error(t("An unexpected error occurred."));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await GoogleSignupButton(setUser, onClose);
    } catch {
      toast.error(t("Google login failed"));
    } finally {
      setGoogleLoading(false);
    }
  };


  return (
    <CustomModal open={open} onClose={onClose} title={t("Welcome back")}>
      <form onSubmit={handleSubmitEmail} className="space-y-4 text-tprimary flex flex-col justify-center"
      >
        <CustomInput
          placeholder={t("Email")}
          startIcon={<Mail size={18} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <CustomInput
          placeholder={t("Password")}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          onClickEndIcon={() => setShowPassword(!showPassword)}
          required
        />

        <CustomButton
          fullWidth
          type="submit"
          title={loading ? "Loading..." : t("Login")}
          className="bg-primary text-white rounded-lg py-2 font-semibold hover:opacity-90 transition-all"
          disabled={loading}
        />
      </form>

      <div className="my-4 text-center text-sm text-tsecondary relative">
        <div className="absolute left-0 top-1/2 w-full border-t border-gray-300" />
        <span className="relative bg-body px-2 z-10">OR</span>
      </div>

      <CustomButton
        fullWidth
        onClick={handleGoogleLogin}
        startIcon={<Globe size={18} />}
        title={googleLoading ? t("Loading...") : t("Login with Google")}
        className="bg-body text-gray-800 border border-gray-300 rounded-lg py-2  transition-all"
      />


      <div className="mt-6 text-center">
        <CustomButton
          fullWidth
          variant="text"
          onClick={onSwitchToRegister}
          startIcon={<LogIn size={18} />}
          title={t("Not registered? Register")}
          className="text-primary hover:underline text-sm"
        />
      </div>
    </CustomModal>
  );
};

export default LoginModal;
