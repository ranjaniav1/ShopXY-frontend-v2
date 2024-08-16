import { httpAxios } from "../httpAxios";

export async function GetHomeScreenData() {
  try {
    const response = await httpAxios.get("/home-screen-data");
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
