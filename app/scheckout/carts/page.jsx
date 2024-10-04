"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removetoCart } from "@/app/Service/Cart";
import CartProductCard from "@/app/Components/CardProductCard";
import { Box, Typography, useTheme } from "@mui/material";
import CustomDrawer from "@/app/Custom/CustomDrawer";
import EditCart from "@/app/Components/EditCart";
import toast from "react-hot-toast";
import { setMyCart } from "@/app/redux/reducer/cartReducer";
import CustomButton from "@/app/Custom/CustomButton";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const Page = ({ handleNext, handleBack }) => {
  const [editDrawer, setEditDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const userId = useSelector((state) => state.auth.user.data.user._id);
  const cartData = useSelector((state) => state.cart.cart.data.products);
  const { t } = useTranslation();
  const fetchCart = async () => {
    try {
      const result = await getCart(userId);
      dispatch(setMyCart(result));
    } catch (err) {
      console.error("Error fetching cart:", err.message || err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const handleRemove = async (productId) => {
    try {
      const result = await removetoCart(userId, productId);
      dispatch(setMyCart(result));
      await fetchCart(); // Re-fetch to get updated cart
      toast.success("Item removed successfully");
    } catch (err) {
      console.error("Error removing item from cart:", err.message || err);
      toast.error("Failed to remove item");
    }
  };

  const handleEdit = (item) => {
    setSelectedProduct(item);
    setEditDrawer(true);
  };
  const handleCartUpdate = async () => {
    await fetchCart(); // Refresh the cart after editing
  };
  return (
    <Box>
      <Box
        sx={{
          background: theme.palette.card.background,
          p: 2,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          {t("Product Details")}
        </Typography>
        {cartData && cartData.length > 0 ? (
          cartData.map((item) => (
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // Adjust this value as needed
              width: "100%", // Adjust this value as needed
              textAlign: "center",
              paddingBottom: 2,
              paddingTop: 2
            }}
          >
            <Image
              src="https://cdn1.vectorstock.com/i/1000x1000/43/85/young-man-pushing-a-shopping-empty-cart-vector-13494385.jpg"
              alt="Your cart is empty"
              width={100} // or adjust according to your layout
              height={100} // or adjust according to your layout
              style={{
                height: "30%",
                maxWidth: "100%",
                objectFit: "cover"
              }}
              priority // Optional: to prioritize image loading if important for the layout
            />
            <Typography>
              Don&apos;t worry , you can add your products here ..simply click
              on start shopping{" "}
            </Typography>
            <Link href="/categories/collections" passHref>
              <CustomButton title="Start Shopping" />
            </Link>
          </Box>
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
            handleCartUpdate(); // Update cart when closing the drawer
          }}
          selectedProduct={selectedProduct}
        />
      </CustomDrawer>
      {cartData && cartData.length > 0 && (
        <Box sx={{ textAlign: "end", mt: 2 }}>
          <Link href="/scheckout/address">
            <CustomButton title="Next" onClick={handleNext} />
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Page;
