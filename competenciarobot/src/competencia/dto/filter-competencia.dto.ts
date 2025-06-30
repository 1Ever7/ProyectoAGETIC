import { IsOptional, IsString, IsIn } from 'class-validator';

export class FilterCompetenciaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsIn(['configuracion', 'en_progreso', 'finalizada'])
  estado?: string;
}
