import axiosInstance from "./index.ts";
import {PostData} from "../const/entity.ts";

export const fetchPostsByBoardId = async (boardId: number): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/posts/byBoardId/${boardId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching boards: ", error);
        throw error;
    }
}

export const addPost = async (postData: PostData) : Promise<any> => {
    try {
        const response = await axiosInstance.post(`/posts/addpost`, postData);
        return response.data.data;
    } catch (error) {
        console.error("Error adding post: ", error);
        throw error;
    }
}