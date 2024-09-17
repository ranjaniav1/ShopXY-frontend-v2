import { httpDataAxios } from "../httpAxios";

export async function GetCategories() {
  try {
    const response = await httpDataAxios.get(`/Get-category`);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}

export async function GetSingleCategories({ collection_id }) {
  try {
    const response = await httpDataAxios.get(`/Get-category/${collection_id}`);
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
