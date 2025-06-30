import { Participante } from '../../participantes/entities/participante.entity';
import { Competencia } from '../../competencia/entities/competencia.entity';
export declare class Clasificado {
    id: number;
    participante: Participante;
    competencia: Competencia;
    posicion: number;
    puntajeTotal: number;
    creadoEn: Date;
}
