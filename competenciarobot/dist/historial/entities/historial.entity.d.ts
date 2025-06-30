import { Competencia } from '../../competencia/entities/competencia.entity';
export declare class HistorialCompetencia {
    id: number;
    competencia: Competencia;
    gestion: number;
    version: string;
    categoria: string;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    totalParticipantes: number;
    totalRondas: number;
    observaciones: string;
    creadoEn: Date;
}
