export declare class CreateCompetenciaDto {
    nombre: string;
    descripcion?: string;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    numero_clasificados?: number;
    estado?: 'configuracion' | 'en_progreso' | 'finalizada';
}
