import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clasificado } from './entities/clasificado.entity';
import { Participante } from '../participantes/entities/participante.entity';
import { Competencia } from '../competencia/entities/competencia.entity';
import { CreateClasificadoDto } from './dto/create-clasificado.dto';
import { UpdateClasificadoDto } from './dto/update-clasificados.dto';

@Injectable()
export class ClasificadosService {
  constructor(
    @InjectRepository(Clasificado)
    private readonly clasificadoRepo: Repository<Clasificado>,
    @InjectRepository(Participante)
    private readonly participanteRepo: Repository<Participante>,
    @InjectRepository(Competencia)
    private readonly competenciaRepo: Repository<Competencia>,
  ) {}

  async create(dto: CreateClasificadoDto): Promise<Clasificado> {
    const participante = await this.participanteRepo.findOneBy({ id: dto.participante_id });
    const competencia = await this.competenciaRepo.findOneBy({ id: dto.competencia_id });

    if (!participante || !competencia) {
      throw new NotFoundException('Participante o competencia no encontrado');
    }

    const clasificado = this.clasificadoRepo.create({
      participante,
      competencia,
      posicion: dto.posicion,
      puntajeTotal: dto.puntaje_total,
    });

    return this.clasificadoRepo.save(clasificado);
  }

  findAll(): Promise<Clasificado[]> {
    return this.clasificadoRepo.find({ relations: ['participante', 'competencia'] });
  }

  async findOne(id: number): Promise<Clasificado> {
    const clasificado = await this.clasificadoRepo.findOne({
      where: { id },
      relations: ['participante', 'competencia'],
    });

    if (!clasificado) throw new NotFoundException('Clasificado no encontrado');
    return clasificado;
  }

  async update(id: number, dto: UpdateClasificadoDto): Promise<Clasificado> {
    const clasificado = await this.findOne(id);
    Object.assign(clasificado, {
      posicion: dto.posicion ?? clasificado.posicion,
      puntajeTotal: dto.puntaje_total ?? clasificado.puntajeTotal,
    });

    return this.clasificadoRepo.save(clasificado);
  }

  async remove(id: number): Promise<{ message: string }> {
    const clasificado = await this.findOne(id);
    await this.clasificadoRepo.remove(clasificado);
    return { message: 'Clasificado eliminado correctamente' };
  }
}
 
