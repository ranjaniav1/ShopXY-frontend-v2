import { httpAxios } from "../httpAxios";

export async function Register(formDataToSubmit) {
  try {
    const response = await httpAxios.post("/auth/signup", formDataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data', // Make sure the content type is set correctly for form data
      },
    });

    if (response.status === 201) {
      const result = response.data;
      console.log("Registration successful:",result);
      return result; // You may return the result to use it in the component if needed
    } else {
      console.error("Registration failed:", response.data);
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the component
  }
}
