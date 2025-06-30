import { Repository } from 'typeorm';
import { MiembroEquipo } from './entities/miembros_equipo.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Participante } from '../participantes/entities/participante.entity';
import { FilterMiembroEquipoDto } from './dto/filter-miembros_equipo.dto';
export declare class MiembrosEquipoService {
    private readonly miembroRepo;
    private readonly equipoRepo;
    private readonly participanteRepo;
    constructor(miembroRepo: Repository<MiembroEquipo>, equipoRepo: Repository<Equipo>, participanteRepo: Repository<Participante>);
    findAll(filterDto?: FilterMiembroEquipoDto): Promise<MiembroEquipo[]>;
    findOne(id: number): Promise<MiembroEquipo>;
}
