import { Module } from '@nestjs/common';
import { TutoresService } from './tutores.service';
import { TutoresController } from './tutores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './entities/tutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor])],
  controllers: [TutoresController],
  providers: [TutoresService],
  exports: [TutoresService],
})
export class TutoresModule {}