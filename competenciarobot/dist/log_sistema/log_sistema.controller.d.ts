import { LogsSistemaService } from './log_sistema.service';
import { CreateLogDto } from './dto/create-log.dto';
export declare class LogsSistemaController {
    private readonly service;
    constructor(service: LogsSistemaService);
    create(dto: CreateLogDto): Promise<import("./entities/log.entity").LogSistema>;
    findAll(): Promise<import("./entities/log.entity").LogSistema[]>;
    findOne(id: string): Promise<import("./entities/log.entity").LogSistema>;
    remove(id: string): Promise<import("./entities/log.entity").LogSistema>;
}
