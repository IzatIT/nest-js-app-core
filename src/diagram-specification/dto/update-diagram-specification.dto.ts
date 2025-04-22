import { PartialType } from '@nestjs/swagger';
import { CreateDiagramSpecificationDto } from './create-diagram-specification.dto';

export class UpdateDiagramSpecificationDto extends PartialType(CreateDiagramSpecificationDto) { }
