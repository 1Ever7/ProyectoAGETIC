import { Repository } from 'typeorm';
import { RondaEquipo } from './entities/ronda_equipos.entity';
import { Ronda } from '../rondas/entities/ronda.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { FilterRondaEquipoDto } from './dto/filter-ronda_equipos.dto';
export declare class RondaEquiposService {
    private readonly rondaEquipoRepo;
    private readonly rondaRepo;
    private readonly equipoRepo;
    constructor(rondaEquipoRepo: Repository<RondaEquipo>, rondaRepo: Repository<Ronda>, equipoRepo: Repository<Equipo>);
    findAll(filterDto?: FilterRondaEquipoDto): Promise<RondaEquipo[]>;
}
