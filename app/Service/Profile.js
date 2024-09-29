import { httpAxios } from "../httpAxios";

// Function to add an item to the wishlist
export const addWishlist = async (token, wishlistData) => {
  try {
    const response = await httpAxios.post(`${API_URL}/profile/add-wishlist`, wishlistData, {
      headers: {
        Authorization: `Bearer ${token}` // Pass the token for authentication
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

// Function to get the wishlist
export const getWishlist = async (token) => {
  try {
    const response = await httpAxios.get(`/profile/get-wishlist`, {
      headers: {
        Authorization: `Bearer ${token}` // Pass the token for authentication
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Function to delete an item from the wishlist
export const deleteWishlistItem = async (token, wishlistItemId) => {
  try {
    const response = await httpAxios.delete(`${API_URL}/profile/delete-wishlist`, {
      headers: {
        Authorization: `Bearer ${token}` // Pass the token for authentication
      },
      data: {
        id: wishlistItemId // Pass the item ID to delete
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    throw error;
  }
};

// Function to get notifications for a user
export const getNotifications = async (userId) => {
  try {
    const response = await httpAxios.get(`/user/profile/notification/${userId}`);
    return response.data.data.messages;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// Function to get the user profile (for example login)
export const getProfile = async ({ email, password }) => {
  try {
    const response = await httpAxios.get(`${API_URL}/profile`, {
      params: { email, password } // Pass email and password in params
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
