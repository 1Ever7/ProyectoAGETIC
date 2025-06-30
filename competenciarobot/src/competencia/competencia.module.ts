import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetenciaService } from './competencia.service';
import { CompetenciaController } from './competencia.controller';
import { Competencia } from './entities/competencia.entity';
import { Participante } from '../participantes/entities/participante.entity';
import { Ronda } from '../rondas/entities/ronda.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { MiembroEquipo } from '../miembros_equipo/entities/miembros_equipo.entity';
import { RondaEquipo } from '../ronda_equipos/entities/ronda_equipos.entity';
import { Pista } from '../pista/entities/pista.entity';
import { Clasificado } from '../clasificados/entities/clasificado.entity';
import { Puntaje } from '../puntajes/entities/puntaje.entity';
import { ParticipantesModule } from '../participantes/participantes.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Competencia,
      Participante,
      Ronda,
      Equipo,
      MiembroEquipo,
      RondaEquipo,
      Pista,
      Clasificado,
      Puntaje,
    ]),
    ParticipantesModule, 
  ],
  controllers: [CompetenciaController],
  providers: [CompetenciaService],
})
export class CompetenciaModule {}
