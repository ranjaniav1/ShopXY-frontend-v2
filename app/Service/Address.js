import { httpAxios } from "../httpAxios";

export const CreateAddress = async (userId,addressData) => {
  try {
    const response = await httpAxios.post("/user/address/create", {
      userId,
      addresses: [addressData]
    });
    return response.data;
  } catch (error) {
    console.log("error in create address", error);
  }
};
