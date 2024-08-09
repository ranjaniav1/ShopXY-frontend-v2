import { httpAxios } from "../httpAxios";

export async function GetProducts({ slug }) {
  try {
    const response = await httpAxios.get(`/Get-service/${slug}`);
    console.log("category received", response.data);
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
