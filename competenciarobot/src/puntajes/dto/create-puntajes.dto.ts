import { IsInt, Min, Max } from 'class-validator';

export class CreatePuntajeDto {
  @IsInt()
  @Min(0)
  @Max(50)
  puntos: number;

  @IsInt()
  equipo_id: number;

  @IsInt()
  ronda_id: number;
}