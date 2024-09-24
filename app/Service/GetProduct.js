import { httpAxios } from "../httpAxios";

// all product display
export async function GetAllProducts() {
  try {
    const response = await httpAxios.get(`/Get-product`);
    console.log("product received", response.data);
    return response.data;
  } catch (error) {
    console.log("error in product", error);
  }
}

// collection based product
export async function GetSingleProduct({ productId }) {
  try {
    const response = await httpAxios.get(`/Get-product/${productId}`);
    console.log("jnjdb", response.data.data.product);
    return response.data.data.product;
  } catch (error) {
    console.log("error in category", error);
  }
}
// single product
export async function GetSpecificProduct({ id }) {
  try {
    const response = await httpAxios.get(`/Get-product/specific/${id}`);
    console.log("single", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("error in category", error);
  }
}

// collection based but for brand get last so
export async function GetSingleProductBrand({ productId }) {
  try {
    const response = await httpAxios.get(`/Get-product/${productId}`);
    console.log("jnjdb", response.data.data.brand);
    return response.data.data.brand;
  } catch (error) {
    console.log("error in category", error);
  }
}
