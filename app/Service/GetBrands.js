import {  httpAxios } from "../httpAxios";

export async function GetBrands() {
  try {
    const response = await httpAxios.get(`/brands`);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }                              
}

export async function GetBrandsByCollection({brand_id}) {
  try {
    const response = await httpAxios.get(`/brands/collection/${brand_id}`);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }                              
}
