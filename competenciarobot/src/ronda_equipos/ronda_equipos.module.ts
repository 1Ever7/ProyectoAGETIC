import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RondaEquipo } from './entities/ronda_equipos.entity';
import { Ronda } from '../rondas/entities/ronda.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { RondaEquiposController } from './ronda_equipos.controller';
import { RondaEquiposService } from './ronda_equipos.service';

@Module({
  imports: [TypeOrmModule.forFeature([RondaEquipo, Ronda, Equipo])],
  controllers: [RondaEquiposController],
  providers: [RondaEquiposService],
})
export class RondaEquiposModule {}