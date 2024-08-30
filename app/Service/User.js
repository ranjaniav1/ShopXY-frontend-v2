import { httpAxios } from "../httpAxios";
// register user
export async function Register(formDataToSubmit) {
  try {
    const response = await httpAxios.post(
      "/user/auth/signup",
      formDataToSubmit,
      {
        headers: {
          "Content-Type": "multipart/form-data" // Make sure the content type is set correctly for form data
        }
      }
    );

    if (response.status === 201) {
      const result = response.data;
      console.log("Registration successful:", result);
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

// login user
export async function Login({ email, password }) {
  try {
    // Send a POST request with email and password in the request body
    const response = await httpAxios.post("/user/auth/login", {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error("Error in login:", error);
    throw error; // Rethrow error for handling in the component
  }
}
