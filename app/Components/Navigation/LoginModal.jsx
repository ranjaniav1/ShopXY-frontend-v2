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

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error(t("Please fill all fields"));
      setLoading(false);
      return;
    }

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

  return (
    <CustomModal open={open} onClose={onClose} title={t("Login")}>
      <form onSubmit={handleSubmitEmail} className="space-y-4 text-tprimary">
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
          className="bg-primary text-white hover:opacity-90"
          disabled={loading}
        />
      </form>

      <div className="my-4 text-center text-tsecondary text-sm">OR</div>

      <div className="flex items-center gap-2">
        <CustomButton
          fullWidth
          onClick={() => GoogleSignupButton(setUser, onClose)}
          startIcon={<Globe size={18} />}
          title={t("Login with Google")}
          className="bg-red-600 text-white hover:bg-red-700"
        />
      </div>

      <div className="mt-6">
        <CustomButton
          fullWidth
          variant="text"
          onClick={onSwitchToRegister}
          startIcon={<LogIn size={18} />}
          title={t("Not registered? Register")}
          className="text-primary hover:underline"
        />
      </div>
    </CustomModal>
  );
};

export default LoginModal;
