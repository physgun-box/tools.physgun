export interface IUser {
    username: string;
    id: string;
}

export interface IFetchedUser {
    user: {
        nickname: string;
    }
    access_token: string;
}

export interface IPost {
    from: number;
    datetime: string;
    message_post: string;
    thumbnail_post: string;
}