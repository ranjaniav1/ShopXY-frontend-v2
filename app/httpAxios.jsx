import axios from "axios";

export const httpAxios = axios.create({ baseURL: "http://localhost:9000/api/v2", withCredentials: true })
export const httpDataAxios = axios.create({ baseURL: "https://eshop-backend-tau.vercel.app/api/v2" })
