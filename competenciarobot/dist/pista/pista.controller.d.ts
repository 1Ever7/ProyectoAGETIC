import { PistasService } from './pista.service';
import { CreatePistaDto } from './dto/create-pista.dto';
import { UpdatePistaDto } from './dto/update-pista.dto';
export declare class PistasController {
    private readonly pistasService;
    constructor(pistasService: PistasService);
    create(dto: CreatePistaDto): Promise<import("./entities/pista.entity").Pista>;
    findAll(): Promise<import("./entities/pista.entity").Pista[]>;
    findOne(id: string): Promise<import("./entities/pista.entity").Pista>;
    update(id: string, dto: UpdatePistaDto): Promise<import("./entities/pista.entity").Pista>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
