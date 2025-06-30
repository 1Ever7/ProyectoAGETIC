import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { Participante } from './entities/participante.entity';
import { CreateParticipanteDto } from './dto/create-participantes.dto';
import { UpdateParticipanteDto } from './dto/update-participantes.dto';
import { FilterParticipantesDto } from './dto/filter-participanteDto.dto';
import { Competencia } from '../competencia/entities/competencia.entity';
import { EstadoCompetencia } from '../common/enums';

@Injectable()
export class ParticipantesService {
  constructor(
    @InjectRepository(Participante)
    private readonly participanteRepo: Repository<Participante>,
    
    @InjectRepository(Competencia)
    private readonly competenciaRepo: Repository<Competencia>,
  ) {}

  async create(dto: CreateParticipanteDto): Promise<Participante> {
    const competencia = await this.competenciaRepo.findOne({
      where: { id: dto.competencia_id },
      relations: ['participantes'],
    });

    if (!competencia) {
      throw new NotFoundException('Competencia no encontrada');
    }

    if (competencia.estado !== EstadoCompetencia.NO_INICIADA) {
      throw new BadRequestException('No se puede modificar cuando la competencia ya inició.');
    }

    const existe = await this.participanteRepo.findOne({
      where: { nombreEquipo: dto.nombre_equipo },
    });
    if (existe) throw new BadRequestException('El nombre de equipo ya está registrado');

    const participante = this.participanteRepo.create({
      ...dto,
      competencia,
    });

    return this.participanteRepo.save(participante);
  }

  async findAll(filter: FilterParticipantesDto): Promise<Participante[]> {
    const where: FindOptionsWhere<Participante> = {};

    if (filter.documentoIdentidad) {
      where.documentoIdentidad = Like(`%${filter.documentoIdentidad}%`);
    }

    if (filter.departamento) {
      where.departamento = Like(`%${filter.departamento}%`);
    }
    if (filter.provincia) {
      where.provincia = Like(`%${filter.provincia}%`);
    }
    if (filter.municipio) {
      where.municipio = Like(`%${filter.municipio}%`);
    }
   

    return this.participanteRepo.find({
      where,
      relations: ['tutor', 'competencia'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Participante> {
    const participante = await this.participanteRepo.findOne({ where: { id }, relations: ['tutor', 'competencia'] });
    if (!participante) throw new NotFoundException('Participante no encontrado');
    return participante;
  }

  async update(id: number, dto: UpdateParticipanteDto): Promise<Participante> {
    await this.participanteRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const participante = await this.participanteRepo.findOneBy({ id });

    if (!participante) {
      throw new NotFoundException(`Participante con id ${id} no encontrado`);
    }

    await this.participanteRepo.remove(participante);

    return { message: `Participante con id ${id} eliminado correctamente` };
  }
}
