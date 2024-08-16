import { httpAxios } from "../httpAxios";

export async function GetCollection() {
  try {
    const response = await httpAxios.get(`/Get-collection`);
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }                              
}

export async function GetSingleCollection({collection_id}) {
  try {
    const response = await httpAxios.get(`/Get-collection/${collection_id}`);
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }                              
}
