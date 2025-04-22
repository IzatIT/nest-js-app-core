import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagramController } from './diagram.controller';
import { DiagramService } from './diagram.service';
import {
    Diagram,
    DiagramField,
    DiagramFieldValue,
    DiagramCard,
    DiagramSpecification,
} from './entities';
import { ReferenceModule } from 'src/reference/reference.module';

@Module({
    imports: [TypeOrmModule.forFeature([
        Diagram,
        DiagramField,
        DiagramFieldValue,
        DiagramCard,
        DiagramSpecification,
    ]),
        ReferenceModule,
    ],
    controllers: [DiagramController],
    providers: [DiagramService],
})
export class DiagramModule { }
