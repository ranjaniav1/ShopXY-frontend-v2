import { httpAxios } from "../httpAxios"

export const fetchHomeData = async () => {
  try {
    const response = await httpAxios.get("/home");
    console.log("✅ API response:", response);
    return response.data;
  } catch (err) {
    console.error("❌ fetchHomeData error:", err);
    return null;
  }
};
