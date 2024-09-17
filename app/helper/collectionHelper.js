
import { GetCollection } from "../Service/GetCollection";

// all collection 
export const fetchCollection = async () => {
  try {
    const result = await GetCollection();
    return result.data; // Return the collection data
  } catch (error) {
    console.error("Failed to fetch collection", error);
    return [];
  }
};

