import axios from "axios";
import { httpAxios } from "../httpAxios";
import { loadStripe } from "@stripe/stripe-js";

export const cashOnDelivery = async (userId, cartId) => {
  try {
    const response = await httpAxios.post("/user/payment/place-order-cod", {
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

// Stripe Payment Service (new)
export const createStripePayment = async (userId, cartId, cartData) => {
  try {
    const response = await axios.post(
      "https://eshop-backend-tau.vercel.app/api/v2/user/payment/order",
      {
        cartData,
        paymentMethod: "stripe",
        metadata: {
          userId,
          cartId
        }
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error during Stripe payment creation", error);
    throw error;
  }
};

// Function to handle Stripe session and redirect
export const handleStripePayment = async (userId, cartId, cartData) => {
  const stripePublicKey =
    "pk_test_51PxLryRrN241bQ7Plo5ZmfXZqbcdcPPkaeMhCjYGPlr1kcCKvnWApXpNh1r9vfOTp6ZIWc0nOgv5sK4Ec3hbvVJj00vEdntnWT";
  const stripe = await loadStripe(stripePublicKey); // Load Stripe instance

  try {
    const { id: sessionId } = await createStripePayment(
      userId,
      cartId,
      cartData
    ); // Create Stripe session
    console.log("session id", sessionId);
    if (!sessionId) {
      toast.error("Stripe session creation failed.");
      return;
    }
    const { error } = await stripe.redirectToCheckout({ sessionId }); // Redirect to Stripe Checkout

    if (error) {
      console.error("Stripe redirection error:", error);
      throw error;
    }
  } catch (error) {
    console.log("Payment failed:", error);
    throw error;
  }
};
