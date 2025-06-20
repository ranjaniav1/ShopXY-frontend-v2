import { httpAxios } from "../httpAxios";

const createOrder = async (paymentMethod) => {
  try {
    // Make a request to your backend to create an order
    const response = await httpAxios.post(`/payment/order`, {
      paymentMethod: paymentMethod,
    });
    // it returns one paypal id which we use for approve order
    const orderData = await response.data;

    if (orderData.id) {
      return orderData.id; // Return the order ID from your backend
    } else {
      throw new Error("Order creation failed");
    }
  } catch (error) {
    console.error("Error creating PayPal order:", error);
  }
};


export { createOrder };