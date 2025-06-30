import { IsOptional, IsEnum, IsInt, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterRondaDto {
  @ApiPropertyOptional({ description: 'Estado de la ronda', enum: ['pendiente', 'en_curso', 'finalizada'] })
  @IsOptional()
  @IsEnum(['pendiente', 'en_curso', 'finalizada'])
  estado?: 'pendiente' | 'en_curso' | 'finalizada';

  @ApiPropertyOptional({ description: 'ID de la competencia' })
  @IsOptional()
  @IsInt()
  competenciaId?: number;

  @ApiPropertyOptional({ description: 'ID de la pista' })
  @IsOptional()
  @IsInt()
  pistaId?: number;

  @ApiPropertyOptional({ description: 'Fecha exacta (yyyy-mm-dd)' })
  @IsOptional()
  @IsDateString()
  fecha?: string;
}
