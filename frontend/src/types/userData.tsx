export interface UserLoginData {
    username: string;
    password: string;
}

export interface ResponseLoginData {
    user_id: number;
    issued_at: string;
    access_token: string;
    access_expires_at: string; 
    refresh_token: string;
    refresh_expires_at: string;
}

// export interface responseUserData {
//     data: UserData
// }