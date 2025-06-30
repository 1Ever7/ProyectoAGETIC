export interface Ronda {
  id: number;
  nombre: string;
  tipo: 'clasificatoria' | 'eliminatoria' | 'final';
  numeroRonda: number;
  competenciaId: number;
  creadoEn: string;
  actualizadoEn: string;
}
