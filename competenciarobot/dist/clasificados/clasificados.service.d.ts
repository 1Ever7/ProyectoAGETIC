import { Repository } from 'typeorm';
import { Clasificado } from './entities/clasificado.entity';
import { Participante } from '../participantes/entities/participante.entity';
import { Competencia } from '../competencia/entities/competencia.entity';
import { CreateClasificadoDto } from './dto/create-clasificado.dto';
import { UpdateClasificadoDto } from './dto/update-clasificados.dto';
export declare class ClasificadosService {
    private readonly clasificadoRepo;
    private readonly participanteRepo;
    private readonly competenciaRepo;
    constructor(clasificadoRepo: Repository<Clasificado>, participanteRepo: Repository<Participante>, competenciaRepo: Repository<Competencia>);
    create(dto: CreateClasificadoDto): Promise<Clasificado>;
    findAll(): Promise<Clasificado[]>;
    findOne(id: number): Promise<Clasificado>;
    update(id: number, dto: UpdateClasificadoDto): Promise<Clasificado>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
