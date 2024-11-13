import axiosInstance from "./index.ts";
import {BoardData} from "../const/entity.ts";

export const fetchBoards = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get('/boards');
        return response.data.data;
    } catch (error) {
        console.log("Error fetching boards: ", error);
        throw error;
    }
}

export const addBoard = async (boardData: BoardData): Promise<any> => {
    try {
        const response = await axiosInstance.post('/boards/addboard', boardData)
        console.log("data added",response.data.data);
        return response.data.data;
    } catch (error) {
        console.log("Error adding board: ", error);
        throw error;
    }
}

export const updateBoard = async (id:number,updatedData:Partial<BoardData>): Promise<any> => {
    try {
        const response = await axiosInstance.put(`/boards/editboard/${id}`,updatedData);
        return response.data.data;
    } catch (error) {
        console.error("Error updating board: ", error);
        throw error;
    }
}

export const deleteBoard = async (id:number): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`boards/deleteboard/${id}`)
        return response.data.data;
    } catch (error) {
        console.error("Error deleting board: ", error);
        throw error;
    }
}