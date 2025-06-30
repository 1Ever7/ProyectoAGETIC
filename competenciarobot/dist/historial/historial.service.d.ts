import { Repository } from 'typeorm';
import { HistorialCompetencia } from './entities/historial.entity';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';
import { Competencia } from '../competencia/entities/competencia.entity';
export declare class HistorialService {
    private historialRepo;
    private competenciaRepo;
    constructor(historialRepo: Repository<HistorialCompetencia>, competenciaRepo: Repository<Competencia>);
    create(dto: CreateHistorialDto): Promise<HistorialCompetencia>;
    findAll(): Promise<HistorialCompetencia[]>;
    findOne(id: number): Promise<HistorialCompetencia>;
    update(id: number, dto: UpdateHistorialDto): Promise<HistorialCompetencia>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
