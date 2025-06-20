import { httpAxios } from "../httpAxios";

export const searchProduct = async (query) => {
  if (!query) return []; 

  try {
    const response = await httpAxios.get("/search", {
      params: { query: query }, 
    });
    return response.data ;
  } catch (error) {
    console.error("Search query error:", error);
    return []; 
  }
};
