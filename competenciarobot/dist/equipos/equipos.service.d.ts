import { Repository } from 'typeorm';
import { Equipo } from './entities/equipo.entity';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { FilterEquipoDto } from './dto/filter-equipo.dto';
export declare class EquiposService {
    private equipoRepo;
    constructor(equipoRepo: Repository<Equipo>);
    create(dto: CreateEquipoDto): Promise<Equipo>;
    findOne(id: number): Promise<Equipo>;
    update(id: number, dto: UpdateEquipoDto): Promise<Equipo>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findAll(filterDto?: FilterEquipoDto): Promise<Equipo[]>;
}
