import { httpAxios } from "../httpAxios";

// all product display
export async function GetAllProducts() {
  try {
    const response = await httpAxios.get(`/products`);
    console.log("ndjaj", response)
    return response.data.data;
  } catch (error) {
    console.log("error in product", error);
  }
}

// collection based product
export async function GetSingleProduct({ slug }) {
  try {
    const response = await httpAxios.get(`/products/${slug}`);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
// based on collection id 
export async function GetSpecificProduct({ id }) {
  try {
    const response = await httpAxios.get(`/products/specific/${id}`);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
// based on category id 
export async function GetFilteredProduct(params) {
  try {
    const response = await httpAxios.get(`/products/filters`, {
      params
    });
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}



