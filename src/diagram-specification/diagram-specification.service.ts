import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagramSpecification } from '../diagram/entities';
import { CreateDiagramSpecificationDto } from './dto/create-diagram-specification.dto';
import { UpdateDiagramSpecificationDto } from './dto/update-diagram-specification.dto';

@Injectable()
export class DiagramSpecificationService {
  constructor(
    @InjectRepository(DiagramSpecification)
    private specRepo: Repository<DiagramSpecification>,
  ) { }

  async create(dto: CreateDiagramSpecificationDto): Promise<DiagramSpecification> {
    const entity = this.specRepo.create(dto);
    return this.specRepo.save(entity);
  }

  async update(id: number, dto: UpdateDiagramSpecificationDto): Promise<DiagramSpecification> {
    const existing = await this.specRepo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Diagram specification with ID ${id} not found`);
    }
    await this.specRepo.update(id, dto);
    return this.findOne(id);
  }

  async findAll(): Promise<DiagramSpecification[]> {
    return this.specRepo.find();
  }

  async findOne(id: number): Promise<DiagramSpecification> {
    const spec = await this.specRepo.findOne({ where: { id } });
    if (!spec) throw new NotFoundException(`Specification with ID ${id} not found`);
    return spec;
  }
}
