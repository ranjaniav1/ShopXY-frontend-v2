import { httpAxios } from "../httpAxios";
// register user
export async function Register(formDataToSubmit) {
  try {
    const response = await httpAxios.post(
      "/user/auth/signup",
      formDataToSubmit
    );

    if (response.status === 201) {
      const result = response.data;
      return result;
    } else {
      console.error("Registration failed:", response.data);
      throw new Error(response.data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// login user
export async function Login({ email, password }) {
  try {
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
// Logout user
export async function Logout({ userId }) {
  try {
    const response = await httpAxios.post("/user/auth/logout", { userId },{ withCredentials: true });

    if (response.status === 200) {
      console.log("Logout successful:", response.data);
      return response.data;
    } else {
      console.error("Logout failed:", response.data);
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}

// Delete user account
export async function DeleteAccount(userId) {
  try {
    const response = await httpAxios.delete("/user/auth/delete-account", {
      data: { userId } // Correctly send the userId in the request body
    });

    console.log("Account deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during account deletion:", error);
    throw error;
  }
}

// Edit user profile
export async function EditUser(formData) {
  try {
    const response = await httpAxios.put("/user/auth/edit-user", formData, {
      headers: {
        "Content-Type": "multipart/form-data" // Important for file uploads
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error during edit profile:", error);
    throw error;
  }
}
