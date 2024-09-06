import { httpAxios } from "../httpAxios";

export const searchProduct = async (query) => {
  try {
    const response = await httpAxios.get("/search", {
      params: { query: query }
    });
    return response.data; // Return data from the response
  } catch (error) {
    console.error("Search query error:", error);
    throw error; 
  }
};
