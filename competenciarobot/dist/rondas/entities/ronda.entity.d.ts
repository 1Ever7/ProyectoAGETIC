import { Pista } from '../../pista/entities/pista.entity';
import { Competencia } from '../../competencia/entities/competencia.entity';
import { RondaEquipo } from '../../ronda_equipos/entities/ronda_equipos.entity';
import { Puntaje } from '../../puntajes/entities/puntaje.entity';
export type EstadoRonda = 'pendiente' | 'en_progreso' | 'finalizada';
export declare class Ronda {
    id: number;
    numeroRonda: number;
    fechaHora: Date;
    estado: EstadoRonda;
    pista: Pista;
    competencia: Competencia;
    creadoEn: Date;
    actualizadoEn: Date;
    equipos: RondaEquipo[];
    puntajes: Puntaje[];
}
