import { IsOptional, IsInt } from 'class-validator';

export class FilterPuntajeDto {
  @IsOptional()
  @IsInt()
  equipo_id?: number;

  @IsOptional()
  @IsInt()
  ronda_id?: number;
}
