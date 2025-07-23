import { httpAxios } from "../httpAxios";

export async function GetCollectionsByCategory({ categoryId }) {
  try {
    const response = await httpAxios.get(
      `/collection/category/${categoryId}`
    );
    console.log("col", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}

export async function GetCollection(page) {

  try {
    const response = await httpAxios.get(
      `/collection`, { params: { page } }
    );
    console.log("col", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("error in collection", error);
  }
}
