export declare class HistorialResponseDto {
    id: number;
    competencia_id: number;
    gestion: number;
    version: string;
    categoria: string;
    nombre: string;
    descripcion?: string;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    total_participantes?: number;
    total_rondas?: number;
    observaciones?: string;
    creado_en: Date;
}
