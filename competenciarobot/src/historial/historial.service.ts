 
// src/historial/historial.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialCompetencia } from './entities/historial.entity';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';
import { Competencia } from '../competencia/entities/competencia.entity';

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(HistorialCompetencia)
    private historialRepo: Repository<HistorialCompetencia>,

    @InjectRepository(Competencia)
    private competenciaRepo: Repository<Competencia>,
  ) {}

async create(dto: CreateHistorialDto): Promise<HistorialCompetencia> {
  let competencia: Competencia | null = null;

  if (dto.competencia_id) {
    competencia = await this.competenciaRepo.findOneBy({ id: dto.competencia_id });
    if (!competencia) throw new NotFoundException('Competencia no encontrada');
  }

  const historial = this.historialRepo.create({
    ...dto,
    ...(competencia ? { competencia } : {}),
  });

  return this.historialRepo.save(historial);
}

  findAll(): Promise<HistorialCompetencia[]> {
    return this.historialRepo.find({ relations: ['competencia'] });
  }

  async findOne(id: number): Promise<HistorialCompetencia> {
    const historial = await this.historialRepo.findOne({ where: { id }, relations: ['competencia'] });
    if (!historial) throw new NotFoundException('Historial no encontrado');
    return historial;
  }

  async update(id: number, dto: UpdateHistorialDto): Promise<HistorialCompetencia> {
    const historial = await this.findOne(id);
    Object.assign(historial, dto);

    if (dto.competencia_id) {
      const competencia = await this.competenciaRepo.findOneBy({ id: dto.competencia_id });
      if (!competencia) throw new NotFoundException('Competencia no encontrada');
      historial.competencia = competencia;
    }

    return this.historialRepo.save(historial);
  }

  async remove(id: number): Promise<{ message: string }> {
    const historial = await this.findOne(id);
    await this.historialRepo.remove(historial);
    return { message: 'Historial eliminado correctamente' };
  }
}
