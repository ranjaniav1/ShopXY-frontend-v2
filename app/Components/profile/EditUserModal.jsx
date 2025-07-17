'use client';

import React, { useState } from "react";
import { Edit } from "lucide-react"; 
import { EditUser } from "@/app/Service/User";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";

const EditUserModal = ({ user, onClose }) => {
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [avatar, setAvatar] = useState(null); // Avatar file
  const { user: contextUser, setUser } = useUser(); // Get user from context
  const userId = contextUser?._id;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("fullname", fullname);
    if (avatar) formData.append("avatar", avatar);

    try {
      const response = await EditUser(formData);
      setUser(response?.data?.user);
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-2">
      {/* Avatar and Upload Icon */}
      <div className="relative mb-4">
        <img
          src={
            avatar
              ? URL.createObjectURL(avatar)
              : user?.avatar || "/default-avatar.png"
          }
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover border-2 border-secondary"
        />

        <label
          htmlFor="avatarUpload"
          className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 shadow-md cursor-pointer hover:bg-gray-100"
        >
          <Edit size={14} className="text-primary" />
          <input
            id="avatarUpload"
            type="file"
            hidden
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </label>
      </div>

      {/* Full Name Input */}
      <input
        type="text"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="Full Name"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-3 text-tprimary bg-white"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all w-full"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditUserModal;
