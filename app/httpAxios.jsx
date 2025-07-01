import axios from "axios";

const BASE_URL = "https://eshop-backend-tau.vercel.app/api/v2";

// 🔁 Helper to get cookies from the browser
function getCookie(name) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// 📦 Axios instance
export const httpAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 5000, // ⏳ Prevent infinite waiting
});

// ✅ Request interceptor — skip token for public routes
httpAxios.interceptors.request.use(
  (config) => {
    const isPublicRoute = config.url?.includes("/home") || config.url?.includes("/public");

    if (!isPublicRoute) {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🛠️ Token Refresh Logic
let isRefreshing = false;
let failedQueue=[];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

httpAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh-token")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(httpAxios(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.get(`${BASE_URL}/user/auth/refresh-token`, {
          withCredentials: true,
        });

        const newAccessToken = res.data?.accessToken;

        if (newAccessToken) {
          document.cookie = `accessToken=${newAccessToken}; path=/`;

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return httpAxios(originalRequest);
        } else {
          throw new Error("Access token not received");
        }
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
