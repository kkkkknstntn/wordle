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
    username?: string;
    password?: string;
    first_name?: string;
    last_name?: string
}

export interface UpdateUserData {
    userData: UserRegisterData,
    id?: number
}

export type UserLogin = {
    username: string,
    password: string
}

export type LoginResponse = {
    user_id: number,
    issued_at: string,
    access_token: string,
    access_expires_at: Date,
    refresh_token: string,
    refresh_expires_at: Date
}