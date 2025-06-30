import { IsString, IsOptional, IsDateString, IsInt, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompetenciaDto {
  @ApiProperty({ example: 'Competencia Nacional de Sumo' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Competencia regional de robótica sumo' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: '2025-08-01T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  fecha_inicio?: Date;

  @ApiProperty({ example: '2025-08-03T18:00:00Z' })
  @IsOptional()
  @IsDateString()
  fecha_fin?: Date;

  @ApiProperty({ example: 3, description: 'Número de clasificados (por defecto: 3)' })
  @IsOptional()
  @IsInt()
  numero_clasificados?: number;

  @ApiProperty({ example: 'configuracion', enum: ['configuracion', 'en_progreso', 'finalizada'] })
  @IsOptional()
  @IsIn(['configuracion', 'en_progreso', 'finalizada'])
  estado?: 'configuracion' | 'en_progreso' | 'finalizada';
}
