import { Repository } from 'typeorm';
import { Tutor } from './entities/tutor.entity';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutores.dto';
import { FilterTutorDto } from './dto/filter-tutor.dto';
export declare class TutoresService {
    private readonly tutorRepository;
    constructor(tutorRepository: Repository<Tutor>);
    create(dto: CreateTutorDto): Promise<Tutor>;
    findAll(filterDto: FilterTutorDto): Promise<Tutor[]>;
    findOne(id: number): Promise<Tutor>;
    update(id: number, dto: UpdateTutorDto): Promise<Tutor>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
