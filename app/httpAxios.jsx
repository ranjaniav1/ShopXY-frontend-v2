import axios from "axios";

const BASE_URL = "https://eshop-backend-tau.vercel.app/api/v2";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const httpAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

httpAxios.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});


// Add response interceptor for refreshing access token
httpAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(httpAxios(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.get(
          `${BASE_URL}/user/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data?.accessToken;
        if (newAccessToken) {
          document.cookie = `accessToken=${newAccessToken}; path=/`;

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return httpAxios(originalRequest);
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



