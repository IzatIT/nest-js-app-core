import { Controller, Get, Post, Body, UseGuards, Put, Param } from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Reference } from './entities/reference.entity';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';

@ApiTags('Reference')
@Controller('reference')
export class ReferenceController {
    constructor(private readonly referenceService: ReferenceService) { }

    @Get()
    @ApiOperation({ summary: 'Получить все справочники' })
    @ApiResponse({ status: 200, type: [Reference] })
    findAll(): Promise<Reference[]> {
        return this.referenceService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Создать справочник' })
    @ApiResponse({ status: 201, type: Reference })
    create(@Body() data: CreateReferenceDto): Promise<Reference> {
        return this.referenceService.create(data);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Создать справочник' })
    @ApiResponse({ status: 201, type: Reference })
    update(@Param('id') id: number, @Body() dto: UpdateReferenceDto): Promise<Reference> {
        return this.referenceService.update(id, dto);
    }
}
