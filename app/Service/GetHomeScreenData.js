import { httpDataAxios } from "../httpAxios";

export async function GetHomeScreenData() {
  try {
    const response = await httpDataAxios.get("/home-screen-data");
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
