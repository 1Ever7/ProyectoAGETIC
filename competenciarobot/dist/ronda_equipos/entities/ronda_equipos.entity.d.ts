import { Ronda } from '../../rondas/entities/ronda.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';
export declare class RondaEquipo {
    id: number;
    ronda: Ronda;
    equipo: Equipo;
    creado_en: Date;
}
