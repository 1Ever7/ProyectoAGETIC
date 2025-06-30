// src/miembros_equipo/miembros_equipo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiembrosEquipoService } from './miembros_equipo.service';
import { MiembrosEquipoController } from './miembros_equipo.controller';
import { MiembroEquipo } from './entities/miembros_equipo.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Participante } from '../participantes/entities/participante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MiembroEquipo, Equipo, Participante])],
  controllers: [MiembrosEquipoController],
  providers: [MiembrosEquipoService],
  exports: [MiembrosEquipoService],
})
export class MiembrosEquipoModule {}
