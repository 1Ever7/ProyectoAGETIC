
import { IsInt } from 'class-validator';

export class CreateClasificadoDto {
  @IsInt()
  participante_id: number;

  @IsInt()
  competencia_id: number;

  @IsInt()
  posicion: number;

  @IsInt()
  puntaje_total: number;
}
