import axiosInstance from "./index.ts";

export const fetchUserByUserId = async (userId: string):Promise<any> => {
    try {
        const response = await axiosInstance.get(`/users/userId/${userId}`)
        return response.data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }

}