"use client";
import React, { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react"; // ✅ Lucide Icons
import { EdittoCart } from "../Service/Cart";
import { useUser } from "../context/UserContext";
import CustomButton from "../Custom/CustomButton";
import CustomTypography from "../Custom/CustomTypography";

const EditCart = ({ onClose, selectedProduct }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [localQuantity, setLocalQuantity] = useState(
    selectedProduct?.quantity || 1
  );

  const { user } = useUser();
  const userId = user?._id;

  useEffect(() => {
    if (selectedProduct) {
      setLocalQuantity(selectedProduct.quantity || 1);
    }
  }, [selectedProduct]);

  const updateCart = async (newQuantity) => {
    setLoading(true);
    setErrorMessage("");
    try {
      await EdittoCart(userId, selectedProduct.product._id, newQuantity);
      setLocalQuantity(newQuantity);
    } catch (err) {
      console.error("Error updating quantity:", err);
      setErrorMessage("Error updating cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    const maxQty = selectedProduct.product?.max_qty || 10;
    if (localQuantity + 1 <= maxQty) {
      updateCart(localQuantity + 1);
    } else {
      setErrorMessage(`You can add up to ${maxQty} units in one order`);
    }
  };

  const handleDecrement = () => {
    if (localQuantity > 1) {
      updateCart(localQuantity - 1);
    }
  };

  if (!selectedProduct) {
    return (
      <CustomTypography variant="body2" className="text-tsecondary">
        No product selected.
      </CustomTypography>
    );
  }

  const totalPrice =
    (selectedProduct.product.discounted_price || 0) * localQuantity;

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-6 h-6 border-4 border-t-transparent border-primary rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Product Info */}
          <div className="flex gap-4 bg-body p-4 rounded-xl mb-4">
            <img
              src={selectedProduct.product.image}
              alt={selectedProduct.product.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <CustomTypography className="font-semibold text-tprimary">
                {selectedProduct.product.name}
              </CustomTypography>
              <CustomTypography variant="body2" className="text-tsecondary">
                ₹{selectedProduct.product.discounted_price}
              </CustomTypography>

              {/* Quantity Control */}
              <div className="flex items-center mt-2 space-x-2">
                <button
                  onClick={handleDecrement}
                  className="bg-primary text-white p-1 rounded hover:opacity-90"
                >
                  <Minus size={16} />
                </button>
                <CustomTypography variant="h6" className="text-tsecondary px-6">
                  {localQuantity}
                </CustomTypography>
                <button
                  onClick={handleIncrement}
                  className="bg-primary text-white p-1 rounded hover:opacity-90"
                >
                  <Plus size={16} />
                </button>
              </div>

              {errorMessage && (
                <CustomTypography variant="body2" className="text-red-600 mt-2">
                  {errorMessage}
                </CustomTypography>
              )}
            </div>
          </div>

          <hr className="my-4 border-tsecondary/30" />

          {/* Total Price */}
          <CustomTypography variant="body2" className="text-tprimary">
            Total Price: ₹{totalPrice}
          </CustomTypography>

          {/* Continue Button */}
          <CustomButton onClick={onClose} title="Continue" className="mt-4" />
        </>
      )}
    </div>
  );
};

export default EditCart;
