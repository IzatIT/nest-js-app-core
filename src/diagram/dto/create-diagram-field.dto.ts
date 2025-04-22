import { ApiProperty } from '@nestjs/swagger';
import { CreateValueDto } from './create-value.dto';

export class CreateDiagramFieldDto {
    @ApiProperty()
    titleKg: string;

    @ApiProperty()
    titleRu: string;

    @ApiProperty()
    fieldValue: number;

    @ApiProperty()
    order: number;

    @ApiProperty()
    code: string;

    @ApiProperty({ required: false, nullable: true })
    regionId?: number;

    @ApiProperty({ type: () => [CreateValueDto] })
    values: CreateValueDto[];
}
