 
// src/historial/historial.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialService } from './historial.service';
import { HistorialController } from './historial.controller';
import { HistorialCompetencia } from './entities/historial.entity';
import { Competencia } from '../competencia/entities/competencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialCompetencia, Competencia])],
  providers: [HistorialService],
  controllers: [HistorialController],
})
export class HistorialModule {}
