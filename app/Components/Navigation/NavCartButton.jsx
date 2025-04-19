import React from "react";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";

const NavCartButton = () => {
 
  const router = useRouter();

  return (
    <IconButton onClick={() => router.push("/scheckout/carts")}>
      <Badge  color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default NavCartButton;
