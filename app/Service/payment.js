import { httpAxios } from "../httpAxios";

export const cashOnDelivery = async (userId, cartId) => {
  try {
    const response = await httpAxios.post("/payment/place-order-cod", {
      userId,
      cartId
    });
    return response.data.data;
  } catch (error) {
    console.log("Error adding to cart", error);
    throw error;
  }
};

export const promodCodes = async (promocode, cartId) => {
  try {
    const response = await httpAxios.post("/user/promocode/validate", {
      promocode,
      cartId
    });
    return response.data.data; // Ensure we return the entire response data
  } catch (error) {
    console.log("Error during promo code application", error);
    throw error;
  }
};
