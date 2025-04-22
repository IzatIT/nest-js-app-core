import { ApiProperty } from '@nestjs/swagger';

export class UsersResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    role: string;
}

export class ChangePasswordRequest {
    @ApiProperty()
    oldPassword: string;

    @ApiProperty()
    newPassword: string;

    @ApiProperty({ required: false })
    userId?: string;
}
