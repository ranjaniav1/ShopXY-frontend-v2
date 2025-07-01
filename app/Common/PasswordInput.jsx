"use client";
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import CustomInput from "../Custom/CustomInput";

const PasswordInput = ({ t, showPassword, handleChange, setShowPassword, value }) => {
  return (
    <div className="relative mb-2">
      <CustomInput
        placeholder={t("Password")}
        type={showPassword ? "text" : "password"}
        name="password"
        value={value}
        onChange={handleChange}
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
