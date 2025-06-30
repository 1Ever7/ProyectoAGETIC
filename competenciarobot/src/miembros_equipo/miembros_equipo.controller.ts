import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { MiembrosEquipoService } from './miembros_equipo.service';
import { FilterMiembroEquipoDto } from './dto/filter-miembros_equipo.dto';
import { MiembroEquipo } from './entities/miembros_equipo.entity';

@ApiTags('Miembros Equipo')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('miembros-equipo')
export class MiembrosEquipoController {
  constructor(private readonly miembrosEquipoService: MiembrosEquipoService) {}

  @Get()
  @ApiOkResponse({ description: 'Lista de miembros de equipos', type: [MiembroEquipo] })
  @ApiNotFoundResponse({ description: 'No se encontraron miembros con los filtros dados' })
  findAll(@Query() filtro: FilterMiembroEquipoDto) {
    return this.miembrosEquipoService.findAll(filtro);
  }


  @Get(':id')
  @ApiOkResponse({ description: 'Miembro encontrado por ID' })
  @ApiNotFoundResponse({ description: 'Miembro no encontrado' })
  findOne(@Param('id') id: number) {
    return this.miembrosEquipoService.findOne(id);
  }
}
