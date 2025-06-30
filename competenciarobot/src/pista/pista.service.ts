import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pista } from './entities/pista.entity';
import { CreatePistaDto } from './dto/create-pista.dto';
import { UpdatePistaDto } from './dto/update-pista.dto';

@Injectable()
export class PistasService {
  constructor(
    @InjectRepository(Pista)
    private readonly pistaRepo: Repository<Pista>,
  ) {}

    async create(dto: CreatePistaDto): Promise<Pista> {
    const pista = this.pistaRepo.create({
        nombre: dto.nombre,
        estado: dto.estado,
        competencia: { id: dto.competenciaId }, // referencia por ID
    });
    return this.pistaRepo.save(pista);
    }

  findAll(): Promise<Pista[]> {
    return this.pistaRepo.find({ relations: ['competencia'] });
  }

  async findOne(id: number): Promise<Pista> {
    const pista = await this.pistaRepo.findOne({ where: { id }, relations: ['competencia'] });
    if (!pista) throw new NotFoundException(`Pista con id ${id} no encontrada`);
    return pista;
  }

  async update(id: number, dto: UpdatePistaDto): Promise<Pista> {
    const pista = await this.findOne(id);
    Object.assign(pista, dto);
    return this.pistaRepo.save(pista);
  }

  async remove(id: number): Promise<{ message: string }> {
    const pista = await this.findOne(id);
    await this.pistaRepo.remove(pista);
    return { message: `Pista con id ${id} eliminada correctamente` };
  }
}
 
