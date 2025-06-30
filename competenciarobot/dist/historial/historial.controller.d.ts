import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';
export declare class HistorialController {
    private readonly historialService;
    constructor(historialService: HistorialService);
    create(dto: CreateHistorialDto): Promise<import("./entities/historial.entity").HistorialCompetencia>;
    findAll(): Promise<import("./entities/historial.entity").HistorialCompetencia[]>;
    findOne(id: string): Promise<import("./entities/historial.entity").HistorialCompetencia>;
    update(id: string, dto: UpdateHistorialDto): Promise<import("./entities/historial.entity").HistorialCompetencia>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
