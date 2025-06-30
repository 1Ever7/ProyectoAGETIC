// src/historial/dto/create-historial_competencia.dto.ts
import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateHistorialDto {
  @IsInt()
  @IsOptional()
  competencia_id?: number;

  @IsInt()
  gestion: number;

  @IsString()
  version: string;

  @IsString()
  categoria: string;

  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  @IsOptional()
  fecha_inicio?: string;

  @IsDateString()
  @IsOptional()
  fecha_fin?: string;

  @IsInt()
  @IsOptional()
  total_participantes?: number;

  @IsInt()
  @IsOptional()
  total_rondas?: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
