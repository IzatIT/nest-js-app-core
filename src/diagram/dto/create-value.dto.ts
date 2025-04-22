import { ApiProperty } from '@nestjs/swagger';

export class CreateValueDto {
    @ApiProperty({ nullable: true })
    value: number | null;

    @ApiProperty()
    titleKg: string;

    @ApiProperty()
    titleRu: string;

    @ApiProperty()
    titleEn: string;
}
