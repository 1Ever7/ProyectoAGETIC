import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './entities/equipo.entity';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { FilterEquipoDto } from './dto/filter-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private equipoRepo: Repository<Equipo>,
  ) {}

  async create(dto: CreateEquipoDto): Promise<Equipo> {
    
    const equipo = this.equipoRepo.create(dto);
    return this.equipoRepo.save(equipo);
  }

  

  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepo.findOne({
      where: { id },
      relations: ['miembros', 'rondas', 'puntajes'],
    });
    if (!equipo) throw new NotFoundException('Equipo no encontrado');
    return equipo;
  }

  async update(id: number, dto: UpdateEquipoDto): Promise<Equipo> {
    await this.equipoRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const equipo = await this.findOne(id);
    await this.equipoRepo.remove(equipo);
    return { message: 'Equipo eliminado correctamente' };
  }
  async findAll(filterDto?: FilterEquipoDto): Promise<Equipo[]> {
  const query = this.equipoRepo.createQueryBuilder('equipo');

  if (filterDto?.color) {
    query.andWhere('equipo.color = :color', { color: filterDto.color });
  }

  return await query.getMany();
}
}
