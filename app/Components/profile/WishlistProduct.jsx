import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  useTheme,
  Button,
  Card,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import {
  fetchWishlist,
  handleRemoveFromWishlist,
  removeAllWishlists,
} from "@/app/helper/ProfileUtils";
import CustomTypography from "@/app/Custom/CustomTypography";
import CustomCollectionCard from "@/app/Common/CustomCollectionCard";
import EmptyCart from "../EmptyCart";
import { deleteWishlistItem, getWishlist } from "@/app/Service/Profile";

const WishlistItem = ({ userId, activeTab }) => {
  const theme = useTheme();
  const [wishlist, setWishlist] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function fetchWishlist() {
    try {
      const data = await getWishlist(page, 6);
      setWishlist(data?.wishlists)
      setTotal(data?.totalResults)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchWishlist()
    }
  }, [userId, page]);

  useEffect(() => {
    if (activeTab === 1) {
      setPage(1);
    }
  }, [activeTab]);

  const handleDeleteWishlist = async (productId) => {
    await deleteWishlistItem(productId);
  };

  const totalPages = Math.ceil(total / 6);

  return (
    <Box sx={{ mt: 2 }}>
      {wishlist.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => removeAllWishlists(userId, setWishlist)}
          >
            Remove All
          </Button>
        </Box>
      )}

      {wishlist.length > 0 ? (
        <Grid container spacing={2}>
          {wishlist.map((wishlistItem) => (
            <Grid key={wishlistItem._id} item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  borderRadius: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 6,
                  },
                }}
              >
                <IconButton
                  onClick={() =>
                    handleDeleteWishlist(wishlistItem.product._id)
                  }
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 10,
                    backgroundColor: theme.palette.background.default,
                    "&:hover": {
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.getContrastText(
                        theme.palette.error.main
                      ),
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>

                <Link
                  href={`/product/${wishlistItem._id}/${encodeURIComponent(
                    wishlistItem.slug
                  )}`}
                  passHref
                >
                  <CustomCollectionCard
                    id={wishlistItem._id}
                    image={wishlistItem.detail_image[0]}
                    title={wishlistItem.name}
                    tooltip={wishlistItem.name}
                    slug={wishlistItem.slug}
                  />
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyCart
          src="/search-not-found.png"
          title="Your wishlist is empty"
          subtitle="Looks like you haven’t added anything to your wishlist yet."
          buttonText="Browse Products"
          buttonHref="/"
        />
      )}

      {wishlist.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <CustomTypography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Page {page} of {totalPages}
          </CustomTypography>
          <Button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default WishlistItem;
