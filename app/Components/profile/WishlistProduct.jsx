import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

const WishlistItem = ({ item, handleRemove }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)"
        }
      }}
    >
      <IconButton
        onClick={() => handleRemove(item.product._id)}
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(255, 0, 0, 0.8)",
            color: "#fff"
          }
        }}
        size="small"
      >
        <DeleteIcon />
      </IconButton>

      <Link
        href={`/product/${item.product._id}/${encodeURIComponent(item.product.slug)}`}
        passHref
      >
        <img
          src={item.product.image}
          alt={item.product.title}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover"
          }}
        />
        <Box sx={{ padding: "8px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333", marginBottom: "4px" }}>
            {item.product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: "12px" }}>
            {item.product.description || "No description available"}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "#f57c00", marginTop: "8px" }}>
            ${item.product.discounted_price || "Price not available"}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default WishlistItem;
