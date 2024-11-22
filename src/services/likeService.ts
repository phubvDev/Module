import axiosInstance from "./index.ts";
import {LikeData} from "../const/entity.ts";

export const fetchLikeByPostId = async (postId : number):Promise<number[]> => {
    try {
        const response = await axiosInstance.get(`/likes/countLikeByPostId/${postId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error getCountlike:",error);
        throw error;
    }
}

export const fetchLikeByUserIdAndPostId = async (userId: number,postId: number) => {
    try {
        const response = await axiosInstance.get(`/likes/getLikeByUserIdAndPostId?userId=${userId}&postId=${postId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error getting likeByUserIdAndPostIdAndPostId: ", error);
        throw error;
    }
}

export const toggleLike = async (likeData : LikeData):Promise<any> => {
    try {
        const response = await axiosInstance.post(`/likes/toggleLike`,likeData);
        return response.data.data;
    }
    catch (error) {
        console.error("Error add Like:",error);
        throw error;
    }
}
