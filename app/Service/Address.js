import { httpAxios } from "../httpAxios";

export const CreateAddress = async (userId, addressData) => {
  try {
    const response = await httpAxios.post("/user/address/create", {
      userId,
      data: [addressData]
    });
    return response;
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
    const response = await httpAxios.delete("/user/address/delete", {
      data: { userId, addressId }
    });
    return response.data;
  } catch (error) {
    console.log("Error removing address:", error);
  }
};
