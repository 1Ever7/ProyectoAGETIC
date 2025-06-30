import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { CompetenciaService } from './competencia.service';
import { CreateCompetenciaDto } from './dto/create-competencia.dto';
import { UpdateCompetenciaDto } from './dto/update-competencia.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Competencia')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('competencia')
export class CompetenciaController {
  constructor(private readonly competenciaService: CompetenciaService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Competencia creada exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() dto: CreateCompetenciaDto) {
    return this.competenciaService.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de competencias' })
  findAll() {
    return this.competenciaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Competencia encontrada' })
  @ApiNotFoundResponse({ description: 'Competencia no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.competenciaService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Competencia actualizada' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  @ApiNotFoundResponse({ description: 'Competencia no encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCompetenciaDto) {
    return this.competenciaService.update(id, dto);
  }



 // Eliminar competencia
  @Delete(':id')
  @HttpCode(204)
   @ApiOkResponse({ description: 'Competencia eliminada' })
  @ApiNotFoundResponse({ description: 'Competencia no encontrada' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.competenciaService.remove(id);
  }

  // ⚠️ Generar rondas y equipos automáticamente
  @Post(':id/generar-rondas')
  async generarRondas(@Param('id', ParseIntPipe) id: number) {
    const data = await this.competenciaService.generarRondas(id);
    return {
      message: 'Rondas y equipos generados correctamente.',
      data,
    };
  }

  // Iniciar competencia
  @Post(':id/iniciar')
  async iniciar(@Param('id', ParseIntPipe) id: number) {
    const data = await this.competenciaService.iniciarCompetencia(id);
    return { message: 'Competencia iniciada', data };
  }

  // Detener competencia
 @Post(':id/finalizar')
finalizarCompetencia(@Param('id') id: string) {
  return this.competenciaService.finalizarCompetencia(+id);
}


  // Iniciar una ronda
  @Post('ronda/:rondaId/iniciar')
  async iniciarRonda(@Param('rondaId', ParseIntPipe) rondaId: number) {
    const data = await this.competenciaService.iniciarRonda(rondaId);
    return { message: 'Ronda iniciada', data };
  }

  // Finalizar una ronda
  @Post('ronda/:rondaId/finalizar')
  async finalizarRonda(@Param('rondaId', ParseIntPipe) rondaId: number) {
    const data = await this.competenciaService.finalizarRonda(rondaId);
    return { message: 'Ronda finalizada', data };
  }

}
