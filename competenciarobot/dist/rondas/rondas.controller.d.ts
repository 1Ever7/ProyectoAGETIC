import { RondasService } from './rondas.service';
import { CreateRondaDto } from './dto/create-rondas.dto';
import { UpdateRondaDto } from './dto/update-rondas.dto';
export declare class RondasController {
    private readonly rondasService;
    constructor(rondasService: RondasService);
    create(dto: CreateRondaDto): Promise<import("./entities/ronda.entity").Ronda>;
    findAll(): Promise<import("./entities/ronda.entity").Ronda[]>;
    findOne(id: string): Promise<import("./entities/ronda.entity").Ronda>;
    update(id: string, dto: UpdateRondaDto): Promise<import("./entities/ronda.entity").Ronda>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
