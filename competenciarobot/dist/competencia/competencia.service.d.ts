import { Repository } from 'typeorm';
import { Competencia } from './entities/competencia.entity';
import { CreateCompetenciaDto } from './dto/create-competencia.dto';
import { UpdateCompetenciaDto } from './dto/update-competencia.dto';
import { Participante } from '../participantes/entities/participante.entity';
import { Ronda } from '../rondas/entities/ronda.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { MiembroEquipo } from '../miembros_equipo/entities/miembros_equipo.entity';
import { RondaEquipo } from '../ronda_equipos/entities/ronda_equipos.entity';
import { Pista } from '../pista/entities/pista.entity';
import { Clasificado } from '../clasificados/entities/clasificado.entity';
import { Puntaje } from '../puntajes/entities/puntaje.entity';
export declare class CompetenciaService {
    private readonly competenciaRepo;
    private participanteRepo;
    private rondaRepo;
    private equipoRepo;
    private miembroRepo;
    private rondaEquipoRepo;
    private pistaRepo;
    private clasificadoRepo;
    private puntajeRepo;
    constructor(competenciaRepo: Repository<Competencia>, participanteRepo: Repository<Participante>, rondaRepo: Repository<Ronda>, equipoRepo: Repository<Equipo>, miembroRepo: Repository<MiembroEquipo>, rondaEquipoRepo: Repository<RondaEquipo>, pistaRepo: Repository<Pista>, clasificadoRepo: Repository<Clasificado>, puntajeRepo: Repository<Puntaje>);
    create(dto: CreateCompetenciaDto): Promise<Competencia>;
    findAll(): Promise<Competencia[]>;
    findOne(id: number): Promise<Competencia>;
    update(id: number, dto: UpdateCompetenciaDto): Promise<Competencia>;
    remove(id: number): Promise<void>;
    iniciarCompetencia(id: number): Promise<Competencia>;
    finalizarCompetencia(id: number): Promise<Competencia>;
    generarRondas(competenciaId: number): Promise<Ronda[]>;
    iniciarRonda(rondaId: number): Promise<Ronda>;
    finalizarRonda(rondaId: number): Promise<Ronda>;
    generarClasificados(id: number): Promise<{
        message: string;
    }>;
}
