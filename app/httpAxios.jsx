import axios from "axios";

export const httpAxios = axios.create({ baseURL: "https:/eshop-backend-tau.vercel.app/api/v2", withCredentials: true })
export const httpDataAxios = axios.create({ baseURL: "https://eshop-backend-tau.vercel.app/api/v2" })
