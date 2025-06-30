export interface Pista {
  id: number;
  nombre: string;
  ubicacion?: string;
  estado: 'activa' | 'inactiva';
  creadoEn: string;
  actualizadoEn: string;
}
