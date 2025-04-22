import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequest {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    role: string;
}


export class SignUpResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    isActive: boolean;

}
