import { Tutor } from '../../tutores/entities/tutor.entity';
import { Competencia } from '../../competencia/entities/competencia.entity';
import { MiembroEquipo } from '../../miembros_equipo/entities/miembros_equipo.entity';
import { Clasificado } from '../../clasificados/entities/clasificado.entity';
export declare class Participante {
    id: number;
    nombreEquipo: string;
    departamento: string;
    provincia: string;
    municipio: string;
    documentoIdentidad: string;
    nombreCompleto: string;
    fechaNacimiento: Date;
    rol: 'participante' | 'tutor';
    tutor: Tutor;
    competencia: Competencia;
    creadoEn: Date;
    actualizadoEn: Date;
    miembrosEquipos: MiembroEquipo[];
    clasificaciones: Clasificado[];
}
