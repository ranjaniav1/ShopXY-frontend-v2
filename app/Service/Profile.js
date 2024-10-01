import { httpAxios } from "../httpAxios";

// Function to add an item to the wishlist
export const addWishlist = async (userId, productId) => {
  try {
    const response = await httpAxios.post(`/user/profile/add-wishlist`, {
      userId,
      productId
    });
    return response.data.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

// Function to get the wishlist
export const getWishlist = async (userId) => {
  try {
    const response = await httpAxios.get(`/user/profile/get-wishlist`, {
      params: { userId }
    });
    return response.data.data.products;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Function to delete an item from the wishlist
export const deleteWishlistItem = async ({userId, productId}) => {
  try {
    const response = await httpAxios.delete(`/user/profile/delete-wishlist`, {
      data: {
        userId,
        productId
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    throw error;
  }
};

// Function to get notifications for a user
export const getNotifications = async (userId) => {
  try {
    const response = await httpAxios.get(
      `/user/profile/notification/${userId}`
    );
    return response.data.data.messages;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
