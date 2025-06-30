import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { FilterEquipoDto } from './dto/filter-equipo.dto';
import { EquipoResponseDto } from './dto/response-equipo.dto';
import { Query } from '@nestjs/common';


@ApiTags('Equipos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  @ApiOkResponse({ description: 'Equipo creado' })
  create(@Body() dto: CreateEquipoDto) {
    return this.equiposService.create(dto);
  }

@Get()
@ApiOkResponse({ description: 'Lista de equipos', type: [EquipoResponseDto] })
async findAll(@Query() filterDto: FilterEquipoDto): Promise<EquipoResponseDto[]> {
  const equipos = await this.equiposService.findAll(filterDto);
  return equipos.map(e => ({
    id: e.id,
    color: e.color,
    creado_en: e.creado_en,
    actualizado_en: e.actualizado_en,
  }));
}

  @Get(':id')
  @ApiOkResponse({ description: 'Equipo encontrado' })
  @ApiNotFoundResponse({ description: 'No encontrado' })
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Equipo actualizado' })
  update(@Param('id') id: string, @Body() dto: UpdateEquipoDto) {
    return this.equiposService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Equipo eliminado' })
  remove(@Param('id') id: string) {
    return this.equiposService.remove(+id);
  }
}
