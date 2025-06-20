import { httpAxios } from "../httpAxios";

export async function GetCollection() {
  try {
    const response = await httpAxios.get(`/collection`);
    return response.data.data;
  } catch (error) {
    console.log("error in collection", error);
  }
}

export async function GetSingleCollection({ categoryId }) {
  try {
    const response = await httpAxios.get(
      `/collection/${categoryId}`
    );
    console.log("col", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
