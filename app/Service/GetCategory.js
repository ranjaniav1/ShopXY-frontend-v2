import { httpDataAxios } from "../httpAxios";

export async function GetCategories() {
  try {
    const response = await httpDataAxios.get(`/Get-category`);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
// category based collection
export async function GetSingleCategories({ id }) {
  try {
    const response = await httpDataAxios.get(`/Get-category/${id}`);
    console.log("res of collection service",response)
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
