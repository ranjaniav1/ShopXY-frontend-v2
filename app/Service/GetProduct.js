import { httpAxios } from "../httpAxios";

// all product display
export async function GetAllProducts(page,limit) {
  try {
    const response = await httpAxios.get(`/products?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.log("error in product", error);
  }
}

// collection based product
export async function GetSingleProduct({ id }) {
  try {
    const response = await httpAxios.get(`/-products/${id}`);
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


