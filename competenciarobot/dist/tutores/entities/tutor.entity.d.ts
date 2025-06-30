import { Participante } from '../../participantes/entities/participante.entity';
export declare class Tutor {
    id: number;
    documentoIdentidad: string;
    nombreCompleto: string;
    telefono: string;
    email: string;
    creadoEn: Date;
    actualizadoEn: Date;
    participantes: Participante[];
}
