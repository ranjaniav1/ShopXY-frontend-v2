import { httpDataAxios } from "../httpAxios";

export async function GetCollection() {
  try {
    const response = await httpDataAxios.get(`/Get-collection`);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}

export async function GetSingleCollection({ collection_id }) {
  try {
    const response = await httpDataAxios.get(
      `/Get-collection/${collection_id}`
    );
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
