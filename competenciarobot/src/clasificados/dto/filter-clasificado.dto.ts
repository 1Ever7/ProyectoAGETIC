import { IsOptional, IsInt } from 'class-validator';

export class FilterClasificadoDto {
  @IsOptional()
  @IsInt()
  participante_id?: number;

  @IsOptional()
  @IsInt()
  competencia_id?: number;
}
