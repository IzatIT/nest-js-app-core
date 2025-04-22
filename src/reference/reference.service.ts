import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reference } from './entities/reference.entity';
import { UpdateReferenceDto } from './dto/update-reference.dto';

@Injectable()
export class ReferenceService {
    constructor(
        @InjectRepository(Reference)
        private referenceRepo: Repository<Reference>,
    ) { }

    findAll(): Promise<Reference[]> {
        return this.referenceRepo.find();
    }

    async create(data: Partial<Reference>): Promise<Reference> {
        const ref = this.referenceRepo.create(data);
        return this.referenceRepo.save(ref);
    }

    async update(id: number, dto: UpdateReferenceDto): Promise<Reference> {
        const existing = await this.referenceRepo.findOne({ where: { id } });
        if (!existing) {
            throw new NotFoundException(`Diagram specification with ID ${id} not found`);
        }
        await this.referenceRepo.update(id, dto);
        return this.findOne(id);
    }

    async findOne(id: number): Promise<Reference> {
        const reference = await this.referenceRepo.findOne({ where: { id } });

        if (!reference) {
            throw new NotFoundException(`Reference with ID ${id} not found`);
        }
        return reference;
    }
}
