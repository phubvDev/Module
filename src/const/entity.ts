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