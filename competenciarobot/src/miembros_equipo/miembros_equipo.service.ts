// src/miembros_equipo/miembros_equipo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MiembroEquipo } from './entities/miembros_equipo.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Participante } from '../participantes/entities/participante.entity';
import { FilterMiembroEquipoDto } from './dto/filter-miembros_equipo.dto';

@Injectable()
export class MiembrosEquipoService {
  constructor(
    @InjectRepository(MiembroEquipo)
    private readonly miembroRepo: Repository<MiembroEquipo>,

    @InjectRepository(Equipo)
    private readonly equipoRepo: Repository<Equipo>,

    @InjectRepository(Participante)
    private readonly participanteRepo: Repository<Participante>,
  ) {}

  async findAll(filterDto?: FilterMiembroEquipoDto): Promise<MiembroEquipo[]> {
    const { nombreParticipante, colorEquipo } = filterDto || {};

    const query = this.miembroRepo
      .createQueryBuilder('miembro')
      .leftJoinAndSelect('miembro.equipo', 'equipo')
      .leftJoinAndSelect('miembro.participante', 'participante');

    if (colorEquipo) {
      query.andWhere('equipo.color = :color', { color: colorEquipo });
    }

    if (nombreParticipante) {
      query.andWhere('LOWER(participante.nombre) LIKE LOWER(:nombre)', {
        nombre: `%${nombreParticipante}%`,
      });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<MiembroEquipo> {
    const miembro = await this.miembroRepo.findOne({
      where: { id },
      relations: ['equipo', 'participante'],
    });
    if (!miembro) throw new NotFoundException('Miembro no encontrado');
    return miembro;
  }
}
