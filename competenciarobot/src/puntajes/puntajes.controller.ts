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
import { PuntajesService } from './puntajes.service';
import { CreatePuntajeDto } from './dto/create-puntajes.dto';
import { UpdatePuntajeDto } from './dto/update-puntajes.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiBadRequestResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('Puntajes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('puntajes')
export class PuntajesController {
  constructor(private readonly service: PuntajesService) {}

  @Post()
  @ApiOkResponse({ description: 'Puntaje creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  async create(@Body() dto: CreatePuntajeDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de puntajes' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Puntaje encontrado' })
  @ApiNotFoundResponse({ description: 'Puntaje no encontrado' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Puntaje actualizado correctamente' })
  update(@Param('id') id: string, @Body() dto: UpdatePuntajeDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Puntaje eliminado correctamente' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
