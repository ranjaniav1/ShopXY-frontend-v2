import { httpAxios } from "../httpAxios";

export async function GetProducts({ slug }) {
  try {
    const response = await httpAxios.get(`/Get-service/${slug}`);
    console.log("product received", response.data);
    return response.data;
  } catch (error) {
    console.log("error in product", error);
  }
}

export async function GetAllProducts() {
  try {
    const response = await httpAxios.get(`/Get-product`);
    console.log("product received", response.data);
    return response.data;
  } catch (error) {
    console.log("error in product", error);
  }
}

export async function GetSpecificProducts({ product_id }) {
  try {
    const response = await httpAxios.get(`/Get-product/${product_id}`);
    console.log("product received", response.data);
    return response.data;
  } catch (error) {
    console.log("error in product", error);
  }
}