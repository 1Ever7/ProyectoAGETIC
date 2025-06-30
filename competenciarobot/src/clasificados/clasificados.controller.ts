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
import { ClasificadosService } from './clasificados.service';
import { CreateClasificadoDto } from './dto/create-clasificado.dto';
import { UpdateClasificadoDto } from './dto/update-clasificados.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('Clasificados')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clasificados')
export class ClasificadosController {
  constructor(private readonly service: ClasificadosService) {}

  @Post()
  @ApiOkResponse({ description: 'Clasificado creado correctamente' })
  create(@Body() dto: CreateClasificadoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de clasificados' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Clasificado encontrado' })
  @ApiNotFoundResponse({ description: 'Clasificado no encontrado' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Clasificado actualizado correctamente' })
  update(@Param('id') id: string, @Body() dto: UpdateClasificadoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Clasificado eliminado correctamente' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
 
