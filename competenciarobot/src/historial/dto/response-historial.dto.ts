// src/historial/dto/historial-response.dto.ts
import { Expose, Transform } from 'class-transformer';

export class HistorialResponseDto {
  @Expose()
  id: number;

  @Expose()
  competencia_id: number;

  @Expose()
  gestion: number;

  @Expose()
  version: string;

  @Expose()
  categoria: string;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;

  @Expose()
  fecha_inicio?: Date;

  @Expose()
  fecha_fin?: Date;

  @Expose()
  total_participantes?: number;

  @Expose()
  total_rondas?: number;

  @Expose()
  observaciones?: string;

  @Expose()
  creado_en: Date;
}
