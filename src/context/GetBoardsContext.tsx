// GetBoardsContext.tsx
import React, {createContext, useContext, useCallback, ReactNode, useState} from "react";
import { fetchBoards } from "../services/boardService.ts";

import {BoardData} from "../const/entity.ts";

type GetBoardsContextType = {
    boards: BoardData[];
    getBoards: () => Promise<void>;
};

const GetBoardsContext = createContext<GetBoardsContextType | undefined>(undefined);

export const GetBoardsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [boards, setBoards] = useState<BoardData[]>([]);

    const getBoards = useCallback(async () => {
        const data = await fetchBoards();
        setBoards(data);
        console.log("Fetched boards:", data);
    }, []);



    return (
        <GetBoardsContext.Provider value={{ boards,getBoards}}>
            {children}
        </GetBoardsContext.Provider>
    );
};

export const useGetBoards = (): GetBoardsContextType => {
    const context = useContext(GetBoardsContext);
    if (!context) {
        throw new Error("useGetBoards must be used within a GetBoardsProvider");
    }
    return context;
};
