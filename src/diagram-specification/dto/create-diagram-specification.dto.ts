import { ApiProperty } from '@nestjs/swagger';

export class CreateDiagramSpecificationDto {
    @ApiProperty()
    order: number;

    @ApiProperty()
    titleRu: string;

    @ApiProperty()
    titleKg: string;
}
