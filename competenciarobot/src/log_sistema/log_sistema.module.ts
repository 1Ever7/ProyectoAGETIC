
// src/logs_sistema/logs_sistema.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsSistemaService } from './log_sistema.service';
import { LogsSistemaController } from './log_sistema.controller';
import { LogSistema } from './entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogSistema])],
  controllers: [LogsSistemaController],
  providers: [LogsSistemaService],
  exports: [LogsSistemaService],
})
export class LogsSistemaModule {}
