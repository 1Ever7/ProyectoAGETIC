// src/historial/dto/filter-historial.dto.ts
import { IsOptional, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterHistorialDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  gestion?: number;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number;
}
