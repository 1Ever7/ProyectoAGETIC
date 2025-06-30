export interface Usuario {
  id: number;
  email: string;
  password?: string; // opcional para no enviarlo en el frontend
  rol: 'admin' | 'juez' | 'visor';
  activo: boolean;
  creadoEn: string;
  actualizadoEn: string;
}
