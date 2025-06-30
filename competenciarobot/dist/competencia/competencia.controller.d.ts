import { CompetenciaService } from './competencia.service';
import { CreateCompetenciaDto } from './dto/create-competencia.dto';
import { UpdateCompetenciaDto } from './dto/update-competencia.dto';
export declare class CompetenciaController {
    private readonly competenciaService;
    constructor(competenciaService: CompetenciaService);
    create(dto: CreateCompetenciaDto): Promise<import("./entities/competencia.entity").Competencia>;
    findAll(): Promise<import("./entities/competencia.entity").Competencia[]>;
    findOne(id: number): Promise<import("./entities/competencia.entity").Competencia>;
    update(id: number, dto: UpdateCompetenciaDto): Promise<import("./entities/competencia.entity").Competencia>;
    remove(id: number): Promise<void>;
    generarRondas(id: number): Promise<{
        message: string;
        data: import("../rondas/entities/ronda.entity").Ronda[];
    }>;
    iniciar(id: number): Promise<{
        message: string;
        data: import("./entities/competencia.entity").Competencia;
    }>;
    finalizarCompetencia(id: string): Promise<import("./entities/competencia.entity").Competencia>;
    iniciarRonda(rondaId: number): Promise<{
        message: string;
        data: import("../rondas/entities/ronda.entity").Ronda;
    }>;
    finalizarRonda(rondaId: number): Promise<{
        message: string;
        data: import("../rondas/entities/ronda.entity").Ronda;
    }>;
}
