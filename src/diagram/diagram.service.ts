import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diagram } from './entities/diagram.entity';
import { Repository } from 'typeorm';
import { CreateDiagramDto } from './dto/create-diagram.dto';
import { UpdateDiagramDto } from './dto/update-diagram.dto';
import { DiagramSpecification } from './entities';

@Injectable()
export class DiagramService {
    constructor(
        @InjectRepository(Diagram)
        private diagramRepo: Repository<Diagram>,
        @InjectRepository(DiagramSpecification)
        private specificationRepo: Repository<DiagramSpecification>
    ) { }

    async create(dto: CreateDiagramDto): Promise<Diagram> {
        const { diagramSpecificationId, ...rest } = dto;

        const specification = await this.specificationRepo.findOne({
            where: { id: diagramSpecificationId },
        });

        if (!specification) {
            throw new NotFoundException(`DiagramSpecification with ID ${diagramSpecificationId} not found`);
        }

        const diagram = this.diagramRepo.create({
            ...rest,
            diagramSpecification: specification,
        });

        return this.diagramRepo.save(diagram);
    }
    async update(id: number, dto: UpdateDiagramDto): Promise<Diagram> {
        const existing = await this.diagramRepo.findOne({ where: { id } });
        if (!existing) {
            throw new NotFoundException(`Diagram with ID ${id} not found`);
        }
        await this.diagramRepo.update(id, dto);
        return this.findOne(id);
    }
    findAll() {
        return this.diagramRepo.find({
            relations: ['diagramFields', 'diagramFields.values', 'diagramSpecification', 'card'],
        });
    }

    async findOne(id: number): Promise<Diagram> {
        const diagram = await this.diagramRepo.findOne({
            where: { id },
            relations: [
                'diagramFields',
                'diagramFields.values',
                'diagramFields.region',
                'diagramSpecification',
                'card',
            ],
        });

        if (!diagram) {
            throw new NotFoundException(`Diagram with ID ${id} not found`);
        }

        return diagram;
    }
}
