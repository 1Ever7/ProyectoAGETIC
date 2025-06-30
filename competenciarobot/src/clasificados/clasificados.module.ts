 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasificadosService } from './clasificados.service';
import { ClasificadosController } from './clasificados.controller';
import { Clasificado } from './entities/clasificado.entity';
import { Participante } from '../participantes/entities/participante.entity';
import { Competencia } from '../competencia/entities/competencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clasificado, Participante, Competencia])],
  providers: [ClasificadosService],
  controllers: [ClasificadosController],
})
export class ClasificadosModule {}
