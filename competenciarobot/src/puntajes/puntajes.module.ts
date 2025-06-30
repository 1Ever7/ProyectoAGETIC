import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuntajesService } from './puntajes.service';
import { PuntajesController } from './puntajes.controller';
import { Puntaje } from './entities/puntaje.entity';
import { RondaEquipo } from '../ronda_equipos/entities/ronda_equipos.entity';
import { Ronda } from '../rondas/entities/ronda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Puntaje, RondaEquipo, Ronda])],
  providers: [PuntajesService],
  controllers: [PuntajesController],
})
export class PuntajesModule {}
