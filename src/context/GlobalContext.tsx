// GlobalContext.tsx
import React, {createContext, useContext, useCallback, ReactNode, useState} from "react";
import { fetchBoards } from "../services/boardService.ts";

import {BoardData} from "../const/entity.ts";

type ContextType = {
    boards: BoardData[];
    getBoards: () => Promise<void>;
    userId: string | null;
    setUserId: (id:string) => void;
};

const ProviderContext = createContext<ContextType | undefined>(undefined);

export const GetBoardsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [boards, setBoards] = useState<BoardData[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    const getBoards = useCallback(async () => {
        const data = await fetchBoards();
        setBoards(data);
        console.log("Fetched boards:", data);
    }, []);



    return (
        <ProviderContext.Provider value={{ boards,getBoards,userId,setUserId}}>
            {children}
        </ProviderContext.Provider>
    );
};

export const useContextGlobal = (): ContextType => {
    const context = useContext(ProviderContext);
    if (!context) {
        throw new Error("useGetBoards must be used within a GetBoardsProvider");
    }
    return context;
};
