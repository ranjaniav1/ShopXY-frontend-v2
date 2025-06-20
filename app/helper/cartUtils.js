import toast from "react-hot-toast";
import { addtoCart, getCart, removetoCart } from "../Service/Cart";



export const fetchCart = async (userId) => {
  if (!userId) {
    console.error("userId is required to fetch cart.");
    return [];
  }

  try {
    const response = await getCart(userId);
    if (response?.statusCode === 200) {
      return response.data || [];
    }
    throw new Error(response?.message?.msg || "Unknown error");
  } catch (err) {
    console.error("Error fetching cart:", err.message || err);
    return [];
  }
};

// 🛒 Add to Cart Handler
export const handleAddToCart = async ({ userId, productId }) => {
  const quantity = 1;

  if (!userId) {
    toast.error("Please login first");
    return;
  }

  let cartItems = null;

  try {
    // Try to get the cart
    cartItems = await getCart(userId);
  } catch (error) {
    if (error?.response?.status === 404) {
      // No cart found, treat as empty cart
      cartItems = { data: { products: [] } };
    } else {
      toast.error(`Failed to fetch cart: ${error?.message}`);
      return;
    }
  }

  try {
    const alreadyInCart = cartItems?.data?.products.some(
      (item) => item.product._id === productId
    );

    if (alreadyInCart) {
      toast.error("Your item is already in your cart");
      return;
    }

    const response = await addtoCart(userId, productId, quantity);

    if (response?.success || response?.status === 200) {
      toast.success("Item added!");
      fetchCart(userId);
    } else {
      throw new Error(response?.message || "Unknown error");
    }
  } catch (error) {
    toast.error(`Failed to add product to cart: ${error?.message}`);
  }
};





// 🗑️ Remove from Cart Handler
export const handleRemoveFromCart = async ({ userId, productId }) => {
  if (!userId) {
    toast.error("Please login first");
    return;
  }

  try {
    await removetoCart(userId, productId);
    toast.success("Item removed successfully");

  } catch (err) {
    console.error("Error removing item from cart:", err.message || err);
    toast.error("Failed to remove item");
  }
};

