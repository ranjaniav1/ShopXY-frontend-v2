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
export const getWishlist = async (userId,page=1,limit=10) => {
  try {
    const response = await httpAxios.get(`/user/profile/get-wishlist?page=${page}&limit=${limit}`, {
      params: { userId }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Function to delete an item from the wishlist
export const deleteWishlistItem = async ({ userId, productId }) => {
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
export const getNotifications = async (userId, page = 1, limit = 10) => {
  try {
    const response = await httpAxios.get(
      `/user/profile/notification/${userId}?page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// delete notify based on id
export const DeleteNotifications = async (userId, notificationId) => {
  if (!userId || !notificationId) {
    throw new Error("Missing userId or notificationId for deletion.");
  }

  try {
    const response = await httpAxios.delete(
      `/user/profile/notification/${userId}/${notificationId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error deleting notifications:", error);
    throw error;
  }
};

// Delete all notifications for a user
export const DeleteAllNotifications = async (userId) => {
  if (!userId) {
    throw new Error("Missing userId for deleting all notifications.");
  }

  try {
    const response = await httpAxios.delete(
      `/user/profile/notification/${userId}`
    ); // Assuming this is the route you set up
    return response.data;
  } catch (error) {
    console.error("Error deleting all notifications:", error);
    throw error;
  }
};
// Delete all notifications for a user
export const DeleteAllWishists = async (userId) => {
  if (!userId) {
    throw new Error("Missing userId for deleting all wishlists.");
  }

  try {
    const response = await httpAxios.delete(
      `/user/profile/delete-all-wishlist/${userId}`
    ); // Assuming this is the route you set up
    return response.data;
  } catch (error) {
    console.error("Error deleting all wishlists:", error);
    throw error;
  }
};

// Function to get order for a user
export const getOrder = async (userId,page=1,limit=1) => {
  try {
    const response = await httpAxios.get(`/user/payment/get-order/${userId}?page=${page}&limit=${limit}`); // Pass userId in URL path
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
// Function to get order for a user
export const deleteAllOrder = async (userId) => {
  try {
    const response = await httpAxios.delete(`/order/delete-all/${userId}`); // Pass userId in URL path
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
