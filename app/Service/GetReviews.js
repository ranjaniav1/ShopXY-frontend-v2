import { httpAxios } from "../httpAxios";

export async function GetSpecificProductReview({ id }) {
  try {
    const response = await httpAxios.get(`/user/review/product/${id}`);
    console.log("product review", response.data);
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }
}


export async function GetSpecificBrandReview({ id }) {
  try {
    const response = await httpAxios.get(`/user/review/brand/${id}`);
    console.log("brand review", response.data);
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
