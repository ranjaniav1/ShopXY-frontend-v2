import toast from "react-hot-toast";
import { DeleteNotifications, deleteWishlistItem, getNotifications, getOrder, getWishlist } from "../Service/Profile";

export const fetchUserNotifications = async (userId, page, limit, callback) => {
  try {
    if (!userId) return console.error("User ID is undefined");

    const response = await getNotifications(userId, page, limit);
    callback(response);
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

// Remove Notification
export const removeNotification = async (notificationId, userId, page, limit, setNotifications, setTotal) => {
  if (!userId) return toast.error("User ID missing. Cannot delete.");

  try {
    await DeleteNotifications(userId, notificationId);
    const updated = await getNotifications(userId, page, limit);
    setNotifications(updated.messages || []);
    setTotal(updated.total || 0);
    toast.success("Notification deleted.");
  } catch (error) {
    toast.error("Failed to delete notification.");
  }
};



export const fetchWishlist = async (userId,page,limit,setWishlist) => {
  try {
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    const response = await getWishlist(userId,page,limit);
    console.log("wish",response);
    
    setWishlist(response); // Ensure it is never undefined
  } catch (error) {
    console.error("Error fetching wishlist:", error);
  }
};

export const handleRemoveFromWishlist = async (productId, setWishlist, userId, wishlist) => {
  try {
    await deleteWishlistItem({ userId, productId });
    const updatedList = wishlist.filter((item) => item.product._id !== productId);
    setWishlist(updatedList);
    toast.success("Item removed from wishlist.");
  } catch (error) {
    toast.error("Failed to remove item: " + error.message);
  }
};

export  const fetchOrder = async (userId,page,limit,setOrder) => {
    try {
      const response = await getOrder(userId,page,limit);
      setOrder(response);
    } catch (error) {
      console.log(error);
    }
  };