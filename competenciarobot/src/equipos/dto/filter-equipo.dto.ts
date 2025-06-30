// src/equipos/dto/filter-equipo.dto.ts
import { IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterEquipoDto {
  @ApiPropertyOptional({ enum: ['rojo', 'azul'], description: 'Filtrar por color del equipo' })
  @IsOptional()
  @IsIn(['rojo', 'azul'])
  color?: 'rojo' | 'azul';
}
