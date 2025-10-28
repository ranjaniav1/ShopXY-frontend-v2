import { httpAxios } from "../httpAxios";

// all product display
export async function GetAllProducts(page = 1, limit = 12) {
  try {
    const response = await httpAxios.get(`/products`, { params: { page, limit } });
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

export async function GetFilteredProduct(params = {}) {
  try {
    // Extract type (default: "product")
    const { type = "product" } = params;

    // Build query dynamically
    const query = {
      type, // 👈 dynamic type (product, category, brand, collection)
      ...(params.category && { category: params.category }),
      ...(params.collection && { collection: params.collection }),
      ...(params.brand && { brand: params.brand }),
      ...(params.minPrice !== undefined && { minPrice: params.minPrice }),
      ...(params.maxPrice !== undefined && { maxPrice: params.maxPrice }),
      ...(params.rating !== undefined && { rating: params.rating }),
      ...(params.inStock && { inStock: "true" }),
      ...(params.specialOffer && { specialOffer: "true" }),
      ...(params.sort && { sort: params.sort }),
      ...(params.search && { search: params.search }),
    };


    const response = await httpAxios.get(`/products/filters`, { params: query });
    return response.data?.data || [];
  } catch (error) {
    console.error("❌ error in GetFilteredProduct:", error);
    return [];
  }
}




