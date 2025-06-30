 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pista } from './entities/pista.entity';
import { PistasService } from './pista.service';
import { PistasController } from './pista.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pista])],
  controllers: [PistasController],
  providers: [PistasService],
  exports: [PistasService],
})
export class PistasModule {}
