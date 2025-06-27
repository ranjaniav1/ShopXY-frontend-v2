"use client";
import React, { useState } from "react";
import CustomModal from "@/app/Custom/CustomModal";
import CustomInput from "@/app/Custom/CustomInput";
import CustomButton from "@/app/Custom/CustomButton";
import { useTranslation } from "react-i18next";
import { User, Phone } from "lucide-react";

const GoogleRegistrationModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ fullname: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Google registration data:", formData);
    onClose();
  };

  return (
    <CustomModal open={open} onClose={onClose} title={t("Google Registration")}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomInput
          placeholder={t("Full Name")}
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          startIcon={<User size={18} />}
          className="mb-2"
          required
        />
        <CustomInput
          placeholder={t("Phone")}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          startIcon={<Phone size={18} />}
          className="mb-2"
          required
        />
        <CustomButton
          variant="contained"
          type="submit"
          title={t("Register with Google")}
          className="w-full"
        />
      </form>
    </CustomModal>
  );
};

export default GoogleRegistrationModal;
