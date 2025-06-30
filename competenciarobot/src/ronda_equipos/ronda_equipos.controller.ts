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
import { RondaEquiposService } from './ronda_equipos.service';
import { FilterRondaEquipoDto } from './dto/filter-ronda_equipos.dto';
import { RondaEquipo } from './entities/ronda_equipos.entity';

@ApiTags('Ronda Equipos')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('ronda-equipos')
export class RondaEquiposController {
  constructor(private readonly service: RondaEquiposService) {}

  @Get()
  @ApiOkResponse({ description: 'Lista de rondas con equipos', type: [RondaEquipo] })
  @ApiNotFoundResponse({ description: 'No se encontraron rondas con equipos' })
  findAll(@Query() filtro: FilterRondaEquipoDto) {
    return this.service.findAll(filtro);
  }


}
