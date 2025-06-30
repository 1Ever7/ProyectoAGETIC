import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuarios.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    getPrivado(): {
        mensaje: string;
    };
    create(dto: CreateUsuarioDto): Promise<import("./entities/usuarios.entity").Usuario>;
    findAll(): Promise<import("./entities/usuarios.entity").Usuario[]>;
    findOne(id: number): Promise<import("./entities/usuarios.entity").Usuario>;
    update(id: number, dto: UpdateUsuarioDto): Promise<import("./entities/usuarios.entity").Usuario>;
    remove(id: number): Promise<void>;
}
