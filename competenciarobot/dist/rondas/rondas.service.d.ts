import { Repository } from 'typeorm';
import { Ronda } from './entities/ronda.entity';
import { CreateRondaDto } from './dto/create-rondas.dto';
import { UpdateRondaDto } from './dto/update-rondas.dto';
import { Competencia } from '../competencia/entities/competencia.entity';
export declare class RondasService {
    private readonly rondaRepo;
    private readonly competenciaRepo;
    constructor(rondaRepo: Repository<Ronda>, competenciaRepo: Repository<Competencia>);
    create(dto: CreateRondaDto): Promise<Ronda>;
    findAll(): Promise<Ronda[]>;
    findOne(id: number): Promise<Ronda>;
    update(id: number, dto: UpdateRondaDto): Promise<Ronda>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
