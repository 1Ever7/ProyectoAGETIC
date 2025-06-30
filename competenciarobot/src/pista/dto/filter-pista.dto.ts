import { IsOptional, IsString, IsIn, IsNumber } from 'class-validator';

export class FilterPistaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsIn(['disponible', 'en_uso', 'mantenimiento'])
  estado?: string;

  @IsOptional()
  @IsNumber()
  competencia_id?: number;
}
