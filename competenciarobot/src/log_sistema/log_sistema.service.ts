
// src/logs_sistema/logs_sistema.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogSistema } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogsSistemaService {
  constructor(
    @InjectRepository(LogSistema)
    private readonly repo: Repository<LogSistema>,
  ) {}

  create(dto: CreateLogDto) {
    const log = this.repo.create(dto);
    return this.repo.save(log);
  }

  findAll() {
    return this.repo.find({ relations: ['usuario'] });
  }

  async findOne(id: number) {
    const log = await this.repo.findOne({ where: { id }, relations: ['usuario'] });
    if (!log) throw new NotFoundException('Log no encontrado');
    return log;
  }

  async remove(id: number) {
    const log = await this.findOne(id);
    return this.repo.remove(log);
  }
}
