import { Participante } from '../../participantes/entities/participante.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';
export declare class MiembroEquipo {
    id: number;
    participante: Participante;
    equipo: Equipo;
    creado_en: Date;
}
