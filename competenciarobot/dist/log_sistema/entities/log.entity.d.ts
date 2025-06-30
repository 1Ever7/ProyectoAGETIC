import { Usuario } from '../../usuarios/entities/usuarios.entity';
export declare class LogSistema {
    id: number;
    usuario: Usuario;
    accion: string;
    tablaAfectada: string;
    registroId: number;
    detalles: any;
    creadoEn: Date;
}
