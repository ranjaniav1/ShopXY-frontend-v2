import React from "react";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const NavCartButton = () => {
  const cartItemCount = useSelector((state) => state.cart.cart?.data?.products.length) || 0;
  const router = useRouter();

  return (
    <IconButton onClick={() => router.push("/scheckout/carts")}>
      <Badge badgeContent={cartItemCount} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default NavCartButton;
