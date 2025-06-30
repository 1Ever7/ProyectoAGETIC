import { Competencia } from '../../competencia/entities/competencia.entity';
import { Ronda } from '../../rondas/entities/ronda.entity';
import { EstadoPista } from '../../common/enums';
export declare class Pista {
    id: number;
    nombre: string;
    estado: EstadoPista;
    competencia: Competencia;
    creado_en: Date;
    actualizado_en: Date;
    rondas: Ronda[];
}
