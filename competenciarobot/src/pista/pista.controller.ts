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
import { PistasService } from './pista.service';
import { CreatePistaDto } from './dto/create-pista.dto';
import { UpdatePistaDto } from './dto/update-pista.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Pistas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pistas')
export class PistasController {
  constructor(private readonly pistasService: PistasService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Pista creada correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  async create(@Body() dto: CreatePistaDto) {
    try {
      return await this.pistasService.create(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de pistas' })
  async findAll() {
    return this.pistasService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Pista encontrada' })
  @ApiNotFoundResponse({ description: 'Pista no encontrada' })
  async findOne(@Param('id') id: string) {
    return this.pistasService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Pista actualizada correctamente' })
  async update(@Param('id') id: string, @Body() dto: UpdatePistaDto) {
    return this.pistasService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Pista eliminada correctamente' })
  async remove(@Param('id') id: string) {
    return this.pistasService.remove(+id);
  }
}
 
