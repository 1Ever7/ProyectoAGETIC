export class ResponseCompetenciaDto {
  id: number;
  nombre: string;
  descripcion?: string;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  numero_clasificados: number;
  estado: string;
  creado_en: Date;
  actualizado_en: Date;
}
