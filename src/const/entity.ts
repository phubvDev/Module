export interface BoardData {
    id: number;
    boardId: string;
    type: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    preface: boolean;
    prefaceText: string;
    managerId: number;
    read: number;
    write: number;
    membershipSystem: boolean;
    status: number;
}

export interface PostData {
    id: number;
    boardId: number;
    prefaceText: string;
    title: string;
    writerName: string;
    date: string;
    detail: string;
    attachment1: string;
    attachment2: string;
    attachment3: string;
    youtubeURL: string;
    thumbnail: string;
    totalView: number;
    createdAt: string;
    updatedAt: string;
    images: string;
}