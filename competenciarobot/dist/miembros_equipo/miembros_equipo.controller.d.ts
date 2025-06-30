import { MiembrosEquipoService } from './miembros_equipo.service';
import { FilterMiembroEquipoDto } from './dto/filter-miembros_equipo.dto';
import { MiembroEquipo } from './entities/miembros_equipo.entity';
export declare class MiembrosEquipoController {
    private readonly miembrosEquipoService;
    constructor(miembrosEquipoService: MiembrosEquipoService);
    findAll(filtro: FilterMiembroEquipoDto): Promise<MiembroEquipo[]>;
    findOne(id: number): Promise<MiembroEquipo>;
}
