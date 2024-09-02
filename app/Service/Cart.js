import { httpAxios } from "../httpAxios";

export const addtoCart = async (userId, productId, quantity = 1) => {
  try {
    const response = await httpAxios.post("/user/cart/add", {
      userId,
      products: [{ productId, quantity }]
    });
    return response.data;
  } catch (error) {
    console.log("Error adding to cart", error);
    throw error;
  }
};

export const getCart = async (userId) => {
  try {
    const response = await httpAxios.get("/user/cart/get", {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.log("Error adding to cart", error);
    throw error;
  }
};

export const removetoCart = async (userId, productId, quantity ) => {
  try {
    const response = await httpAxios.delete("/user/cart/remove", {
      data: {
        userId,
        products: [{ productId, quantity }]
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error adding to cart", error);
    throw error;
  }
};

export const EdittoCart = async (userId, productId, quantity) => {
  try {
    const response = await httpAxios.put("/user/cart/update", {
      userId,
      products: [{ productId, quantity }] 
    });
    return response.data;
  } catch (error) {
    console.log("Error updating cart", error);
    throw error;
  }
};

