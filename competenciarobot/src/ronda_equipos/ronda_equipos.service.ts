// src/ronda_equipos/ronda_equipos.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RondaEquipo } from './entities/ronda_equipos.entity';
import { Ronda } from '../rondas/entities/ronda.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { FilterRondaEquipoDto } from './dto/filter-ronda_equipos.dto';

@Injectable()
export class RondaEquiposService {
  constructor(
    @InjectRepository(RondaEquipo)
    private readonly rondaEquipoRepo: Repository<RondaEquipo>,

    @InjectRepository(Ronda)
    private readonly rondaRepo: Repository<Ronda>,

    @InjectRepository(Equipo)
    private readonly equipoRepo: Repository<Equipo>,
  ) {}

  async findAll(filterDto?: FilterRondaEquipoDto): Promise<RondaEquipo[]> {
    const { color, estadoRonda, numeroRonda } = filterDto || {};

    const query = this.rondaEquipoRepo
      .createQueryBuilder('rondaEquipo')
      .leftJoinAndSelect('rondaEquipo.ronda', 'ronda')
      .leftJoinAndSelect('rondaEquipo.equipo', 'equipo')
      .leftJoinAndSelect('equipo.miembros', 'miembro')
      .leftJoinAndSelect('miembro.participante', 'participante')
      .leftJoinAndSelect('ronda.pista', 'pista');

    if (color) {
      query.andWhere('equipo.color = :color', { color });
    }

    if (estadoRonda) {
      query.andWhere('ronda.estado = :estado', { estado: estadoRonda });
    }

    if (numeroRonda) {
      query.andWhere('ronda.numeroRonda = :numero', { numero: numeroRonda });
    }

    return query.getMany();
  }
}
