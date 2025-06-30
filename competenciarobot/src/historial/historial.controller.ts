 
// src/historial/historial.controller.ts
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
  BadRequestException,
} from '@nestjs/common';
import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('Historial Competencias')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('historial-competencias')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Historial de competencia creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  async create(@Body() dto: CreateHistorialDto) {
    try {
      return await this.historialService.create(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de historiales' })
  findAll() {
    return this.historialService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Historial encontrado' })
  @ApiNotFoundResponse({ description: 'Historial no encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.historialService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Historial actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Historial no encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateHistorialDto) {
    try {
      return await this.historialService.update(+id, dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Historial eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return await this.historialService.remove(+id);
  }
}
