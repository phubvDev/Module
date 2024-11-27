import axiosInstance from "./index.ts";

export const fetchPostsByBoardId = async (boardId: number,page:number,size: number): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/posts/byBoardId/${boardId}`,{
            params:{page,size},
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching posts: ", error);
        throw error;
    }
}

export const fetchPostByBoardIdAndPrefaceText = async (boardId: number,prefaceText:string,page:number,size:number):Promise<any> => {
    try {
        const response = await axiosInstance.get(`/posts/board/${boardId}/preface`,{
            params:{prefaceText,page,size},
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching posts: ", error);
        throw error;
    }
}

export const addPost = async (formData : FormData) : Promise<any> => {
    try {
        // Gửi FormData lên server
        const response = await axiosInstance.post(`/posts/addpost`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data.data;
    } catch (error) {
        console.error("Error adding post: ", error);
        throw error;
    }
}

export const updatePost = async (id: number,updatedData: FormData) : Promise<any> => {
    try {
        const response = await axiosInstance.put(`/posts/editpost/${id}`,updatedData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error updating post: ", error);
        throw error;
    }
}

export const updateTotalView = async (id:number) : Promise<any> => {
    try {
        const response = await axiosInstance.patch(`posts/updatetotalview/${id}`)
        return response.data.data;
    } catch (error) {
        console.error("Error updating post: ", error);
        throw error;
    }
}

export const deletePost = async (id:number): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`posts/deletepost/${id}`)
        return response.data.data;
    } catch (error) {
        console.error("Error deleting board: ", error);
        throw error;
    }
}