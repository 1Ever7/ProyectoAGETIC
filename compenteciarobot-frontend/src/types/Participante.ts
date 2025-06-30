export interface Participante {
  id: number;
  nombreEquipo: string;
  documentoIdentidad: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  departamento: string;
  provincia: string;
  municipio: string;
  rol: 'participante' | 'tutor';
  tutor?: any;
  competencia?: any;
  creadoEn: string;
  actualizadoEn: string;
}
