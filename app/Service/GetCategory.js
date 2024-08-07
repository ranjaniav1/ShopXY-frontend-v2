import { httpAxios } from "../httpAxios";

export async function GetCategories() {
  try {
    const response = await httpAxios.get("/home-screen-data");
    console.log("category received", response.data);
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
