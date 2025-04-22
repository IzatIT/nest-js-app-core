import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
} from '@nestjs/swagger';
import { DiagramService } from './diagram.service';
import { CreateDiagramDto } from './dto/create-diagram.dto';
import { UpdateDiagramDto } from './dto/update-diagram.dto';
import { Diagram } from './entities/diagram.entity';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';

@ApiTags('Diagrams')
@Controller('diagrams')
export class DiagramController {
    constructor(private readonly diagramService: DiagramService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Создать диаграмму' })
    @ApiBody({ type: CreateDiagramDto })
    @ApiResponse({ status: 201, description: 'Диаграмма успешно создана', type: Diagram })
    async create(@Body() dto: CreateDiagramDto): Promise<Diagram> {
        return this.diagramService.create(dto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Обновить диаграмму по ID' })
    @ApiBody({ type: UpdateDiagramDto })
    @ApiResponse({ status: 200, description: 'Диаграмма обновлена', type: Diagram })
    async update(@Param('id') id: string, @Body() dto: UpdateDiagramDto): Promise<Diagram> {
        return this.diagramService.update(+id, dto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все диаграммы' })
    @ApiResponse({ status: 200, description: 'Список диаграмм', type: [Diagram] })
    async findAll(): Promise<Diagram[]> {
        return this.diagramService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить одну диаграмму по ID' })
    @ApiResponse({ status: 200, description: 'Одна диаграмма', type: Diagram })
    async findOne(@Param('id') id: string): Promise<Diagram> {
        return this.diagramService.findOne(+id);
    }


}
