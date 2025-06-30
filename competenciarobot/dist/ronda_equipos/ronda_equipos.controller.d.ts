import { RondaEquiposService } from './ronda_equipos.service';
import { FilterRondaEquipoDto } from './dto/filter-ronda_equipos.dto';
import { RondaEquipo } from './entities/ronda_equipos.entity';
export declare class RondaEquiposController {
    private readonly service;
    constructor(service: RondaEquiposService);
    findAll(filtro: FilterRondaEquipoDto): Promise<RondaEquipo[]>;
}
