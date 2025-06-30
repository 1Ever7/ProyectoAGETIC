import { Pista } from '../../pista/entities/pista.entity';
import { Participante } from '../../participantes/entities/participante.entity';
import { Ronda } from '../../rondas/entities/ronda.entity';
import { Clasificado } from '../../clasificados/entities/clasificado.entity';
export declare class Competencia {
    id: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    numero_clasificados: number;
    estado: 'configuracion' | 'en_progreso' | 'finalizada';
    creado_en: Date;
    actualizado_en: Date;
    pistas: Pista[];
    participantes: Participante[];
    rondas: Ronda[];
    clasificados: Clasificado[];
}
