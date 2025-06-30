import { ClasificadosService } from './clasificados.service';
import { CreateClasificadoDto } from './dto/create-clasificado.dto';
import { UpdateClasificadoDto } from './dto/update-clasificados.dto';
export declare class ClasificadosController {
    private readonly service;
    constructor(service: ClasificadosService);
    create(dto: CreateClasificadoDto): Promise<import("./entities/clasificado.entity").Clasificado>;
    findAll(): Promise<import("./entities/clasificado.entity").Clasificado[]>;
    findOne(id: string): Promise<import("./entities/clasificado.entity").Clasificado>;
    update(id: string, dto: UpdateClasificadoDto): Promise<import("./entities/clasificado.entity").Clasificado>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
