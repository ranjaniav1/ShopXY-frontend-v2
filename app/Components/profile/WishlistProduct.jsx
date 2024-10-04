import React from "react";
import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import Image from "next/image";

const WishlistItem = ({ item, handleRemove }) => {
  const theme = useTheme();
  return (
    <Grid item xs={6} md={3} spacing={4}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.main,
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          overflow: "visible", // Ensure overflow allows elements to be visible
          transition: "transform 0.3s",
          marginRight: "16px",
          height: "100%",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <IconButton
          onClick={() => handleRemove(item.product._id)}
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            backgroundColor: theme.palette.background.default,
            zIndex: 1, // Ensure the button appears above other elements
            "&:hover": {
              backgroundColor: theme.palette.error.main,
              color: theme.palette.getContrastText(theme.palette.error.main),
            },
          }}
          size="small" // Adjust size as needed
        >
          <DeleteIcon />
        </IconButton>

        <Link
          href={`/product/${item.product._id}/${encodeURIComponent(
            item.product.slug
          )}`}
          passHref
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "200px",
            }}
          >
            <Image
              src={item.product.image || "/placeholder-image.png"}
              alt={item.product.title || "Product image"}
              layout="fill"
              objectFit="cover"
            />
          </Box>

          <Box
            sx={{
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexGrow: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
                marginBottom: "4px",
              }}
            >
              {item.product.title || "Untitled Product"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", color: theme.palette.text.secondary }}
            >
              {item.product.description || "No description available"}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                marginTop: "8px",
              }}
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
