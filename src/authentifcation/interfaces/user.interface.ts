export interface UsersGetAllResponse {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    userId?: string;
}