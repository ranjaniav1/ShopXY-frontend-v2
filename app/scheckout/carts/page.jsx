"use client";

import React, { useEffect, useState } from "react";
import CartProductCard from "@/app/Components/CardProductCard";
import CustomDrawer from "@/app/Custom/CustomDrawer";
import EditCart from "@/app/Components/EditCart";
import CustomButton from "@/app/Custom/CustomButton";
import CustomTypography from "@/app/Custom/CustomTypography";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { handleRemoveFromCart } from "@/app/helper/cartUtils";
import { useUser } from "@/app/context/UserContext";
import { ShoppingCart } from "lucide-react";

const CartPage = ({ handleNext, loadCart, cartData }) => {
  const [editDrawer, setEditDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { t } = useTranslation();
  const { user } = useUser();
  const userId = user?._id;

  useEffect(() => {
    if (userId) loadCart();
  }, [userId]);

  const handleRemove = async (productId) => {
    await handleRemoveFromCart({ userId, productId });
    loadCart();
  };

  const handleEdit = (item) => {
    setSelectedProduct(item);
    setEditDrawer(true);
  };

  return (
    <div className="min-h-screen bg-body px-4 py-6 md:px-8">
     

      {/* Cart Items */}
      <div className="grid grid-cols-1">
        {cartData?.products?.length > 0 ? (
          cartData.products.map((item) => (

            <CartProductCard
              image={item.product.image}
              offer={item.product.offer}
              quantity={item.quantity}
              name={item.product.name}
              product={item.product}
              size={item.product.size}
              actual_price={item.product.actual_price}
              discounted_price={item.product.discounted_price}
              onEdit={() => handleEdit(item)}
              onRemove={() => handleRemove(item.product._id)}
            />

          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-tsecondary">
            <ShoppingCart className="w-10 h-10 mb-3" />
            <CustomTypography>{t("Your cart is empty")}</CustomTypography>
          </div>
        )}
      </div>

      {/* Drawer to edit product */}
      <CustomDrawer
        open={editDrawer}
        onClose={() => setEditDrawer(false)}
        title={t("Edit Product")}
      >
        <EditCart
          onClose={() => {
            setEditDrawer(false);
            loadCart();
          }}
          selectedProduct={selectedProduct}
        />
      </CustomDrawer>

      {/* Footer Buttons */}
      {cartData?.products?.length > 0 && (
        <div className="flex justify-end mt-8">
          <Link href="/scheckout/address">
            <CustomButton title={t("Next")} onClick={handleNext} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
