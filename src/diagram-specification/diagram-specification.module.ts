import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagramSpecification } from './entities/diagram-specification.entity';
import { DiagramSpecificationService } from './diagram-specification.service';
import { DiagramSpecificationController } from './diagram-specification.controller';

@Module({
    imports: [TypeOrmModule.forFeature([DiagramSpecification])],
    providers: [DiagramSpecificationService],
    controllers: [DiagramSpecificationController],
    exports: [DiagramSpecificationService],
})
export class DiagramSpecificationModule { }
