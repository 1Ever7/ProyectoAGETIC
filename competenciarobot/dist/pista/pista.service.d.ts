import { Repository } from 'typeorm';
import { Pista } from './entities/pista.entity';
import { CreatePistaDto } from './dto/create-pista.dto';
import { UpdatePistaDto } from './dto/update-pista.dto';
export declare class PistasService {
    private readonly pistaRepo;
    constructor(pistaRepo: Repository<Pista>);
    create(dto: CreatePistaDto): Promise<Pista>;
    findAll(): Promise<Pista[]>;
    findOne(id: number): Promise<Pista>;
    update(id: number, dto: UpdatePistaDto): Promise<Pista>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
