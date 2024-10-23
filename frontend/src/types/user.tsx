export interface IUser {
    id: number,
    position: number,
    username: string,
    password: string,
    role: string,
    first_name: string,
    last_name: string,
    wins: number,
    loses: number,
    vk_id?: number,
    provider?: string,
    enabled?: boolean,
    created_at?: string,
    updated_at?: string,
}

export type UserRegisterData = {
    username: string;
    password: string;
    first_name: string;
    last_name: string
}

export type UserLogin = {
    username: string,
    password: string
}