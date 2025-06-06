import { httpAxios } from "../httpAxios";

export async function GetHomeScreenData() {
  try {
    const response = await httpAxios.get("/swiper");
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
