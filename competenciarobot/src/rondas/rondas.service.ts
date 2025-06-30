 
import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ronda } from './entities/ronda.entity';
import { CreateRondaDto } from './dto/create-rondas.dto';
import { UpdateRondaDto } from './dto/update-rondas.dto';
import { Competencia } from '../competencia/entities/competencia.entity';
@Injectable()
export class RondasService {
  constructor(
    @InjectRepository(Ronda)
    private readonly rondaRepo: Repository<Ronda>,
    @InjectRepository(Competencia)
    private readonly competenciaRepo: Repository<Competencia>,
  ) {}

  async create(dto: CreateRondaDto): Promise<Ronda> {
    const competencia = await this.competenciaRepo.findOne({ where: { id: dto.competenciaId } });
    if (competencia?.estado !== 'configuracion') {
      throw new BadRequestException('No se puede modificar esta entidad una vez iniciada la competencia.');
    }

    const ronda = this.rondaRepo.create(dto);
    return this.rondaRepo.save(ronda);
  }

  findAll(): Promise<Ronda[]> {
    return this.rondaRepo.find({ relations: ['pista', 'competencia'] });
  }

  async findOne(id: number): Promise<Ronda> {
    const ronda = await this.rondaRepo.findOne({ where: { id }, relations: ['pista', 'competencia'] });
    if (!ronda) throw new NotFoundException(`Ronda con id ${id} no encontrada`);
    return ronda;
  }

  async update(id: number, dto: UpdateRondaDto): Promise<Ronda> {
    await this.rondaRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const ronda = await this.rondaRepo.findOneBy({ id });
    if (!ronda) throw new NotFoundException(`Ronda con id ${id} no encontrada`);

    await this.rondaRepo.remove(ronda);
    return { message: `Ronda con id ${id} eliminada correctamente` };
  }
}
