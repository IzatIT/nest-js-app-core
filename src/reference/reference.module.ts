import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceService } from './reference.service';
import { ReferenceController } from './reference.controller';
import { Reference } from './entities/reference.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reference])],
    providers: [ReferenceService],
    controllers: [ReferenceController],
    exports: [ReferenceService, TypeOrmModule],
})
export class ReferenceModule { }
