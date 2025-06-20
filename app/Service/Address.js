import { httpAxios } from "../httpAxios";

export const CreateAddress = async (
  userId,
  address,
  city,
  state,
  postalCode,
  country,
  phone
) => {
  try {
     // Step 1: Get existing addresses
     const existing = await getAddress(userId);
        // Step 2: If it's the first one, mark as primary
    const isPrimary = existing?.length === 0;
    const response = await httpAxios.post("/user/address/create", {
      userId,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      isPrimary,
    });
    return response.data;
  } catch (error) {
    console.log("error in create address", error);
  }
};

export const getAddress = async (userId) => {
  try {
    const response = await httpAxios.get(`/user/address/${userId}`);
    return response.data;
  } catch (error) {
    console.log("error in create address", error);
  }
};

export const removeAddress = async (userId, addressId) => {
  try {
    const response = await httpAxios.delete(`/user/address/delete/${userId}/${addressId}`);
    return response.data;
  } catch (error) {
    console.log("Error removing address:", error);
  }
};
export const updateAddress = async (
  userId,
  addressId,
  address,
  city,
  state,
  postalCode,
  country,
  phone,
  isPrimary
) => {
  try {
      const response = await httpAxios.put("/user/address/update", {
          userId,
          addressId,
          address,
          city,
          state,
          postalCode,
          country,
          phone,
          isPrimary
      });
      return response.data;
  } catch (error) {
      console.log("Error updating address:", error);
  }
};

