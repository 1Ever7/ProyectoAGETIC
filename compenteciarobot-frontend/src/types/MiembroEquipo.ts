export interface MiembroEquipo {
  id: number;
  equipoId: number;
  participanteId: number;
  participante: Participante;
  creadoEn: string;
  actualizadoEn: string;
}
import { Participante } from './Participante';