import { PuntajesService } from './puntajes.service';
import { CreatePuntajeDto } from './dto/create-puntajes.dto';
import { UpdatePuntajeDto } from './dto/update-puntajes.dto';
export declare class PuntajesController {
    private readonly service;
    constructor(service: PuntajesService);
    create(dto: CreatePuntajeDto): Promise<import("./entities/puntaje.entity").Puntaje>;
    findAll(): Promise<import("./entities/puntaje.entity").Puntaje[]>;
    findOne(id: string): Promise<import("./entities/puntaje.entity").Puntaje>;
    update(id: string, dto: UpdatePuntajeDto): Promise<import("./entities/puntaje.entity").Puntaje>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
