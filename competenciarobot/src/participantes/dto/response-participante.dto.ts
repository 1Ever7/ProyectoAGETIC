export class ResponseParticipanteDto {
  id: number;
  nombre_equipo: string;
  departamento: string;
  provincia: string;
  municipio: string;
  documento_identidad: string;
  nombre_completo: string;
  fecha_nacimiento: Date;
  rol: string;
  tutor_id?: number;
  competencia_id: number;
  creado_en: Date;
  actualizado_en: Date;
}
