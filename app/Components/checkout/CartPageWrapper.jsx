"use client";

import React, { useCallback, useEffect, useState } from "react";

import { ShoppingCart } from "lucide-react";

import CartProductCard from "@/app/Components/card/CartProductCard";
import CustomDrawer from "@/app/Custom/CustomDrawer";
import EditCart from "@/app/Components/card/EditCart";
import CustomButton from "@/app/Custom/CustomButton";
import { fetchCart, handleRemoveFromCart } from "@/app/helper/cartUtils";
import EmptyCart from "@/app/Components/card/EmptyCart";
import ClientLink from "@/app/Common/ClientClick";
import PriceDetails from "@/app/Components/product/PriceDetail";
import { useUser } from "@/app/context/UserContext";

export default function CartPageWrapper() {
  const [editDrawer, setEditDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartData, setCartData] = useState(null);
  const { user } = useUser();
  const userId = user?._id;

  const loadCart = useCallback(async () => {
    if (!userId) return;
    const data = await fetchCart(userId);
    setCartData(data);
  }, [userId]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleRemove = useCallback(
    async (productId) => {
      await handleRemoveFromCart({ userId, productId });
      loadCart();
    },
    [userId, loadCart]
  );

  const handleEdit = useCallback((item) => {
    setSelectedProduct(item);
    setEditDrawer(true);
  }, []);

  if (!cartData?.products?.length) {
    return (
      <EmptyCart
        src="/empty_cart.png"
        title="Don’t worry, you can add your products here. Simply click on Start Shopping."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[7fr_1fr_4fr] gap-4 bg-body px-4 py-6 md:px-8">
      <div className="grid grid-cols-1 ">
        {cartData.products.map((item) => (
          <CartProductCard
            key={item.product._id}
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
        ))}

        <CustomDrawer
          open={editDrawer}
          onClose={() => setEditDrawer(false)}
          title="Edit Product"
        >
          <EditCart
            onClose={() => {
              setEditDrawer(false);
              loadCart();
            }}
            selectedProduct={selectedProduct}
          />
        </CustomDrawer>

        <div className="flex justify-end mt-8">
          <ClientLink href="/scheckout/address">
            <CustomButton title="Next" />
          </ClientLink>
        </div>
      </div>

      <div className="hidden md:flex justify-center">
        <div className="w-px bg-gray-200 h-full" />
      </div>

      <PriceDetails
        numberOfItems={cartData.products.length}
        totalProductPrice={cartData.totalPrice}
        totalDiscount={cartData.discountPrice}
        orderTotal={cartData.totalPrice}
      />
    </div>
  );
}