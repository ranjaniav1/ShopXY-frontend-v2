import { httpAxios } from "../httpAxios";

export async function GetSingleProduct({ productId }) {
  try {
    const response = await httpAxios.get(`/Get-product/${productId}`);
    console.log("jnjdb", response.data.data.product);
    return response.data.data.product;
  } catch (error) {
    console.log("error in category", error);
  }
}

export async function GetSpecificProduct({ id }) {
  try {
    const response = await httpAxios.get(`/Get-product/specific/${id}`);
    console.log("single", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}
export async function GetSingleProductBrand({ productId }) {
  try {
    const response = await httpAxios.get(`/Get-product/${productId}`);
    console.log("jnjdb", response.data.data.brand);
    return response.data.data.brand;
  } catch (error) {
    console.log("error in category", error);
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
// // brand based product
// export async function GetSpecificProducts({ product_id }) {
//   try {
//     const response = await httpAxios.get(`/Get-product/${product_id}`);
//     console.log("product received", response.data);
//     return response.data;
//   } catch (error) {
//     console.log("error in product", error);
//   }
// }
