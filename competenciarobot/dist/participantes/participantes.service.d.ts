import { Repository } from 'typeorm';
import { Participante } from './entities/participante.entity';
import { CreateParticipanteDto } from './dto/create-participantes.dto';
import { UpdateParticipanteDto } from './dto/update-participantes.dto';
import { FilterParticipantesDto } from './dto/filter-participanteDto.dto';
import { Competencia } from '../competencia/entities/competencia.entity';
export declare class ParticipantesService {
    private readonly participanteRepo;
    private readonly competenciaRepo;
    constructor(participanteRepo: Repository<Participante>, competenciaRepo: Repository<Competencia>);
    create(dto: CreateParticipanteDto): Promise<Participante>;
    findAll(filter: FilterParticipantesDto): Promise<Participante[]>;
    findOne(id: number): Promise<Participante>;
    update(id: number, dto: UpdateParticipanteDto): Promise<Participante>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
