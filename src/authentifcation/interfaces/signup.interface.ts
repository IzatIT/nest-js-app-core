export interface SignUpRequest {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface SignUpResponse {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
}
