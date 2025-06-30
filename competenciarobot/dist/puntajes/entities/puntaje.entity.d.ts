import { Ronda } from '../../rondas/entities/ronda.entity';
import { RondaEquipo } from '../../ronda_equipos/entities/ronda_equipos.entity';
export declare class Puntaje {
    id: number;
    puntos: number;
    equipo: RondaEquipo;
    ronda: Ronda;
    creado_en: Date;
    actualizado_en: Date;
}
