import { Repository } from 'typeorm';
import { LogSistema } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
export declare class LogsSistemaService {
    private readonly repo;
    constructor(repo: Repository<LogSistema>);
    create(dto: CreateLogDto): Promise<LogSistema>;
    findAll(): Promise<LogSistema[]>;
    findOne(id: number): Promise<LogSistema>;
    remove(id: number): Promise<LogSistema>;
}
