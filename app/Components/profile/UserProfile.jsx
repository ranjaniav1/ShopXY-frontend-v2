'use client';

import React, { useState } from "react";
import { Edit } from "lucide-react"; // lightweight icon alternative
import CustomModal from "@/app/Custom/CustomModal";
import EditUserModal from "./EditUserModal";
import CustomTypography from "@/app/Custom/CustomTypography";
import { useUser } from "@/app/context/UserContext";

const UserProfile = () => {
  const [open, setOpen] = useState(false);

  const onEditClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useUser()
  return (
    <div className="relative flex flex-col items-center p-6 mb-6 rounded bg-body shadow-md">
      {/* Edit Icon */}
      <button
        onClick={onEditClick}
        className="absolute top-2 right-2 text-white bg-primary p-2 rounded-full hover:bg-primary/80 transition-all"
      >
        <Edit size={18} />
      </button>

      {/* Avatar */}
      <img
        src={user?.avatar}
        alt={user?.fullname || "Avatar"}
        className="w-32 h-32 mb-4 rounded-full object-cover border-2 border-secondary"
      />

      {/* User Info */}
      <CustomTypography variant="h5" className="font-bold text-tprimary mb-1">
        {user?.fullname || "Your Name"}
      </CustomTypography>

      <CustomTypography variant="body1" className="text-tsecondary">
        {user?.email || "Email not available"}
      </CustomTypography>

      <CustomTypography variant="body1" className="text-tsecondary">
        {user?.phone || "Phone not available"}
      </CustomTypography>

      {/* Edit Modal */}
      <CustomModal open={open} onClose={handleClose} title="Edit Profile">
        <EditUserModal user={user} onClose={handleClose} />
      </CustomModal>
    </div>
  );
};

export default UserProfile;
