import { ApiProperty } from '@nestjs/swagger';

export class SignInRequest {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}


export class SignInResponse {
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

    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
}

