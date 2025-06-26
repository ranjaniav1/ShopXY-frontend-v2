"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import CustomIconButton from "../Custom/CustomIconButton";
import CustomTypography from "../Custom/CustomTypography";

const AddressCard = ({ address, selectedAddressId, handleEdit, handleRemove, handleChange }) => {
  const handleRadioChange = () => {
    handleChange(address._id);
  };

  return (
    <div className="relative bg-body border  rounded-md p-4 shadow-md hover:border-primary transition-all duration-300">
      {/* Edit & Delete Buttons */}
      <div className="absolute top-3 right-3 flex items-center bg-white border border-gray-200 rounded-md px-1.5 py-0.5 shadow-sm">
        <CustomIconButton
          onClick={() => handleEdit(address._id)}
          className="p-1 text-tprimary"
        >
          <Edit size={16} />
        </CustomIconButton>

        <div className="w-px h-5 bg-secondary mx-1" />

        <CustomIconButton
          onClick={() => handleRemove(address._id)}
          className="p-1"
        >
          <Trash2 size={16} className="text-red-600" />
        </CustomIconButton>
      </div>

      {/* Address Info with Radio */}
      <div className="flex items-start mt-2">
        <input
          type="radio"
          checked={address._id === selectedAddressId}
          onChange={handleRadioChange}
          className="accent-primary w-4 h-4 mt-1 mr-3"
        />

        <div className="text-sm text-tsecondary space-y-1">
          <CustomTypography variant="body2">
            {address.address}, {address.city}
          </CustomTypography>
          <CustomTypography variant="body2">
            {address.state} - {address.postalCode}
          </CustomTypography>
          <CustomTypography variant="body2">
            {address.country} | {`Phone: ${address.phone}`}
          </CustomTypography>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
