import { Repository } from 'typeorm';
import { Puntaje } from './entities/puntaje.entity';
import { CreatePuntajeDto } from './dto/create-puntajes.dto';
import { UpdatePuntajeDto } from './dto/update-puntajes.dto';
import { RondaEquipo } from '../ronda_equipos/entities/ronda_equipos.entity';
import { Ronda } from '../rondas/entities/ronda.entity';
export declare class PuntajesService {
    private puntajeRepo;
    private rondaEquipoRepo;
    private rondaRepo;
    constructor(puntajeRepo: Repository<Puntaje>, rondaEquipoRepo: Repository<RondaEquipo>, rondaRepo: Repository<Ronda>);
    create(dto: CreatePuntajeDto): Promise<Puntaje>;
    findAll(): Promise<Puntaje[]>;
    findOne(id: number): Promise<Puntaje>;
    update(id: number, dto: UpdatePuntajeDto): Promise<Puntaje>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
