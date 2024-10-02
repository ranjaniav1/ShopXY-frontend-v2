import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import Image from "next/image";

const WishlistItem = ({ item, handleRemove }) => {
  return (
    <Grid item xs={6} md={3} spacing={4}>
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
          height: "310px", // Fixed height for consistency
          marginRight: "16px", // Margin for spacing between items

          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)", // Enhanced shadow on hover
          },
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
              color: "#fff",
            },
          }}
          size="small"
        >
          <DeleteIcon />
        </IconButton>

        <Link
          href={`/product/${item.product._id}/${encodeURIComponent(item.product.slug)}`}
          passHref
        >
          <Image
            src={item.product.image || "/placeholder-image.png"} // Fallback image
            alt={item.product.title || "Product image"} // Fallback alt text
            width={300} // Adjust width based on your layout
            height={200} // Adjust height based on your layout
            style={{
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexGrow: 1, // Ensure this box takes available space
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#333", marginBottom: "4px" }}
            >
              {item.product.title || "Untitled Product"} {/* Fallback title */}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: "12px" }}
            >
              {item.product.description || "No description available"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#f57c00", marginTop: "8px" }}
            >
              ${item.product.discounted_price || "Price not available"}
            </Typography>
          </Box>
        </Link>
      </Box>
    </Grid>
  );
};



export default WishlistItem;
