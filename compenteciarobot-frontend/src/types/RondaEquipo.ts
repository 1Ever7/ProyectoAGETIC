export interface RondaEquipo {
  id: number;
  rondaId: number;
  equipoId: number;
  pistaId: number;
  ronda: Ronda;
  equipo: Equipo;
  pista: Pista;
  creadoEn: string;
  actualizadoEn: string;
}
import { Ronda } from './Ronda';
import { Equipo } from './Equipo';  
import { Pista } from './Pista';