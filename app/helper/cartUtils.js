import toast from "react-hot-toast";
import { addtoCart } from "../Service/Cart";

export const handleAddToCart = async ({ userId, productId }) => {
  const quantity = 1;

  if (!userId) {
    toast.error("Please login first");
    return;
  }

  try {
    await addtoCart(userId, productId, quantity);
    toast.success("Item added!");
  } catch (error) {
    toast.error(`Failed to add product to cart: ${error.message}`);
  }
};



