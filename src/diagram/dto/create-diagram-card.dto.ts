import { ApiProperty } from '@nestjs/swagger';

export class CreateDiagramCardDto {
    @ApiProperty()
    enabled: boolean;

    @ApiProperty()
    titleKg: string;

    @ApiProperty()
    titleRu: string;

    @ApiProperty({ enum: ['top', 'bottom'] })
    arrowPosition: 'top' | 'bottom';

    @ApiProperty()
    arrowShow: boolean;

    @ApiProperty()
    color: string;

    @ApiProperty()
    value: string;
}
