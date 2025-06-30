import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Puntaje } from './entities/puntaje.entity';
import { CreatePuntajeDto } from './dto/create-puntajes.dto';
import { UpdatePuntajeDto } from './dto/update-puntajes.dto';
import { RondaEquipo } from '../ronda_equipos/entities/ronda_equipos.entity';
import { Ronda } from '../rondas/entities/ronda.entity';


@Injectable()
export class PuntajesService {
  constructor(
    @InjectRepository(Puntaje)
    private puntajeRepo: Repository<Puntaje>,
    @InjectRepository(RondaEquipo)
    private rondaEquipoRepo: Repository<RondaEquipo>,
    @InjectRepository(Ronda)
    private rondaRepo: Repository<Ronda>,
  ) {}

  async create(dto: CreatePuntajeDto): Promise<Puntaje> {
    const ronda = await this.rondaRepo.findOneBy({ id: dto.ronda_id });
    const equipo = await this.rondaEquipoRepo.findOneBy({ id: dto.equipo_id });

    if (!ronda || !equipo) throw new NotFoundException('Ronda o equipo no encontrado');

    const existe = await this.puntajeRepo.findOne({ where: { ronda, equipo } });
    if (existe) throw new BadRequestException('Ya existe un puntaje para esta ronda y equipo');

    const puntaje = this.puntajeRepo.create({ ...dto, ronda, equipo });
    return this.puntajeRepo.save(puntaje);
  }

  findAll(): Promise<Puntaje[]> {
    return this.puntajeRepo.find({ relations: ['ronda', 'equipo'] });
  }

  async findOne(id: number): Promise<Puntaje> {
    const puntaje = await this.puntajeRepo.findOne({ where: { id }, relations: ['ronda', 'equipo'] });
    if (!puntaje) throw new NotFoundException('Puntaje no encontrado');
    return puntaje;
  }

  async update(id: number, dto: UpdatePuntajeDto): Promise<Puntaje> {
    const puntaje = await this.findOne(id);
    Object.assign(puntaje, dto);
    return this.puntajeRepo.save(puntaje);
  }

  async remove(id: number): Promise<{ message: string }> {
    const puntaje = await this.findOne(id);
    await this.puntajeRepo.remove(puntaje);
    return { message: 'Puntaje eliminado correctamente' };
  }
}
