import { Repository } from 'typeorm';
import { Usuario } from './entities/usuarios.entity';
import { CreateUsuarioDto } from './dto/create-usuarios.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    findByEmail(email: string): Promise<Usuario>;
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    update(id: number, updateDto: UpdateUsuarioDto): Promise<Usuario>;
    remove(id: number): Promise<void>;
}
