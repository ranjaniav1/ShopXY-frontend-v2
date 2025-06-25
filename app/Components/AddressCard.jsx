"use client";

import React from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CustomIconButton from "../Custom/CustomIconButton";
import CustomTypography from "../Custom/CustomTypography";

const AddressCard = ({ address, selectedAddressId, handleEdit, handleRemove, handleChange }) => {
  const handleRadioChange = () => {
    handleChange(address._id);
  };

  return (
    <div className="relative bg-body border border-tsecondary rounded-xl p-4 shadow-md">
      {/* Edit & Delete Buttons */}
      <div className="absolute top-2 right-2 flex items-center border border-gray-300 rounded-lg px-1 py-0.5 bg-white">
        <CustomIconButton onClick={() => handleEdit(address._id)} className="p-1">
          <ModeEditOutlineOutlinedIcon fontSize="small" />
        </CustomIconButton>

        <div className="h-6 w-px bg-gray-300 mx-1" />

        <CustomIconButton onClick={() => handleRemove(address._id)} className="p-1">
          <DeleteForeverOutlinedIcon fontSize="small" className="text-red-600" />
        </CustomIconButton>
      </div>

      {/* Address Info with Radio */}
      <div className="flex mt-2 items-start">
        <input
          type="radio"
          checked={address._id === selectedAddressId}
          onChange={handleRadioChange}
          className="accent-[--primary] mt-1 mr-2 w-4 h-4"
        />

        <div className="text-tsecondary text-sm">
          <CustomTypography variant="body2" className="mb-1">
            {address.address}, {address.city}
          </CustomTypography>
          <CustomTypography variant="body2" className="mb-1">
            {address.state}, {address.postalCode}
          </CustomTypography>
          <CustomTypography variant="body2">
            {address.country} | Phone: {address.phone}
          </CustomTypography>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
