export declare class Usuario {
    id: number;
    email: string;
    password: string;
    rol: 'admin' | 'juez' | 'visor';
    activo: boolean;
    creado_en: Date;
    actualizado_en: Date;
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<boolean>;
}
