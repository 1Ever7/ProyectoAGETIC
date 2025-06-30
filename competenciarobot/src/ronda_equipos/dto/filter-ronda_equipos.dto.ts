// src/ronda_equipos/dto/filter-ronda_equipo.dto.ts
import { IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum ColorEquipo {
  ROJO = 'rojo',
  AZUL = 'azul',
}

export class FilterRondaEquipoDto {
  @ApiPropertyOptional({ description: 'Color del equipo', enum: ColorEquipo })
  @IsOptional()
  @IsEnum(ColorEquipo)
  color?: ColorEquipo;

  @ApiPropertyOptional({ description: 'Estado de la ronda' })
  @IsOptional()
  estadoRonda?: string; // Puedes usar enum si tienes uno para estados

  @ApiPropertyOptional({ description: 'Número de ronda' })
  @IsOptional()
  @IsInt()
  @Min(1)
  numeroRonda?: number;
}
