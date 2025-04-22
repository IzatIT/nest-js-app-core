import { ApiProperty } from '@nestjs/swagger';

export class CreateReferenceDto {
    @ApiProperty()
    titleRu: string;

    @ApiProperty()
    titleKg: string;

    @ApiProperty()
    titleEn: string;
}
