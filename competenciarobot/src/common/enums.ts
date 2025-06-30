export enum EstadoCompetencia {
  NO_INICIADA = 'configuracion',
  EN_PROGRESO = 'en_progreso',
  FINALIZADA = 'finalizada',
}

export enum EstadoRonda {
  PENDIENTE = 'pendiente',
  EN_PROGRESO = 'en_progreso',
  FINALIZADA = 'finalizada',
}
export enum EstadoEquipo {
  PENDIENTE = 'pendiente',
  EN_COMPETENCIA = 'en_competencia',
  ELIMINADO = 'eliminado',
  GANADOR = 'ganador',
}
export enum RolUsuario {
  ADMIN = 'admin',
  JUEZ = 'juez',
  PARTICIPANTE = 'participante',
}

export enum EstadoPista {
  DISPONIBLE = 'disponible',
  EN_USO = 'en_uso',
  MANTENIMIETO = 'mantenimiento',
}



