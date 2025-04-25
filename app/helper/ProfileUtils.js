import toast from "react-hot-toast";
import { DeleteAllNotifications, deleteAllOrder, DeleteAllWishists, DeleteNotifications, deleteWishlistItem, getNotifications, getOrder, getWishlist } from "../Service/Profile";

export const fetchUserNotifications = async (userId, page, limit, setNotifications) => {
  try {
    if (!userId) return console.error("User ID is undefined");

    const response = await getNotifications(userId, page, limit);
    console.log("Notification", response);
    setNotifications(response);
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

// Remove Notification
export const removeNotification = async (notificationId, userId, setNotifications,notification) => {
  if (!userId) return toast.error("User ID missing. Cannot delete.");

  try {
    await DeleteNotifications(userId, notificationId);
    const updatedList = notification.filter((item) => item._id !== notificationId);
    setNotifications(updatedList);
    toast.success("Notification deleted.");
  } catch (error) {
    toast.error("Failed to delete notification.");
  }
};

export const removeAllNotifications = async (userId, setNotifications) => {
  if (!userId) return toast.error("User ID missing. Cannot delete all.");

  try {
    await DeleteAllNotifications(userId);
    setNotifications([]);
    toast.success("All notifications removed.");
  } catch (error) {
    console.error("Failed to remove all notifications:", error);
    toast.error("Failed to delete all notifications.");
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
  if (!userId) return toast.error("User ID missing. Cannot delete.");

  try {
    await deleteWishlistItem({ userId, productId });
    const updatedList = wishlist.filter((item) => item.product._id !== productId);
    setWishlist(updatedList);
    toast.success("Item removed from wishlist.");
  } catch (error) {
    toast.error("Failed to remove item: " + error.message);
  }
};
export const removeAllWishlists = async (userId, setWishlist) => {
  if (!userId) return toast.error("User ID missing. Cannot delete all.");

  try {
    await DeleteAllWishists(userId);
    setWishlist([]);
    toast.success("All wishlists removed.");
  } catch (error) {
    console.error("Failed to remove all wishlists:", error);
    toast.error("Failed to delete all wishlists.");
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
  export const DeleteAllOrder = async (userId, setOrder) => {
    if (!userId) return toast.error("User ID missing. Cannot delete all.");
  
    try {
      await deleteAllOrder(userId);
      // Refetch orders after deletion
      await fetchOrder(userId, 1, 1, setOrder);  // Assuming page 1 and limit 1, adjust based on your use case
      toast.success("All Orders removed.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete all orders.");
    }
  };
  
