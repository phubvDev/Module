import axiosInstance from "./index.ts";
import {CommentData} from "../const/entity.ts";

export const fetchAllCommentsByPostId = async (postId: number) => {
    try {
        const response = await axiosInstance.get(`/comments/byPostIdOrParentId?postId=${postId}`)
        return response.data.data;
    } catch (error) {
        console.error("Error fetching comments: ", error);
        throw error;
    }
}

export const addComment = async (commentData: CommentData) => {
    try {
        const response = await axiosInstance.post(`/comments/addcomment`,commentData)
        return response.data.data;
    }
    catch (error) {
        console.error("Error add comment: ", error);
        throw error;
    }
}

export const updateComment = async (id: number, commentData:any) => {
    try {
        const response = await axiosInstance.patch(`/comments/updatecomment/${id}`, commentData)
        return response.data;
    } catch (error) {
        console.error("Error edit comment: ", error);
        throw error;
    }
}

export const deletesoftComment = async (id:number) => {
    try {
        const response = await axiosInstance.patch(`/comments/deletesoftcomment/${id}`)
        return response.data;
    }
    catch (error) {
        console.error("Error edit comment: ", error);
        throw error;
    }
}