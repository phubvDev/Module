export interface UserData {
    id: number;
    name: string;
    email: string;
    emailTitle?: string | null;
    emailNote?: string | null;
    password: string;
    rememberToken?: string | null;
    level: number;
    status: number;
    userId: string;
    address?: string | null;
    job?: string | null;
    note?: string | null;
    phone?: string | null;
    refererId?: string | null;
    detailAddress?: string | null;
    googleId?: string | null;
    facebookId?: string | null;
    naverId?: string | null;
    kakaoId?: string | null;
    appleId?: string | null;
    zipcode?: string | null;
    withdrawalReason?: string | null;
    emailVerifiedAt?: string | null;
    withdrawalDate?: string | null;
    deletedAt?: string | null;
    referer?: UserData | null;
    createdAt: string;
    updatedAt: string;
}


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

export interface LikeData {
    id?: number;
    userId: number;
    postId: number;
    liked: boolean;
    createdAt?: string;
    updatedAt?: string;
}