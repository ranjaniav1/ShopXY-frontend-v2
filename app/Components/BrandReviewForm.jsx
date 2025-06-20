import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Rating,
  IconButton
} from "@mui/material";
import { SubmitBrandReview, SubmitProductReview } from "../Service/GetReviews";
import { useTheme } from "@mui/material/styles"; // Import the theme hook
import toast from "react-hot-toast";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import { useUser } from "../context/UserContext";

const BrandReviewForm = ({ brandId, onClose, productId,onSubmitSuccess }) => {
  const theme = useTheme(); // Access the theme
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
 const { user } = useUser(); // 👈 Get user from context
    const userId = user?._id;
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages); // Remove image by index
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const reviewData = {
        id: productId || brandId, // Use productId if it exists, else use brandId
        userId:userId,
        rating,
        review,
        mediaFiles: images
      };

      if (productId) {
        await SubmitProductReview(reviewData);
        toast.success("Thank you for giving our product a review!");
      } else {
        await SubmitBrandReview(reviewData);
        toast.success("Thank you for giving our brand a review!");
      }
      // ✅ Inform parent that submission succeeded
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      onClose();
      setRating(0);
      setReview("");
      setImages([]);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
    
      toast.error(errorMessage);
      console.error("Error submitting review:", error);
    }
     finally {
      setLoading(false);
    }
  };
  return (
    <Box>
      <Box sx={{ marginBottom: 2 }}>
        <Rating
          sx={{ fontSize: 40 }}
          name="brand-rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
        />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Write your review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        sx={{ marginBottom: 2 ,color:theme.palette.text.primary}}
        InputProps={{
          style: { backgroundColor: theme.palette.background.default }
        }} // Use theme for background color
      />

      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<ImageIcon />}
          sx={{ borderRadius: "20px", padding: "10px 20px" }}
        >
          Upload Images
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </Button>

        {/* Show selected images */}
        {images.length > 0 && (
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "center",
              gap: 2
            }}
          >
            {images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: 80,
                  height: 80
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="upload preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    objectFit: "cover"
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleImageRemove(index)}
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    background: theme.palette.error.main,
                    color: "white"
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={rating === 0 || !review || loading} // Disable if no rating/review or if loading
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </Box>
  );
};

export default BrandReviewForm;
