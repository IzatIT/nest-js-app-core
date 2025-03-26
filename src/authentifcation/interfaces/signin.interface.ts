export interface SignInRequest {
    username: string;
    password: string;
}

export interface SignInResponse {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    accessToken: string;
    refreshToken: string;
}

