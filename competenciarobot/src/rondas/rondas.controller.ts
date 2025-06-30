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
import { RondasService } from './rondas.service';
import { CreateRondaDto } from './dto/create-rondas.dto';
import { UpdateRondaDto } from './dto/update-rondas.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Rondas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rondas')
export class RondasController {
  constructor(private readonly rondasService: RondasService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Ronda creada correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  async create(@Body() dto: CreateRondaDto) {
    return this.rondasService.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de rondas' })
  async findAll() {
    return this.rondasService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Ronda encontrada' })
  @ApiNotFoundResponse({ description: 'Ronda no encontrada' })
  async findOne(@Param('id') id: string) {
    return this.rondasService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Ronda actualizada correctamente' })
  @ApiNotFoundResponse({ description: 'Ronda no encontrada' })
  async update(@Param('id') id: string, @Body() dto: UpdateRondaDto) {
    return this.rondasService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Ronda eliminada correctamente' })
  @ApiNotFoundResponse({ description: 'Ronda no encontrada' })
  async remove(@Param('id') id: string) {
    return this.rondasService.remove(+id);
  }
}
 
