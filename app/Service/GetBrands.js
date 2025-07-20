import {  httpAxios } from "../httpAxios";


export async function GetBrandsByCollection({collectionId}) {
  try {
    const response = await httpAxios.get(`/brands/collection/${collectionId}`);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }                              
}
export async function GetBrands() {
  try {
    const response = await httpAxios.get(`/brands`);
    return response.data.data;
  } catch (error) {
    console.log("error in Brands", error);
  }                              
}
