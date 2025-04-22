import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { DiagramSpecificationService } from './diagram-specification.service';
import { CreateDiagramSpecificationDto } from './dto/create-diagram-specification.dto';
import { DiagramSpecification } from '../diagram/entities';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { UpdateDiagramSpecificationDto } from './dto/update-diagram-specification.dto';

@ApiTags('DiagramSpecifications')
@Controller('diagram-specifications')
export class DiagramSpecificationController {
    constructor(private readonly specService: DiagramSpecificationService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Создать спецификацию диаграммы' })
    @ApiResponse({ status: 201, type: DiagramSpecification })
    create(@Body() dto: CreateDiagramSpecificationDto): Promise<DiagramSpecification> {
        return this.specService.create(dto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Обновить диаграмму по ID' })
    @ApiBody({ type: UpdateDiagramSpecificationDto })
    @ApiResponse({ status: 200, description: 'Cпецификацию диаграммы обновлена', type: DiagramSpecification })
    async update(@Param('id') id: string, @Body() dto: UpdateDiagramSpecificationDto): Promise<DiagramSpecification> {
        return this.specService.update(+id, dto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все спецификации диаграмм' })
    @ApiResponse({ status: 200, type: [DiagramSpecification] })
    findAll(): Promise<DiagramSpecification[]> {
        return this.specService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить одну спецификацию по ID' })
    @ApiResponse({ status: 200, type: DiagramSpecification })
    findOne(@Param('id') id: string): Promise<DiagramSpecification> {
        return this.specService.findOne(+id);
    }
}
