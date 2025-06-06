import { httpAxios } from "../httpAxios";

export async function GetCategories() {
  try {
    const response = await httpAxios.get(`/category`);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
