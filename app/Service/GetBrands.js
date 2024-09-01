import {  httpDataAxios } from "../httpAxios";

export async function GetBrands() {
  try {
    const response = await httpDataAxios.get(`/Get-brands`);
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }                              
}

export async function GetSingleBrands({brand_id}) {
  try {
    const response = await httpDataAxios.get(`/Get-brands/${brand_id}`);
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }                              
}
