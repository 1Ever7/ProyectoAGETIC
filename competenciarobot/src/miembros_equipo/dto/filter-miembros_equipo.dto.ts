// src/miembros_equipo/dto/filter-miembro_equipo.dto.ts
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum ColorEquipo {
  ROJO = 'rojo',
  AZUL = 'azul',
}

export class FilterMiembroEquipoDto {
  @ApiPropertyOptional({ description: 'Nombre del participante para búsqueda parcial' })
  @IsOptional()
  @IsString()
  nombreParticipante?: string;

  @ApiPropertyOptional({ description: 'Color del equipo', enum: ColorEquipo })
  @IsOptional()
  @IsEnum(ColorEquipo)
  colorEquipo?: ColorEquipo;
}
