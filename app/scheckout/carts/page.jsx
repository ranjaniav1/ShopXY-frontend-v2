'use client';
import React, { useEffect, useState } from "react";
import CartProductCard from "@/app/Components/CardProductCard";
import { Box, Typography, useTheme } from "@mui/material";
import CustomDrawer from "@/app/Custom/CustomDrawer";
import EditCart from "@/app/Components/EditCart";
import CustomButton from "@/app/Custom/CustomButton";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { handleRemoveFromCart } from "@/app/helper/cartUtils";
import { useSelector } from "react-redux";

const CartPage = ({ handleNext, loadCart, cartData }) => {
  const [editDrawer, setEditDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const theme = useTheme();
  const userId = useSelector((state) => state.auth.user.data.user._id);
  const { t } = useTranslation();

  console.log()
  useEffect(() => {
    if (userId) {
      loadCart();
    }
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
    <Box>
      <Box
        sx={{
          background: theme.palette.card.background,
          p: 2,
          borderRadius: 2,
        }}
      >
        {
          cartData && cartData.products && cartData.products.length > 0 ? (
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
              {t("Product Details")}
            </Typography>
          ) : (
            <></>
          )
        }

        {cartData && cartData.products && cartData.products.length > 0 ? (
          cartData.products.map((item) => (


            <CartProductCard
              key={item._id}
              image={item.product.image}
              offer={item.product.offer}
              quantity={item.quantity}
              name={item.product.name}
              product={item.product}
              size={item.product.size}
              onEdit={() => handleEdit(item)}
              actual_price={item.product.actual_price}
              discounted_price={item.product.discounted_price}
              onRemove={() => handleRemove(item.product._id)}
            />
          ))
        ) : (
          <></>
        )}
      </Box>

      <CustomDrawer
        open={editDrawer}
        onClose={() => setEditDrawer(false)}
        title="Edit Product"
      >
        <EditCart
          onClose={() => {
            setEditDrawer(false);
            loadCart(); // Refresh the cart when closing the drawer
          }}
          selectedProduct={selectedProduct}
        />
      </CustomDrawer>

      {cartData && cartData.products && cartData.products.length > 0 ? (
        <Box sx={{ textAlign: "end", mt: 2 }}>
          <Link href="/scheckout/address">
            <CustomButton title="Next" onClick={handleNext} />
          </Link>
        </Box>
      ) : (<></>)}
    </Box>
  );
};

export default CartPage;
