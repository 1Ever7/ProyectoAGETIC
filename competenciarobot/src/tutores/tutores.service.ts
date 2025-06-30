import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tutor } from './entities/tutor.entity';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutores.dto';
import { FilterTutorDto } from './dto/filter-tutor.dto';

@Injectable()
export class TutoresService {
  constructor(
    @InjectRepository(Tutor)
    private readonly tutorRepository: Repository<Tutor>,
  ) {}

  async create(dto: CreateTutorDto): Promise<Tutor> {
    const tutor = this.tutorRepository.create(dto);
    return this.tutorRepository.save(tutor);
  }

  async findAll(filterDto: FilterTutorDto): Promise<Tutor[]> {
    const query = this.tutorRepository.createQueryBuilder('tutor');
    if (filterDto.nombre_completo) {
      query.andWhere('LOWER(tutor.nombre_completo) LIKE LOWER(:nombre)', {
        nombre: `%${filterDto.nombre_completo}%`,
      });
    }
    return query.getMany();
  }

  async findOne(id: number): Promise<Tutor> {
    const tutor = await this.tutorRepository.findOne({ where: { id } });
    if (!tutor) throw new NotFoundException('Tutor no encontrado');
    return tutor;
  }

  async update(id: number, dto: UpdateTutorDto): Promise<Tutor> {
    await this.tutorRepository.update(id, dto);
    return this.findOne(id);
  }

 async remove(id: number): Promise<{ message: string }> {
  const result = await this.tutorRepository.delete(id);

  if (result.affected === 0) {
    throw new NotFoundException(`Tutor con id ${id} no encontrado`);
  }

  return { message: `Tutor con id ${id} eliminado correctamente` };
}

}

