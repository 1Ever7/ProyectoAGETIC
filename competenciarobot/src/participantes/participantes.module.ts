 
import { Module } from '@nestjs/common';
import { ParticipantesService } from './participantes.service';
import { ParticipantesController } from './participantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participante } from './entities/participante.entity';
import { TutoresModule } from '../tutores/tutores.module';
import { Competencia } from '../competencia/entities/competencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participante, Competencia]), TutoresModule],
  controllers: [ParticipantesController],
  providers: [ParticipantesService],
   exports: [TypeOrmModule],
})
export class ParticipantesModule {}
