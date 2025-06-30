import { MiembroEquipo } from '../../miembros_equipo/entities/miembros_equipo.entity';
import { RondaEquipo } from '../../ronda_equipos/entities/ronda_equipos.entity';
import { Puntaje } from '../../puntajes/entities/puntaje.entity';
export declare class Equipo {
    id: number;
    color: 'rojo' | 'azul';
    creado_en: Date;
    actualizado_en: Date;
    miembros: MiembroEquipo[];
    rondas: RondaEquipo[];
    puntajes: Puntaje[];
}
