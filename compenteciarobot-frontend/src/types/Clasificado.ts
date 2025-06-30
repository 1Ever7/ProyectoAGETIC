export interface Clasificado {
  id: number;
  equipoId: number;
  competenciaId: number;
  puntajeTotal: number;
  equipo: Equipo;
  creadoEn: string;
  actualizadoEn: string;
}
import { Equipo } from './Equipo';