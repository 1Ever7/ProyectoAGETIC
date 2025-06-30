export interface Puntaje {
  id: number;
  rondaEquipoId: number;
  puntaje: number;
  rondaEquipo: RondaEquipo;
  creadoEn: string;
  actualizadoEn: string;
}
import { RondaEquipo } from './RondaEquipo';