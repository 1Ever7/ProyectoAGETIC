import { Module } from '@nestjs/common';
import { RondasService } from './rondas.service';
import { RondasController } from './rondas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ronda } from './entities/ronda.entity';
import { Pista } from '../pista/entities/pista.entity';
import { Competencia } from '../competencia/entities/competencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ronda, Pista, Competencia])],
  controllers: [RondasController],
  providers: [RondasService],
})
export class RondasModule {}
 
