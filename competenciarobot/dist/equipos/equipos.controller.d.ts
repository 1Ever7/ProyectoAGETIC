import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { FilterEquipoDto } from './dto/filter-equipo.dto';
import { EquipoResponseDto } from './dto/response-equipo.dto';
export declare class EquiposController {
    private readonly equiposService;
    constructor(equiposService: EquiposService);
    create(dto: CreateEquipoDto): Promise<import("./entities/equipo.entity").Equipo>;
    findAll(filterDto: FilterEquipoDto): Promise<EquipoResponseDto[]>;
    findOne(id: string): Promise<import("./entities/equipo.entity").Equipo>;
    update(id: string, dto: UpdateEquipoDto): Promise<import("./entities/equipo.entity").Equipo>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
