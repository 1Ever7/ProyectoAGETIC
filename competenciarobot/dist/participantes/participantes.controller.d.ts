import { ParticipantesService } from './participantes.service';
import { CreateParticipanteDto } from './dto/create-participantes.dto';
import { UpdateParticipanteDto } from './dto/update-participantes.dto';
import { FilterParticipantesDto } from './dto/filter-participanteDto.dto';
export declare class ParticipantesController {
    private readonly participantesService;
    constructor(participantesService: ParticipantesService);
    create(createDto: CreateParticipanteDto): Promise<import("./entities/participante.entity").Participante>;
    findAll(filterDto: FilterParticipantesDto): Promise<import("./entities/participante.entity").Participante[]>;
    findOne(id: number): Promise<import("./entities/participante.entity").Participante>;
    update(id: number, updateDto: UpdateParticipanteDto): Promise<import("./entities/participante.entity").Participante>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
