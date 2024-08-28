import { httpAxios } from "../httpAxios";

export async function Login({ email, password }) {
    try {
        // Send a POST request with email and password in the request body
        const response = await httpAxios.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error("Error in login:", error);
        throw error; // Rethrow error for handling in the component
    }
}


