import { ApiProperty } from '@nestjs/swagger';
import { CreateDiagramSpecificationDto } from '../../diagram-specification/dto/create-diagram-specification.dto';
import { CreateDiagramCardDto } from './create-diagram-card.dto';
import { CreateDiagramFieldDto } from './create-diagram-field.dto';

export class CreateDiagramDto {
    @ApiProperty()
    titleRu: string;

    @ApiProperty()
    titleKg: string;

    @ApiProperty()
    order: number;

    @ApiProperty()
    descriptionKg: string;

    @ApiProperty()
    descriptionRu: string;

    @ApiProperty()
    from: string;

    @ApiProperty()
    to: string;

    @ApiProperty({ required: false })
    type?: string;

    @ApiProperty({ description: 'ID ранее созданной спецификации диаграммы' })
    diagramSpecificationId: number;

    @ApiProperty({ type: () => CreateDiagramCardDto })
    card: CreateDiagramCardDto;

    @ApiProperty({ type: () => [CreateDiagramFieldDto] })
    diagramFields: CreateDiagramFieldDto[];
}
