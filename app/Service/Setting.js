import { httpAxios } from "../httpAxios"

export const getWebSetting = async () => {
    try {
        const res = await httpAxios.get("/web-setting");
        return res.data.data;
    } catch (error) {
        console.error("Failed to fetch web settings", error);
        return null;

    }
}