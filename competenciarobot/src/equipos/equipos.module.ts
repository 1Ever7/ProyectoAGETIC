import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { Equipo } from './entities/equipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo])],
  providers: [EquiposService],
  controllers: [EquiposController],
  //exports: [EquiposService], // Para usar en otros módulos
  exports: [TypeOrmModule], 
})
export class EquiposModule {}
 
