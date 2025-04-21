import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton, Typography, useTheme, Button, Card, CardMedia, CardContent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { fetchWishlist, handleRemoveFromWishlist } from "@/app/helper/ProfileUtils";
import CustomCollectionCard from "@/app/Common/CustomCollectionCard";


const WishlistItem = ({ userId, activeTab }) => {
  const theme = useTheme();
  const [wishlist, setWishlist] = useState([]); // Default to an empty array
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (userId) {
      fetchWishlist(userId, page, 6, (data) => {
        setWishlist(data.products || []);  // Ensure it is never undefined
        setTotal(data.total || 0);    // Ensure totalItems is set properly
      });
    }
  }, [userId, page]);

  useEffect(() => {
    if (activeTab === 1) {
      setPage(1);
    }
  }, [activeTab]);
  const handleDeleteWishlist = async (productId) => {
    await handleRemoveFromWishlist(productId, setWishlist, userId, wishlist);
  };
  const totalPages = Math.ceil(total / 6);



  return (
    <Box>
      <Grid container spacing={2}>
        {wishlist.length > 0 ? (
          wishlist.map((wishlistItem) => (
            <Grid key={wishlistItem._id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 6,
                  },
                }}
              >

                <IconButton
                  onClick={() => handleDeleteWishlist(wishlistItem.product._id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 10,
                    backgroundColor: theme.palette.background.default,
                    "&:hover": {
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.getContrastText(theme.palette.error.main),
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>

                <Link
                  href={`/product/${wishlistItem.product._id}/${encodeURIComponent(wishlistItem.product.slug)}`}
                  passHref
                >
                  <CustomCollectionCard
                    id={wishlistItem.product._id}
                    image={wishlistItem.product.image}

                  />
                </Link>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No wishlist items found.</Typography>
          </Grid>
        )}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page <= 1}>
          Previous
        </Button>
        <Typography variant="body2">
          Page {page} of {totalPages}
        </Typography>
        <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page >= totalPages}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default WishlistItem;
