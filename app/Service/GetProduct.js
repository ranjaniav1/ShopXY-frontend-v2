import { httpAxios } from "../httpAxios";

export async function GetSingleProduct({ slug }) {
  try {
    const response = await httpAxios.get(`/Get-product/${slug}`);
    console.log("jnjdb", response.data);
    return response.data;
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
